<template>
  <v-dialog width="500" v-model="dialog">
    <v-card class="py-6 px-2">
      <div class="mx-4">
        <v-row align="start">
          <v-col align-start cols="auto" class="title font-weight-bold">
            Reservation Method
          </v-col>
          <v-col align="end">
            <v-btn icon @click="cancel">
              <v-icon>mdi-close </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <div class="mx-4">
        <v-radio-group row v-model="visit_type">
          <v-radio label="Date and Time Appointment" value="appointment">
          </v-radio>
          <v-radio label="Queue" value="walk-in"></v-radio>
        </v-radio-group>
      </div>
      <div class="mx-4">
        <v-row>
          <v-col align-start cols="auto" class="title font-weight-bold">
            Add a schedule
          </v-col>
        </v-row>
      </div>
      <div class="mx-4">
        <v-row no-gutters dense>
          <v-col v-for="day in days" :key="day">
            <v-checkbox v-model="selectedDays" :value="day" :label="day" />
          </v-col>
        </v-row>
      </div>
      <div class="mx-4 mt-2">
        <v-row>
          <v-col>
            <v-text-field
              @click="openStartTimeSelectDialog"
              outlined
              readonly
              dense
              hide-details
              label="Start Time"
              v-model="startTime"
            />
          </v-col>
          <v-col>
            <v-text-field
              @click="openEndTimeSelectDialog"
              outlined
              readonly
              dense
              hide-details
              label="End Time"
              v-model="endTime"
            />
          </v-col>
        </v-row>
      </div>
      <v-card-actions class="mt-6">
        <v-spacer />
        <v-btn
          @click="cancel"
          color="error"
          class="text-none subtitle-2"
          outlined
        >
          Cancel</v-btn
        >
        <v-btn color="primary" class="text-none subtitle-2" @click="save">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
    <time-select-dialog
      @onTimeSelected="onStartTimeSelected"
      ref="startTimeSelectDialogRef"
    />
    <time-select-dialog
      @onTimeSelected="onEndTimeSelected"
      ref="endTimeSelectDialogRef"
    />
  </v-dialog>
</template>

<script>
import TimeSelectDialog from "@/components/TimeSelectDialog";
export default {
  name: "ScheduleDialog",
  components: { TimeSelectDialog },
  data() {
    return {
      dialog: false,
      selectedDays: [],
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      startTime: "",
      endTime: "",
      visit_type: "",
    };
  },
  computed: {
    changeFields() {
      return {
        daysOfWeek: this.selectedDays,
        availableStartTime: this.startTime,
        availableEndTime: this.endTime,
      };
    },
  },
  methods: {
    toggleDialog() {
      this.dialog = !this.dialog;
    },
    cancel() {
      this.selectedDays = [];
      this.startTime = "";
      this.endTime = "";
      this.dialog = false;
      this.visit_type = "";
    },
    save() {
      this.$emit("save", this.changeFields, this.visit_type);
      this.cancel();
    },
    openStartTimeSelectDialog() {
      this.$refs.startTimeSelectDialogRef.toggleDialog();
    },
    openEndTimeSelectDialog() {
      this.$refs.endTimeSelectDialogRef.toggleDialog();
    },
    onStartTimeSelected(time) {
      this.startTime = `${time}:00`;
    },
    onEndTimeSelected(time) {
      this.endTime = `${time}:00`;
    },
  },
};
</script>

<style scoped></style>
