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
    />
    <alert-dialog
      :content="errorMessage"
      @confirm="acceptDialog"
      @cancel="acceptDialog"
      ref="aletDialogRef"
      withIcon
      icon="mdi-alert-circle"
      colorIcon="red"
    />
  </div>
</template>

<script lang="ts">
import {
  connect,
  RemoteAudioTrack,
  RemoteParticipant,
  RemoteTrack,
  RemoteVideoTrack,
  Room,
} from "twilio-video";
import axios from "axios";
import Vue from "vue";
import { Nullable, IMuteUnmuteOptions } from "../types";
import AlertDialog from "@/components/AlertDialog.vue";
import ControlsButton from "../components/ControlsButton.vue";
import { AxiosError } from "axios";
import { mapActions } from "vuex";

export default Vue.extend({
  name: "VideoPage",
  data() {
    return {
      identity: "",
      room: null as Room | null,
      isLoading: false,
      errorMessage: "",
      isAudioMuted: false,
      isVideoMuted: false,
    };
  },
  components: {
    AlertDialog,
    ControlsButton,
  },
  async created() {
    const role_id = this.$route.query.identity_id ?? "";
    const appointMentId = this.$route.params.id;
    await this.startVideo(role_id, appointMentId);
    this.setLayout("NoLayout");
  },
  beforeRouteLeave(to, from, next) {
    this.room?.disconnect();
    next();
  },
  methods: {
    ...mapActions("$_commons", {
      setLayout: "setLayout",
    }),
    async startVideo(
      identity: string | (string | null)[],
      appointment_id: string
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

        this.room = await connect(data.token, {
          name: `room_no_${appointment_id}`,
          audio: { noiseSuppression: true, echoCancellation: true },
          video: { height: 1920, frameRate: 24, width: 1080 },
          bandwidthProfile: {
            video: {
              mode: "collaboration",
            },
          },
          preferredVideoCodecs: [{ codec: "VP8", simulcast: true }],
          networkQuality: { local: 1, remote: 1 },
        });

        this.room.localParticipant.videoTracks.forEach((video) => {
          localMediaContainer?.append(video.track.attach());
        });

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
      const alertDialogRef = this.$refs.aletDialogRef as any;
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
  },
});
</script>
<style>
video {
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
  height: 300px;
  width: 170px;
  border-radius: 5px;
  border: 2px solid #b366f9;
  -webkit-box-shadow: 3px 3px 15px -1px rgba(0, 0, 0, 0.77);
  box-shadow: 3px 3px 15px -1px rgba(0, 0, 0, 0.77);
  z-index: 999;
}

#controls {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1em;
}

.control-container {
  background-color: rgb(179, 102, 249, 0.9);
  padding: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

@media screen and (max-width: 600px) {
  .smallFrame {
    height: 80px;
    width: 120px;
  }

  .control-container img {
    height: 20px;
    width: 20px;
  }
}
</style>
