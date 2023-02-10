<template>
  <div id="controls">
    <v-btn color="primary" fab large dark @click="toggleVideo">
      <v-icon color="white">{{
        isVideoMutedProp ? "mdi-camera-off" : "mdi-camera"
      }}</v-icon>
    </v-btn>

    <v-btn color="primary" fab large dark @click="toggleAudio">
      <v-icon color="white">{{
        isAudioMutedProp ? "mdi-microphone-off" : "mdi-microphone"
      }}</v-icon>
    </v-btn>
    <v-btn color="error" fab large dark @click="leave">
      <v-icon color="white">mdi-exit-to-app</v-icon>
    </v-btn>

    <v-btn color="primary" fab large dark @click="call">
      <v-icon color="white">mdi-phone</v-icon>
    </v-btn>

    <v-btn color="primary" fab large dark @click="openSettings">
      <v-icon color="white">mdi-dots-vertical</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";

export default Vue.extend({
  name: "ControlButton",
  props: {
    isAudioMutedProp: {
      type: Boolean,
      required: true,
    },
    isVideoMutedProp: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    leave() {
      window.close();
    },
    toggleVideo() {
      this.$emit("toggleVideo");
    },
    toggleAudio() {
      this.$emit("toggleAudio");
    },
    openSettings() {
      this.$emit("openSelection");
    },
    ...mapActions({
      callPatient: "$_appointments/callPatient",
      getCallStatus: "$_appointments/getCallStatus",
    }),
    async call() {
      const appointment_id = this.$route.query.id ?? "";
      const patient_id = this.$route.query.patient_id ?? "";

      await this.callPatient({
        appointment_id: appointment_id,
        patient_id: patient_id,
      });

      await this.getCallStatus({
        appointment_id: appointment_id,
      });
    },
  },
  computed: {
    ...mapState("$_appointments", {
      callStatus: "callStatus",
      errorCall: "error",
    }),
  },
});
</script>
<style scoped>
#controls {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1em;
}

.control-container {
  padding: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

@media screen and (max-width: 600px) {
  .control-container img {
    height: 20px;
    width: 20px;
  }
}
</style>
