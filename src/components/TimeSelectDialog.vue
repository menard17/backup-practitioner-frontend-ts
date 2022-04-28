<template>
  <v-dialog v-model="dialog" width="300">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col align="start"> Select Time </v-col>
          <v-col align="end">
            <v-btn icon @click="cancel">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <div class="text-center">
        <date-picker
          mode="time"
          v-model="timePicker"
          :model-config="modelConfig"
          :minute-increment="15"
        />
      </div>
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
          @click="onTimeSelected"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import DatePicker from "v-calendar/lib/components/date-picker.umd";

export default {
  name: "TimeSelectDialog",
  components: { DatePicker },
  data() {
    return {
      dialog: false,
      timePicker: "",
      allowedStep: (m) => m % 15 === 0,
      modelConfig: {
        type: "string",
        mask: "HH:mm", // Uses 'iso' if missing
      },
    };
  },
  methods: {
    toggleDialog() {
      this.dialog = !this.dialog;
    },
    cancel() {
      this.dialog = false;
    },
    onTimeSelected() {
      this.$emit("onTimeSelected", this.timePicker);
      this.cancel();
    },
  },
};
</script>

<style scoped></style>
