<template>
  <v-dialog max-width="580" v-model="dialog">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col align="start"> Select Date & Time </v-col>
          <v-col align="end">
            <v-btn icon @click="cancel">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-date-picker v-model="datePicker"></v-date-picker>
      <v-time-picker v-model="timePicker" :allowed-minutes="allowedStep" />
      <v-card-actions>
        <v-spacer />
        <v-btn
          @click="cancel"
          color="error"
          class="text-none subtitle-2"
          outlined
        >
          Cancel</v-btn
        >
        <v-btn
          color="primary"
          class="text-none subtitle-2"
          @click="onDateSelected"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DateTimeSelectDialog",
  props: {
    date: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      dialog: false,
      datePicker: "",
      timePicker: "",
      allowedStep: (m) => m % 15 === 0,
    };
  },
  methods: {
    toggleDialog() {
      this.dialog = !this.dialog;
    },
    cancel() {
      this.datePicker = "";
      this.timePicker = "";
      this.dialog = false;
    },
    onDateSelected() {
      if (!this.datePicker || !this.timePicker) {
        return;
      }
      this.$emit("onDateSelected", `${this.datePicker} ${this.timePicker}`);
      this.dialog = false;
    },
    dateStringToDate(dbDateString) {
      if (typeof dbDateString !== "string") {
        return dbDateString;
      }
      return new Date(dbDateString.replace(/-/g, "-").replace(/\..*$/, ""));
    },
  },
};
</script>

<style></style>
