<script src="shims-vue.d.ts"></script>
<template>
  <v-app>
    <home-wrapper-page />
    <v-snackbar v-model="show" :color="color" :timeout="timeout" bottom right>
      {{ text }}
    </v-snackbar>
    <v-overlay :value="showLoadingOverlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import HomeWrapperPage from "@/views/HomeWrapperPage.vue";

export default Vue.extend({
  name: "App",
  components: { HomeWrapperPage },
  data() {
    return {
      showLoadingOverlay: false,
      show: false,
      color: "",
      text: "",
      timeout: -1,
    };
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "$_application/showNotification") {
        this.text = state.$_application.snackbar.text;
        this.color = state.$_application.snackbar.type;
        this.timeout = 5000;
        this.show = true;
      }
      if (mutation.type === "$_application/toggleLoadingOverlay") {
        this.showLoadingOverlay = !this.showLoadingOverlay;
      }
    });
  },
});
</script>

<style></style>
