<template>
  <div>
    <div class="subtitle-2">
      {{ title }}
    </div>
    <div class="grey--text text--darken-2">
      {{ subtitle }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => "",
    },
    subtitle: {
      type: String,
      default: () => "",
    },
  },
};
</script>

<style></style>
