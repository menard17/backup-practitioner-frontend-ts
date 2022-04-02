<template>
  <div>
    <div class="mb-2 subtitle-2">
      {{ label }}
    </div>
    <v-card outlined class="pa-2">
      {{ text }}
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: () => "",
    },
    label: {
      type: String,
      default: () => "",
    },
  },
};
</script>

<style></style>
