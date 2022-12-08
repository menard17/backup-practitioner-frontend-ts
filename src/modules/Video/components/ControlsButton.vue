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
  </div>
</template>

<script lang="ts">
import Vue from "vue";

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
  },
});
</script>
