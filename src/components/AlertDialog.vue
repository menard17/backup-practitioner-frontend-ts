<template>
  <v-dialog
    v-model="dialog"
    max-width="290"
    persistent
    :hide-overlay="isHideOverlay"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-card-title class="flex text-center text-h5">
        <v-icon v-show="withIcon" :color="colorIcon" size="50" v-text="icon" />
        <span v-text="title" />
      </v-card-title>

      <v-card-text v-text="content" />
      <v-card-actions>
        <v-btn color="red darken-1" text @click="onConfirm"> Confirm </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { PropType } from "vue";
import Vue from "vue";
type IconType =
  | "mdi-alert-circle"
  | "mdi-help-circle"
  | "mdi-information-outline";

export default Vue.extend({
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    onConfirm() {
      this.$emit("confirm");
      this.dialog = false;
    },
    toggleDialog() {
      this.dialog = !this.dialog;
    },
  },
  props: {
    title: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    withIcon: {
      type: Boolean,
      required: false,
    },
    icon: {
      type: String as PropType<IconType>,
      default: "mdi-information-outline",
    },
    colorIcon: {
      type: String,
      default: "red",
    },
    isHideOverlay: {
      type: Boolean,
      default: true,
    },
  },
});
</script>
