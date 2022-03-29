<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <hello-world />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default Vue.extend({
  name: "HomeView",
  components: { HelloWorld },
});
</script>
