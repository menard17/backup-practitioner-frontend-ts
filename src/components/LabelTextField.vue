<template>
  <div>
    <div class="mb-2 subtitle-2">
      {{ label }}
    </div>
    <v-text-field
      dense
      outlined
      hide-details
      v-bind:value="value"
      v-on:input="$emit('input', $event)"
    />
  </div>
</template>

<script>
export default {
  name: "LabelTextField",
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: () => "",
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
