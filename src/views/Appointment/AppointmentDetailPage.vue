<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col> Appointment Information </v-col>
        </v-row>
      </v-card-title>
      <v-skeleton-loader v-if="isLoading" type="article"></v-skeleton-loader>

      <div class="pa-4" v-if="appointment && patient">
        <v-row dense>
          <v-col>
            <label-text-field
              label="Start Time"
              :text="`${appointment.date} ${appointment.start}`"
            />
          </v-col>
          <v-col>
            <label-text-field
              label="End Time"
              :text="`${appointment.date} ${appointment.end}`"
            />
          </v-col>
        </v-row>
        <v-row dense class="mt-5 px-1">
          <v-card outlined width="100%">
            <v-expansion-panels :value="0" flat>
              <v-expansion-panel>
                <v-expansion-panel-header
                  class="white--text font-weight-medium"
                  color="grey"
                >
                  Patient Details
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row class="mt-3">
                    <v-col
                      v-for="item in patientDetails"
                      :cols="item.cols || 6"
                      :key="item.title"
                    >
                      <title-subtitle
                        :title="item.title"
                        :subtitle="item.subtitle"
                      />
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-row>
        <v-row justify="start" class="mx-4 pt-4">
          <div class="mr-3">
            <title-subtitle title="zoom ID" :subtitle="zoomId" />
          </div>

          <title-subtitle title="zoom Passcode" :subtitle="zoomPasscode" />
        </v-row>

        <v-row>
          <v-col v-if="!encounter">
            <v-btn
              @click="confirmPatientJoined"
              class="text-none subtitle-2"
              color="primary"
            >
              Start Encounter
            </v-btn>
          </v-col>
        </v-row>
        {{ encounter }}
        <v-row class="mt-5" dense no-gutters>
          <v-col>
            <v-row class="mb-2" align="center">
              <v-col>
                <div class="subtitle-2">Doctors Notes</div>
              </v-col>
              <v-col>
                <v-btn
                  color="primary"
                  @click="openCreateAppointmentDialog"
                  class="text-none subtitle-2"
                  >Create a follow up
                </v-btn>
                <v-btn
                  @click="confirmPatientJoined"
                  class="text-none subtitle-2 ml-3"
                  color="primary"
                >
                  End Encounter
                </v-btn>
              </v-col>
            </v-row>

            <v-textarea
              outlined
              v-model="notes"
              placeholder="Enter your notes here"
            />
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="6">
            <label-text-field
              label="Practitioner EN"
              :text="practitionerNameEn"
            />
          </v-col>
          <v-col cols="6">
            <label-text-field
              label="Practitioner JP"
              :text="practitionerNameJp"
            />
          </v-col>
        </v-row>
      </div>
    </v-card>
    <start-encounter-dialog
      @onYesClicked="startEncounter"
      ref="startEncounterDialogRef"
    />

    <create-appointment-dialog
      v-if="patient"
      :patient="patient"
      @onCreated="onAppointmentCreated"
      ref="createAppointmentDialogRef"
    />
    <status-dialog ref="statusDialogRef">
      <v-btn class="text-none subtitle-2"> Go to Appointment </v-btn>
    </status-dialog>
    <v-overlay v-model="isCreatingEncounter">
      <v-progress-circular />
    </v-overlay>
  </v-container>
</template>

<script>
import LabelTextField from "@/components/LabelTextField.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import TitleSubtitle from "@/components/TitleSubtitle.vue";
import StartEncounterDialog from "./StartEncounterDialog.vue";
import CreateAppointmentDialog from "@/views/Appointment/Dialogs/CreateAppointmentDialog";
import StatusDialog from "@/components/StatusDialog";
import { StatusTypes } from "@/utils/constants";

export default {
  components: {
    StatusDialog,
    CreateAppointmentDialog,
    LabelTextField,
    TitleSubtitle,
    StartEncounterDialog,
  },
  name: "AppointmentDetailPage",
  data() {
    return {
      notes: "",
    };
  },
  computed: {
    ...mapState("$_appointments", {
      isLoading: (state) => state.loadingData.populateAppointment.isLoading,
      isCreatingEncounter: (state) =>
        state.loadingData.createEncounter.isLoading,
      encounter: (state) => state.encounter,
    }),
    ...mapGetters("$_appointments", {
      appointment: "appointment",
    }),
    ...mapGetters("$_patients", {
      patient: "patient",
    }),
    ...mapGetters("$_practitioners", {
      zoomId: "zoomId",
      zoomPasscode: "zoomPasscode",
      practitionerNameEn: "practitionerNameEn",
      practitionerNameJp: "practitionerNameJp",
    }),
    ...mapState("$_practitioners", {
      practitionerRole: "practitionerRole",
      practitioner: "practitioner",
    }),

    patientDetails() {
      return [
        {
          title: "Family Name",
          subtitle: this.patient.familyName,
        },
        {
          title: "First Name",
          subtitle: this.patient.firstName,
        },

        {
          title: "Email",
          subtitle: this.patient.email,
        },
        {
          title: "Phone",
          subtitle: this.patient.phone,
        },
        {
          title: "Address",
          subtitle: this.patient.address,
          cols: 12,
        },
        {
          title: "Sex",
          subtitle: this.patient.sex,
        },
        {
          title: "Birth Date",
          subtitle: this.patient.birthDate,
        },
      ];
    },
  },
  async created() {
    this.populateAppointment(this.$route.params.id);
  },
  methods: {
    ...mapActions("$_appointments", {
      populateAppointment: "populateAppointment",
      createEncounter: "createEncounter",
      updateEncounter: "updateEncounter",
      getEncounter: "getEncounter",
      createDiagnosticReport: "createDiagnosticReport",
    }),
    onAppointmentCreated(appointment) {
      const title = appointment ? "Success!" : "Failed";
      const body = appointment
        ? "The appointment was created successfully"
        : "There was a problem creating the appointment";
      const status = appointment ? StatusTypes.success : StatusTypes.error;
      this.$refs.statusDialogRef.toggleDialog({ title, body, status });
    },
    openCreateAppointmentDialog() {
      this.$refs.createAppointmentDialogRef.toggleDialog();
    },
    confirmPatientJoined() {
      this.$refs.startEncounterDialogRef.toggleDialog();
    },
    startEncounter() {
      console.log("Start Encounter");
      this.createEncounter(this.appointment);
    },
  },
};
</script>

<style></style>
