<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col>
            {{ this.$t("Appointment Information") }}
            <v-chip v-if="appointment">
              {{ appointment.status.toUpperCase() }}</v-chip
            >
          </v-col>
        </v-row>
      </v-card-title>
      <v-skeleton-loader v-if="isLoading" type="article"></v-skeleton-loader>

      <div class="pa-4" v-else-if="appointment && patient">
        <v-row dense>
          <v-col>
            <label-text-field
              :label="this.$t('Start Time')"
              :text="`${appointment.date} ${appointment.start}`"
            />
          </v-col>
          <v-col>
            <label-text-field
              :label="this.$t('End Time')"
              :text="`${appointment.date} ${appointment.end}`"
            />
          </v-col>
        </v-row>
        <v-row dense class="mt-5 px-1">
          <v-card outlined width="100%">
            <v-expansion-panels
              v-model="patientDetailsExpansionPanel"
              :value="0"
              flat
              multiple
            >
              <v-expansion-panel>
                <v-expansion-panel-header
                  class="font-weight-medium"
                  color="grey lighten-2"
                >
                  {{ this.$t("Patient Details") }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="mt-5">
                    <v-btn
                      color="primary"
                      outlined
                      class="subtitle-2 text-none"
                      @click="openEditPatientDetailsDialog"
                    >
                      {{ this.$t("Edit Patient") }}
                    </v-btn>
                  </div>
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
                  <document-reference-wrapper class="pa-3" />
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-divider />
              <v-expansion-panel>
                <v-expansion-panel-header
                  class="font-weight-medium"
                  color="grey lighten-2"
                >
                  {{ this.$t("Appointment History") }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-expansion-panels
                    v-if="appointmentHistory.length"
                    v-model="appointmentHistoryExpansionPanel"
                    multiple
                    flat
                  >
                    <v-expansion-panel
                      v-for="appt in appointmentHistory"
                      :key="appt.id"
                    >
                      <v-expansion-panel-header class="subtitle-2">
                        {{ appt.date }}
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-divider class="mb-2 mx-4" />
                        <div class="px-4 pb-4">
                          <div class="title my-2">
                            {{ "Clinical Note" }}
                          </div>
                          <div
                            style="white-space: pre-line"
                            v-if="appt.clinicalNote"
                          >
                            {{ appt.clinicalNote.note }}
                          </div>
                          <div class="title my-4">
                            {{ "Medications" }}
                          </div>

                          <v-card outlined>
                            <v-card-text v-if="!appt.medications.length">
                              {{ "No Medications" }}
                            </v-card-text>
                            <v-list dense v-else>
                              <div
                                v-for="(medication, i) in appt.medications"
                                :key="medication.id"
                              >
                                <v-list-item dense>
                                  <v-list-item-content>
                                    {{ medication.display }}
                                  </v-list-item-content>
                                </v-list-item>
                                <v-divider
                                  v-if="i < appt.medications.length - 1"
                                />
                              </div>
                            </v-list>
                          </v-card>
                          <div class="title my-4">{{ "Tests" }}</div>
                          <v-card outlined>
                            <v-card-text v-if="!appt.tests.length">
                              {{ "No Tests" }}
                            </v-card-text>
                            <v-list dense v-else>
                              <div
                                v-for="(test, i) in appt.tests"
                                :key="test.id"
                              >
                                <v-list-item dense>
                                  <v-list-item-content>
                                    {{ test.display }}
                                  </v-list-item-content>
                                </v-list-item>
                                <v-divider v-if="i < appt.tests.length - 1" />
                              </div>
                            </v-list>
                          </v-card>
                        </div>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                  <div class="pa-4 text-center grey--text" v-else>
                    No Appointment History
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-row>

        <v-row v-if="!encounter" justify="start">
          <v-col>
            <v-btn
              @click="confirmPatientJoined"
              class="text-none subtitle-2 me-2"
              color="primary"
            >
              {{ this.$t("Start Session") }}
            </v-btn>
          </v-col>
          <v-col v-if="appointment.status !== 'cancelled'">
            <v-btn
              @click="openCancelAppointmentDialog"
              class="text-none subtitle-2"
              outlined
              color="error"
            >
              {{ this.$t("Cancel Appointment") }}
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              @click="goToVideo"
              class="text-none subtitle-2"
              color="primary"
            >
              {{ this.$t("join room") }}
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="encounter">
          <v-col>
            <div class="subtitle-2">{{ this.$t("Status") }}</div>
            <v-chip>
              {{ encounter.status.toUpperCase() }}
            </v-chip>
          </v-col>
          <v-col>
            <v-btn
              v-if="
                (encounter && encounter.status) === 'in-progress' &&
                clinicalNote &&
                clinicalNote.note
              "
              @click="endEncounter"
              class="text-none subtitle-2 ml-3"
              color="primary"
            >
              {{ this.$t("End Session") }}
            </v-btn>
            <v-btn
              v-if="(encounter && encounter.status) === 'in-progress'"
              @click="openCancelEncounterDialog"
              class="text-none subtitle-2"
              outlined
              color="error"
            >
              {{ this.$t("Cancel Encounter") }}
            </v-btn>
            <v-btn
              v-if="(encounter && encounter.status) === 'cancelled'"
              @click="inProgressEncounter"
              class="text-none subtitle-2"
              outlined
              color="primary"
            >
              {{ this.$t("Continue on encounter") }}
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="mt-5" dense no-gutters>
          <v-col>
            <v-row class="mb-2" align="center">
              <v-col>
                <div class="subtitle-2 mb-3">
                  {{ this.$t("Clinical Note") }}
                </div>
                <v-btn
                  :disabled="this.appointment.status == 'booked'"
                  @click="openCreateNoteDialog('clinicalNote')"
                  color="primary"
                  class="text-none subtitle-2 mr-3"
                >
                  {{ this.$t("Create a Note") }}
                </v-btn>
              </v-col>
            </v-row>
            <div v-if="clinicalNote">
              <v-card
                class="pa-4 mb-4"
                style="white-space: pre-line"
                v-if="!isCreatingClinicalNote"
              >
                <div class="subtitle-2 mb-2">
                  <v-row>
                    <v-col>
                      {{ clinicalNote.createdOn }}
                    </v-col>
                    <v-col align="end">
                      <v-btn
                        icon
                        @click="
                          openCreateNoteDialog(
                            'clinicalNote',
                            clinicalNote.note,
                            true
                          )
                        "
                      >
                        <v-icon> mdi-pencil </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>
                {{ clinicalNote.note }}
              </v-card>
              <v-skeleton-loader v-else type="article"></v-skeleton-loader>
            </div>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6">
            <label-text-field
              :label="this.$t('Tests')"
              v-if="this.encounter && this.test && this.test.length"
              :text="test[0].display"
            />
          </v-col>
          <v-col cols="6">
            <label-text-field
              :label="this.$t('Medications')"
              v-if="medications"
              :text="medications"
            />
          </v-col>
        </v-row>
        <v-row class="mt-5" dense no-gutters>
          <v-col>
            <v-row class="mb-2" align="center">
              <v-col v-if="isSuperUser()">
                <v-btn
                  color="primary"
                  @click="openCreateAppointmentDialog"
                  class="text-none subtitle-2"
                  >Create a follow up
                </v-btn>
              </v-col>
            </v-row>
            <div v-if="diagnosticReports && diagnosticReports.length">
              <v-card
                class="pa-4 mb-4"
                style="white-space: pre-line"
                v-for="report in diagnosticReports"
                :key="report.id"
              >
                <v-row v-if="report">
                  <v-col>
                    <div class="subtitle-2 mb-2">
                      {{ report.createdOn }}
                    </div>
                  </v-col>
                  <v-col align="end">
                    <v-btn
                      icon
                      @click="
                        openCreateNoteDialog('doctorNote', report.note, true)
                      "
                    >
                      <v-icon> mdi-pencil </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <div v-if="report">
                  {{ report.note }}
                </div>
              </v-card>
            </div>
            <v-skeleton-loader
              v-if="isCreatingDoctorNote"
              type="article"
            ></v-skeleton-loader>
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
      @onNoShowClicked="openNoShowConfirmDialog"
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
    <edit-patient-dialog ref="editPatientDialog" />
    <create-note-dialog
      @onSave="createClinicalNote"
      ref="createClinicalNoteDialog"
    />
    <confirm-dialog
      :title="this.$t('Cancel Appointment')"
      :message="this.$t('Cancel Description')"
      @save="confirmCancelAppointment"
      ref="confirmCancelAppointmentDialogRef"
      keyword="Cancel"
    />
    <confirm-dialog
      :title="this.$t('Cancel Encounter')"
      :message="this.$t('Cancel Description')"
      @save="cancelEncounter"
      ref="confirmCancelEncounterDialogRef"
      keyword="Cancel"
    />
    <confirm-dialog
      title="No Show?"
      message="Are you sure you want to mark this appointment as a no-show? Please type cancel"
      @save="confirmNoShow"
      ref="confirmNoShowDialogRef"
      keyword="Cancel"
    />
    <v-overlay v-model="isCreatingEncounter">
      <v-progress-circular indeterminate />
    </v-overlay>
  </v-container>
</template>

<script>
import LabelTextField from "@/components/LabelCard.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import TitleSubtitle from "@/components/TitleSubtitle.vue";
import StartEncounterDialog from "./StartEncounterDialog.vue";
import StatusDialog from "@/components/StatusDialog";
import { StatusTypes } from "@/utils/constants";
import { fomartStringDate } from "@/utils/dateHelpers";
import CreateNoteDialog from "@/views/Appointment/Dialogs/CreateNoteDialog";
import EditPatientDialog from "@/views/Patient/Dialogs/EditPatientDialog";
import DocumentReferenceWrapper from "../Patient/DocumentReferenceWrapper.vue";

import ConfirmDialog from "@/components/ConfirmDialog";
const CreateAppointmentDialog = () =>
  import("@/views/Appointment/Dialogs/CreateAppointmentDialog");

export default {
  components: {
    ConfirmDialog,
    EditPatientDialog,
    CreateNoteDialog,
    StatusDialog,
    CreateAppointmentDialog,
    LabelTextField,
    TitleSubtitle,
    StartEncounterDialog,
    DocumentReferenceWrapper,
  },
  name: "AppointmentDetailPage",
  data() {
    return {
      notes: "",
      patientDetailsExpansionPanel: [],
      appointmentHistoryExpansionPanel: [],
    };
  },
  watch: {
    patient() {
      if (!this.patient) {
        return;
      }
      this.getAppointmentsByPatientId({ patientId: this.patient.id });
      this.getEncountersByPatientId({ patientId: this.patient.id });
      this.getMedicationsByPatientId({ patientId: this.patient.id });
      this.getTestsByPatientId({ patientId: this.patient.id });
    },
  },
  computed: {
    ...mapState("$_appointments", {
      isLoading: (state) => state.loadingData.populateAppointment.isLoading,
      isCreatingEncounter: (state) =>
        state.loadingData.createEncounter.isLoading,
      isCreatingClinicalNote: (state) =>
        state.loadingData.createClinicalNote.isLoading,
      isCreatingDoctorNote: (state) =>
        state.loadingData.createDiagnosticReport.isLoading,
      encounter: (state) => state.encounter,
      clinicalNote: (state) => state.clinicalNote,
      test: (state) => state.test,
    }),
    ...mapGetters("$_appointments", {
      appointment: "appointment",
      diagnosticReports: "diagnosticReports",
      medications: "medications",
    }),

    ...mapGetters("$_patients", {
      patient: "patient",
      insuranceCard: "insuranceCard",
    }),
    ...mapGetters("$_practitioners", {
      practitionerNameEn: "practitionerNameEn",
      practitionerNameJp: "practitionerNameJp",
    }),
    ...mapState("$_patients", {
      patientObject: "patient",
      documentReferences: "documentReferences",
    }),
    ...mapState("$_practitioners", {
      practitionerRole: "practitionerRole",
      practitioner: "practitioner",
    }),
    ...mapGetters("$_appointmentHistory", {
      appointmentHistory: "appointments",
    }),
    patientDetails() {
      return [
        {
          title: this.$t("Patient Family Name"),
          subtitle: this.patient.familyName,
        },
        {
          title: this.$t("Patient First Name"),
          subtitle: this.patient.firstName,
        },

        {
          title: this.$t("Email"),
          subtitle: this.patient.email,
        },
        {
          title: this.$t("Phone"),
          subtitle: this.patient.phone,
        },
        {
          title: this.$t("Address"),
          subtitle: this.patient.address,
          cols: 12,
        },
        {
          title: this.$t("Sex"),
          subtitle: this.patient.sex,
        },
        {
          title: this.$t("Birth Date"),
          subtitle: this.patient.birthDate,
        },
      ];
    },
  },
  created() {
    this.populateAppointment(this.$route.params.id);
  },
  beforeRouteLeave(to, from, next) {
    if (this.encounter && this.encounter.status == "in-progress") {
      if (this.confirm() === false) {
        return;
      } else {
        return this.endEncounter();
      }
    }
    next();
  },
  methods: {
    ...mapActions("$_appointments", {
      populateAppointment: "populateAppointment",
      updateAppointment: "updateAppointment",
      createEncounter: "createEncounter",
      updateEncounter: "updateEncounter",
      createDiagnosticReport: "createDiagnosticReport",
      createClinicalNoteAction: "createClinicalNote",
      createMedicationsAction: "createMedications",
      createTestAction: "createTest",
    }),
    ...mapActions("$_application", {
      sendEmail: "sendEmail",
    }),
    ...mapActions("$_appointmentHistory", {
      getAppointmentsByPatientId: "getAppointmentsByPatientId",
      getEncountersByPatientId: "getEncountersByPatientId",
      getMedicationsByPatientId: "getMedicationsByPatientId",
      getTestsByPatientId: "getTestsByPatientId",
    }),
    onAppointmentCreated(appointment) {
      const title = appointment ? "Success!" : "Failed";
      const body = appointment
        ? "The appointment was created successfully"
        : "There was a problem creating the appointment";
      const status = appointment ? StatusTypes.success : StatusTypes.error;
      this.$refs.statusDialogRef.toggleDialog({ title, body, status });
    },
    sendCovidEmail() {
      const covid = "covid";
      const pcr = "PCR";
      if (this.test && this.test[0].value.includes(pcr)) {
        this.sendEmail({
          email: this.patient.email,
          familyName: this.patient.familyName,
          type: covid,
        });
      }
    },
    updateAppointmentStatus(appointment, status) {
      this.updateAppointment({
        appointmentId: appointment.id,
        status,
      });
    },
    openCreateAppointmentDialog() {
      this.$refs.createAppointmentDialogRef.toggleDialog();
      this.isOpenAppointmentDialog = !this.isOpenAppointmentDialog;
    },
    confirmPatientJoined() {
      this.$refs.startEncounterDialogRef.toggleDialog();
    },
    openCancelAppointmentDialog() {
      this.$refs.confirmCancelAppointmentDialogRef.toggleDialog();
    },
    openCancelEncounterDialog() {
      this.$refs.confirmCancelEncounterDialogRef.toggleDialog();
    },
    confirmCancelAppointment() {
      this.updateAppointmentStatus(this.appointment, "cancelled");
    },
    openNoShowConfirmDialog() {
      this.$refs.confirmNoShowDialogRef.toggleDialog();
    },
    confirmNoShow() {
      this.updateAppointmentStatus(this.appointment, "noshow");
    },
    endEncounter() {
      if (
        this.encounter &&
        this.appointment &&
        this.patient &&
        this.patient.email &&
        this.patient.phone &&
        this.patient.familyName &&
        this.patient.firstName &&
        this.appointment.date &&
        this.clinicalNote.note &&
        this.patient.address &&
        this.practitionerNameJp &&
        this.appointment.start &&
        this.patient.birthDate &&
        this.patient.sex &&
        this.insuranceCard &&
        this.appointment.date &&
        this.insuranceCard &&
        this.insuranceCard[0] &&
        this.insuranceCard[0].attachment &&
        fomartStringDate(new Date(this.appointment.date)) &&
        this.insuranceCard[0].attachment.url &&
        this.insuranceCard[this.insuranceCard.length - 1].attachment.url
      ) {
        // Finish Encounter
        this.updateEncounter({
          encounter: this.encounter,
          appointment: this.appointment,
          status: "finished",
          payload: {
            email: this.patient.email,
            phone: this.patient.phone,
            lastName: this.patient.familyName,
            firstName: this.patient.firstName,
            date: this.appointment.date,
            clinicalNote: this.clinicalNote.note,
            address: this.patient.address,
            doctor: this.practitionerNameJp,
            start: this.appointment.start,
            worksheet: fomartStringDate(new Date(this.appointment.date)),
            insuranceFront: this.insuranceCard[0].attachment.url,
            insuranceBack:
              this.insuranceCard[this.insuranceCard.length - 1].attachment.url,
            dob: this.patient.birthDate,
            sex: this.patient.sex,
            prescription: this.medications,
            test: this.test[0].display,
          },
        });
        this.sendCovidEmail();
      }
    },
    startEncounter() {
      this.createEncounter(this.appointment);
    },
    cancelEncounter() {
      this.updateEncounter({
        appointment: this.appointment,
        encounter: this.encounter,
        status: "cancelled",
      });
    },
    inProgressEncounter() {
      this.updateEncounter({
        appointment: this.appointment,
        encounter: this.encounter,
        status: "in-progress",
      });
    },
    createClinicalNote(note, medications, test) {
      this.createClinicalNoteAction({
        appointment: this.appointment,
        encounter: this.encounter,
        note,
      });

      // create medications
      this.createMedicationsAction({
        appointment: this.appointment,
        encounter: this.encounter,
        medicationArray: medications,
      });
      // create test
      this.createTestAction({
        appointment: this.appointment,
        encounter: this.encounter,
        test,
      });
    },
    openCreateNoteDialog(
      type,
      note = "",
      isEditing = false,
      test = "",
      medications = []
    ) {
      switch (type) {
        case "clinicalNote":
          this.$refs.createClinicalNoteDialog.toggleDialog(
            type,
            note,
            isEditing,
            test,
            medications
          );
          break;
      }
    },
    openEditPatientDetailsDialog(e) {
      e.preventDefault();
      this.$refs.editPatientDialog.toggleDialog(this.patientObject);
    },
    confirm() {
      return window.confirm(this.$t("Leave page without clinical note"));
    },
    isSuperUser() {
      const superUser = "super";
      return this.$route.query.user == superUser;
    },
    goToVideo() {
      const appointment_id = this.$route.params.id;
      window.open(
        `/video?identity_id=${this.practitionerRole.id}&id=${appointment_id}`,
        "newwindow",
        "width=1200,height=800"
      );
    },
  },
};
</script>

<style scoped>
.v-expansion-panel-content >>> .v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style>
