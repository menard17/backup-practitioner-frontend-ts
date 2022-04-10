<template>
  <v-dialog width="500" v-model="dialog">
    <v-card>
      <v-card-title>
        <v-row justify="space-between">
          <v-col align="start"> Create Appointment </v-col>
          <v-col align="end">
            <v-btn icon @click="cancel">
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <div class="pa-4">
        <v-row dense justify="start">
          <v-col align="start">
            <div class="subtitle-2 mb-2">Patient</div>
            <v-row>
              <v-col>
                <v-text-field
                  outlined
                  readonly
                  dense
                  hide-details
                  label="First Name"
                  :value="patient.firstName"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  outlined
                  readonly
                  dense
                  hide-details
                  label="Family Name"
                  :value="patient.familyName"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row dense justify="start">
          <v-col align="start">
            <div class="subtitle-2 mb-2">Practitioner</div>
            <v-autocomplete
              :items="practitioners"
              item-text="name"
              item-value="id"
              v-model="selectedPractitioner"
              @change="onPractitionerSelected"
              hide-details
              dense
              outlined
              :loading="isLoadingPractitionerRole || isLoadingPractitioners"
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                >
                  <v-avatar left>
                    <v-img
                      :src="`data:${data.item.photo.type};base64,${data.item.photo.data}`"
                    ></v-img>
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template class="align-start">
                  <v-list-item-avatar>
                    <v-img
                      :src="`data:${data.item.photo.type};base64,${data.item.photo.data}`"
                    />
                  </v-list-item-avatar>
                  <v-list-item-content align="start">
                    <v-list-item-title
                      v-html="data.item.name"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="data.item.id"
                      class="grey--text"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-row align="start">
          <v-col align="start">
            <div class="subtitle-2 mb-2">Start Date Time</div>
            <v-text-field
              outlined
              dense
              hide-details
              @click="openDateTimeDialog('start')"
              v-model="start"
            />
          </v-col>
          <v-col align="start">
            <div class="subtitle-2 mb-2">Duration</div>
            <v-select
              dense
              outlined
              hide-details
              v-model="duration"
              :disabled="!start ? true : false"
              @change="setEndTimeFromDuration"
              :items="Object.values(durations)"
            />
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="6" align="start">
            <div class="subtitle-2 mb-2">Service</div>
            <v-select
              dense
              outlined
              hint="A nurse can only have visit service"
              persistent-hint
              v-model="service"
              :items="['Online', 'Visit']"
            />
          </v-col>
        </v-row>
      </div>
      <v-card-actions>
        <v-spacer />
        <v-btn
          @click="cancel"
          :disabled="isLoadingCreateAppointment"
          color="error"
          class="text-none subtitle-2"
          outlined
        >
          Cancel</v-btn
        >
        <v-btn
          :loading="isLoadingCreateAppointment"
          :disabled="isLoadingCreateAppointment"
          color="primary"
          class="text-none subtitle-2"
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
    <date-time-select-dialog
      @onDateSelected="onDateSelected"
      ref="dateTimeSelectDialogRef"
    />
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import DateTimeSelectDialog from "@/components/DateTimeSelectDialog";
import { format, add } from "date-fns";
import { TimeConstants } from "@/utils/constants";

export default {
  name: "CreateAppointmentDialog",
  components: { DateTimeSelectDialog },
  props: {
    patient: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      selected: "",
      start: "",
      end: "",
      duration: "",
      isFollowUp: true,
      service: null,
      selectedPractitioner: null,
      selectedPractitionerRoleId: "",
    };
  },
  computed: {
    ...mapState("$_practitioners", {
      practitionerRole: "practitionerRole",
    }),
    ...mapState("$_practitioners", {
      isLoadingPractitionerRole: (state) =>
        state.loadingData.getPractitionerRoleByPractitionerId.isLoading,
      isLoadingPractitioners: (state) =>
        state.loadingData.getPractitioners.isLoading,
    }),
    ...mapState("$_appointments", {
      isLoadingCreateAppointment: (state) =>
        state.loadingData.createAppointment.isLoading,
    }),
    ...mapGetters("$_practitioners", {
      practitioners: "practitioners",
    }),
    durations() {
      return {
        quarterHour: "15 mins",
        halfHour: "30 mins",
        threeQuarterHour: "45 mins",
        oneHour: "1 Hour",
      };
    },
    payload() {
      return {
        practitioner_role_id: this.selectedPractitionerRoleId,
        patient_id: this.patient.id,
        start: this.formatAppointmentDateTime(this.start),
        end: this.formatAppointmentDateTime(this.end),
        service_type: this.isFollowUp ? "followup" : "",
        service: this.service.toLowerCase(),
      };
    },
  },
  created() {
    this.getPractitioners();
  },
  methods: {
    ...mapActions("$_practitioners", {
      getPractitioners: "getPractitioners",
      getPractitionerRoleByPractitionerId:
        "getPractitionerRoleByPractitionerId",
    }),
    ...mapActions("$_appointments", {
      createAppointment: "createAppointment",
    }),
    setEndTimeFromDuration(duration) {
      switch (duration) {
        case this.durations.quarterHour:
          this.end = add(this.start, { minutes: 15 });
          break;
        case this.durations.halfHour:
          this.end = add(this.start, { minutes: 30 });
          break;
        case this.durations.threeQuarterHour:
          this.end = add(this.start, { minutes: 45 });
          break;
        case this.durations.oneHour:
          this.end = add(this.start, { minutes: 60 });
          break;
      }
    },
    formatAppointmentDateTime(dateTime) {
      const newDateTime = new Date(
        `${format(dateTime, TimeConstants.yearMonthDay)}T${format(
          dateTime,
          TimeConstants.militaryTime
        )}+09:00`
      ).toISOString();
      console.log("NEW DATE TIME: ", newDateTime);
      return newDateTime;
    },
    openDateTimeDialog(selected) {
      this.selected = selected;
      this.$refs.dateTimeSelectDialogRef.toggleDialog();
    },
    onDateSelected(dateTime) {
      if (this.selected === "start") {
        this.start = dateTime;
      } else {
        this.end = dateTime;
      }
      this.selected = "";
    },
    cancel() {
      this.start = "";
      this.end = "";
      this.duration = "";
      this.selected = "";
      this.selectedPractitionerRoleId = "";
      this.selectedPractitioner = null;
      this.service = null;
      this.dialog = false;
    },
    async onPractitionerSelected(practitionerId) {
      await this.getPractitionerRoleByPractitionerId(practitionerId);
      this.selectedPractitionerRoleId = this.practitionerRole.id;
    },
    async save() {
      console.log("Creating Appointment", this.payload);
      const appointment = await this.createAppointment(this.payload);
      console.log("NEW APPT: ", appointment);
      this.$emit("onCreated", appointment);
      this.cancel();
    },
    toggleDialog() {
      this.dialog = !this.dialog;
    },
  },
};
</script>

<style scoped></style>
