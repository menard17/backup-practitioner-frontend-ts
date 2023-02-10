<template>
  <div>
    <v-overlay :value="isLoading">
      <v-progress-circular
        :indeterminate="true"
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <div id="videos">
      <!-- add diagonal slash if user close photo -->
      <div class="smallFrame" id="user-1"></div>
      <!-- add name and buffer if the user doesnt join yet -->
      <div class="video-player" id="user-2"></div>
    </div>

    <controls-button
      :isVideoMutedProp="isVideoMuted"
      :isAudioMutedProp="isAudioMuted"
      @toggleVideo="toggleVideo"
      @toggleAudio="toggleAudio"
      @openSelection="openBottomSheet"
    />
    <alert-dialog
      :content="errorMessage"
      @confirm="acceptDialog"
      @cancel="acceptDialog"
      ref="alertDialogRef"
      withIcon
      icon="mdi-alert-circle"
      colorIcon="red"
    />
    <select-bottom-sheet ref="bottomSheetRef" :localTrack="videoTracks" />

    <dialog-call-status
      v-if="callStatusDialogShow"
      :status="callStatus"
      :isHideOverlay="false"
      ref="aletDialogRef"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import {
  connect,
  RemoteAudioTrack,
  RemoteParticipant,
  RemoteTrack,
  RemoteVideoTrack,
  Room,
  createLocalTracks,
  LocalVideoTrack,
  VideoTrack,
} from "twilio-video";
import axios, { AxiosError } from "axios";
import { Nullable } from "../types";
import AlertDialog from "@/components/AlertDialog.vue";
import ControlsButton from "../components/ControlsButton.vue";
import SelectBottomSheet from "../components/SelectBottomSheet.vue";
const DialogCallStatus = () => import("../components/DialogCallStatus.vue");

export default defineComponent({
  name: "VideoPage",
  data() {
    return {
      identity: "",
      room: null as Room | null,
      isLoading: false,
      errorMessage: "",
      isAudioMuted: false,
      isVideoMuted: false,
      videoTracks: null as VideoTrack | null,
    };
  },
  computed: {
    ...mapState("$_appointments", {
      callStatus: "callStatus",
    }),
    callStatusDialogShow: function (): boolean {
      return (
        this.callStatus == "calling" ||
        this.callStatus == "declined" ||
        this.callStatus == "timeout"
      );
    },
  },
  components: {
    AlertDialog,
    ControlsButton,
    SelectBottomSheet,
    DialogCallStatus,
  },
  methods: {
    ...mapActions("$_commons", {
      setLayout: "setLayout",
    }),
    async startVideo(
      identity: string | (string | null)[],
      appointment_id: string | (string | null)[]
    ) {
      this.isLoading = true;

      try {
        //will use the api helper updated one.
        //creating a vuex for this part is will be verbose and over engineering. because we don't need to
        // use the states and action of this video module.

        const { data } = await axios.get(
          `${process.env.VUE_APP_baseUrl}/twilio_token/tokens?appointment_id=${appointment_id}&identity_id=${identity}`
        );
        const localMediaContainer = document.getElementById(
          "user-1"
        ) as HTMLDivElement;

        const localTracks = await createLocalTracks({
          video: {
            aspectRatio: 4,
            height: 1920,
            frameRate: 30,
            width: 1080,
            facingMode: "environment",
          },
          audio: true,
        });

        this.videoTracks = localTracks.find(
          (track) => track.kind === "video"
        ) as LocalVideoTrack;

        this.room = await connect(data.token, {
          name: `room_no_${appointment_id}`,
          audio: { noiseSuppression: true, echoCancellation: true },
          video: { height: 1920, frameRate: 24, width: 1080 },
          bandwidthProfile: {
            video: {
              mode: "collaboration",
            },
          },
          preferredVideoCodecs: [{ codec: "VP8", simulcast: false }],
          networkQuality: { local: 1, remote: 1 },
          tracks: localTracks,
        });

        const localVideoTrack = Array.from(
          this.room.localParticipant.videoTracks.values()
        )[0].track;

        localVideoTrack.restart({
          facingMode: "user",
          width: 170,
          height: 300,
          aspectRatio: 4,
        });

        localMediaContainer.appendChild(this.videoTracks.attach());
        this.room.participants.forEach((participant) =>
          this.manageTracksForRemoteParticipant(participant)
        );

        this.room.on("participantConnected", this.onParticipantConnected);
        this.room.on("participantDisconnected", this.onParticipantDisconnected);
        window.onbeforeunload = () => this.room?.disconnect();
        this.isLoading = false;
      } catch (error) {
        const err = error as AxiosError;
        this.errorMessage = err.response?.data ?? err.message;
        if (this.errorMessage) {
          this.openNoShowConfirmDialog();
        }
        this.isLoading = true;
      }
    },
    trackExistsAndIsAttachable(
      track?: Nullable<RemoteTrack>
    ): track is RemoteAudioTrack | RemoteVideoTrack {
      return (
        !!track &&
        ((track as RemoteAudioTrack).attach !== undefined ||
          (track as RemoteVideoTrack).attach !== undefined)
      );
    },
    attachAttachableTracksForRemoteParticipant(participant: RemoteParticipant) {
      participant.tracks.forEach((publication) => {
        if (!publication.isSubscribed) return;

        if (!this.trackExistsAndIsAttachable(publication.track)) return;

        this.attachTrack(publication.track);
      });
    },
    attachTrack(track: RemoteAudioTrack | RemoteVideoTrack) {
      const remoteMediaContainer = document.querySelector(
        "#user-2"
      ) as HTMLDivElement;
      remoteMediaContainer.appendChild(track.attach());
    },
    onParticipantConnected(participant: RemoteParticipant) {
      this.manageTracksForRemoteParticipant(participant);
    },
    onParticipantDisconnected(participant: RemoteParticipant) {
      document.getElementById(participant.sid)?.remove();
    },
    onTrackSubscribed(track: RemoteTrack) {
      if (!this.trackExistsAndIsAttachable(track)) return;

      this.attachTrack(track);
    },
    onTrackUnsubscribed(track: RemoteTrack) {
      if (this.trackExistsAndIsAttachable(track))
        track.detach().forEach((element) => element.remove());
    },
    manageTracksForRemoteParticipant(participant: RemoteParticipant) {
      this.attachAttachableTracksForRemoteParticipant(participant);
      participant.on("trackSubscribed", this.onTrackSubscribed);
      participant.on("trackUnsubscribed", this.onTrackUnsubscribed);
    },
    openNoShowConfirmDialog() {
      const alertDialogRef = this.$refs.alertDialogRef as any;
      alertDialogRef.toggleDialog();
    },
    toggleVideo() {
      if (!this.room || !this.room.localParticipant)
        throw new Error("You must be connected to a room to mute tracks.");

      this.isVideoMuted
        ? this.room.localParticipant.videoTracks.forEach((publication) =>
            publication.track.enable()
          )
        : this.room.localParticipant.videoTracks.forEach((publication) =>
            publication.track.disable()
          );

      this.isVideoMuted = !this.isVideoMuted;
    },
    toggleAudio() {
      if (!this.room || !this.room.localParticipant)
        throw new Error("You must be connected to a room to mute tracks.");

      this.isAudioMuted
        ? this.room.localParticipant.audioTracks.forEach((publication) =>
            publication.track.enable()
          )
        : this.room.localParticipant.audioTracks.forEach((publication) =>
            publication.track.disable()
          );

      this.isAudioMuted = !this.isAudioMuted;
    },
    acceptDialog() {
      window.close();
    },
    openBottomSheet() {
      const bottomSheet = this.$refs.bottomSheetRef as any;
      bottomSheet.openSheet();
    },
  },
  async created() {
    const role_id = this.$route.query.identity_id ?? "";
    const appointMentId = this.$route.query.id ?? "";

    await this.startVideo(role_id, appointMentId);
    await this.setLayout("NoLayout");
  },
  beforeRouteLeave(to, from, next) {
    this.room?.disconnect();
    next();
  },
});
</script>
<style>
video {
  width: 100%;
  max-height: 100%;
}
#videos {
  display: grid;
  grid-template-columns: 1fr;
  height: 100vh;
  overflow: hidden;
}
.video-player {
  background-color: black;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-player video {
  width: 100%;
  height: 100vh;
}
.smallFrame {
  position: fixed;
  top: 20px;
  left: 20px;
  max-height: 300px;
  max-width: 170px;
  height: 100%;
  width: 100%;
  z-index: 999;
  border-radius: 5px;
  object-fit: contain;
}

@media screen and (max-width: 60px) {
  .smallFrame {
    height: 120px;
    width: 60px;
  }
}
</style>
