<template>
  <v-app>
    <home-wrapper-page />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import HomeWrapperPage from "@/views/HomeWrapperPage.vue";

export default Vue.extend({
  name: "App",
  components: { HomeWrapperPage },
});
</script>

<style></style>
