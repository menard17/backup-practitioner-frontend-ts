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

<script lang="ts">
export default {
  name: "LabelCard",
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
