<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col>
            Appointment Information

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
                  <div class="mt-5">
                    <v-btn
                      color="primary"
                      outlined
                      class="subtitle-2 text-none"
                      @click="openEditPatientDetailsDialog"
                    >
                      Edit Patient
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
            </v-expansion-panels>
          </v-card>
        </v-row>
        <v-row justify="start" class="mx-4 pt-4" v-if="!encounter">
          <div class="mr-3">
            <title-subtitle title="zoom ID" :subtitle="zoomId" />
          </div>

          <title-subtitle title="zoom Passcode" :subtitle="zoomPasscode" />
        </v-row>

        <v-row v-if="!encounter" justify="start">
          <v-col>
            <v-btn
              @click="confirmPatientJoined"
              class="text-none subtitle-2"
              color="primary"
            >
              Start Session
            </v-btn>
          </v-col>
          <v-col v-if="appointment.status !== 'cancelled'">
            <v-btn
              @click="openCancelAppointmentDialog"
              class="text-none subtitle-2"
              outlined
              color="error"
            >
              Cancel Appointment
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="encounter">
          <v-col>
            <div class="subtitle-2">Encounter Status</div>
            <v-chip>
              {{ encounter.status.toUpperCase() }}
            </v-chip>
          </v-col>
          <v-col>
            <v-btn
              v-if="(encounter && encounter.status) === 'in-progress'"
              @click="endEncounter"
              class="text-none subtitle-2 ml-3"
              color="primary"
            >
              End Session
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="mt-5" dense no-gutters>
          <v-col>
            <v-row class="mb-2" align="center">
              <v-col>
                <div class="subtitle-2 mb-3">Clinical Notes</div>
                <v-btn
                  :disabled="this.appointment.status == 'booked'"
                  @click="openCreateNoteDialog('clinicalNote')"
                  color="primary"
                  class="text-none subtitle-2 mr-3"
                >
                  Create a Note
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
        <v-row class="mt-5" dense no-gutters>
          <v-col>
            <v-row class="mb-2" align="center">
              <v-col>
                <div class="subtitle-2 mb-3">Doctors Notes</div>

                <v-btn
                  @click="openCreateNoteDialog('doctorNote')"
                  color="primary"
                  class="text-none subtitle-2 mr-3"
                >
                  Create a Note
                </v-btn>
                <v-btn
                  color="primary"
                  @click="openCreateAppointmentDialog"
                  class="text-none subtitle-2"
                  >Create a follow up
                </v-btn>
              </v-col>
            </v-row>
            <div v-if="diagnosticReports.length">
              <v-card
                class="pa-4 mb-4"
                style="white-space: pre-line"
                v-for="report in diagnosticReports"
                :key="report.id"
              >
                <v-row>
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
                {{ report.note }}
              </v-card>
            </div>
            <v-skeleton-loader
              v-if="isCreatingDoctorNote"
              type="article"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row class="mt-5" dense no-gutters>
          <v-col>
            <v-row class="mb-2" align="center">
              <v-col>
                <div class="subtitle-2 mb-3">Send Emails</div>
                <v-btn
                  @click="
                    openEmailConfirmationDialog(
                      'covid',
                      'Cov-19 Test Kit Delivery'
                    )
                  "
                  color="primary"
                  class="text-none subtitle-2 mr-3"
                >
                  Cov-19 Deliver email
                </v-btn>
                <v-btn
                  @click="
                    openEmailConfirmationDialog(
                      'doctornote',
                      'Doctor note updates',
                      patient.email,
                      patient.familyName
                    )
                  "
                  color="primary"
                  class="text-none subtitle-2 mr-3"
                  >Doctor Note email
                </v-btn>
              </v-col>
            </v-row>
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
      @onNoShowClicked="updateAppointmentStatus(appointment, 'noshow')"
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
    <status-dialog ref="emailStatusDialogRef" />
    <edit-patient-dialog ref="editPatientDialog" />
    <create-note-dialog
      @onSave="createDoctorNote"
      ref="createDoctorNoteDialog"
    />
    <create-note-dialog
      @onSave="createClinicalNote"
      ref="createClinicalNoteDialog"
    />
    <confirm-cancel-appointment-dialog
      @save="confirmCancelAppointment"
      ref="confirmCancelAppointmentDialogRef"
    />
    <email-confirmation-dialog
      ref="emailConfirmationDialogRef"
      @onSent="onEmailSent"
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
import CreateAppointmentDialog from "@/views/Appointment/Dialogs/CreateAppointmentDialog";
import StatusDialog from "@/components/StatusDialog";
import { StatusTypes } from "@/utils/constants";
import { fomartStringDate } from "@/utils/dateHelpers";
import CreateNoteDialog from "@/views/Appointment/Dialogs/CreateNoteDialog";
import DocumentReferenceWrapper from "../Patient/DocumentReferenceWrapper.vue";
import EditPatientDialog from "@/views/Patient/Dialogs/EditPatientDialog";
import ConfirmCancelAppointmentDialog from "@/views/Appointment/Dialogs/ConfirmCancelAppointmentDialog";
import EmailConfirmationDialog from "@/views/Appointment/Dialogs/EmailConfirmationDialog";

export default {
  components: {
    ConfirmCancelAppointmentDialog,
    EditPatientDialog,
    CreateNoteDialog,
    StatusDialog,
    CreateAppointmentDialog,
    EmailConfirmationDialog,
    LabelTextField,
    TitleSubtitle,
    StartEncounterDialog,
    DocumentReferenceWrapper,
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
      isCreatingClinicalNote: (state) =>
        state.loadingData.createClinicalNote.isLoading,
      isCreatingDoctorNote: (state) =>
        state.loadingData.createDiagnosticReport.isLoading,
      encounter: (state) => state.encounter,
      clinicalNote: (state) => state.clinicalNote,
    }),
    ...mapGetters("$_appointments", {
      appointment: "appointment",
      diagnosticReports: "diagnosticReports",
    }),
    ...mapGetters("$_patients", {
      patient: "patient",
      insuranceCard: "insuranceCard",
    }),
    ...mapGetters("$_practitioners", {
      zoomId: "zoomId",
      zoomPasscode: "zoomPasscode",
      practitionerNameEn: "practitionerNameEn",
      practitionerNameJp: "practitionerNameJp",
    }),
    ...mapState("$_patients", {
      patientObject: "patient",
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
      updateAppointment: "updateAppointment",
      createEncounter: "createEncounter",
      updateEncounter: "updateEncounter",
      createDiagnosticReport: "createDiagnosticReport",
      createClinicalNoteAction: "createClinicalNote",
    }),
    ...mapActions("$_application", {
      insertSheet: "insertSheet",
    }),
    onAppointmentCreated(appointment) {
      const title = appointment ? "Success!" : "Failed";
      const body = appointment
        ? "The appointment was created successfully"
        : "There was a problem creating the appointment";
      const status = appointment ? StatusTypes.success : StatusTypes.error;
      this.$refs.statusDialogRef.toggleDialog({ title, body, status });
    },
    onEmailSent(sent) {
      const title = sent ? "Email is sent" : "Failed to send";
      const body = "";
      const status = "";
      this.$refs.emailStatusDialogRef.toggleDialog({ title, body, status });
    },
    updateAppointmentStatus(appointment, status) {
      this.updateAppointment({
        appointmentId: appointment.id,
        status,
      });
    },
    openCreateAppointmentDialog() {
      this.$refs.createAppointmentDialogRef.toggleDialog();
    },
    confirmPatientJoined() {
      this.$refs.startEncounterDialogRef.toggleDialog();
    },
    openCancelAppointmentDialog() {
      this.$refs.confirmCancelAppointmentDialogRef.toggleDialog();
    },
    openEmailConfirmationDialog(type, content) {
      this.$refs.emailConfirmationDialogRef.toggleDialog(
        type,
        content,
        this.patient.email,
        this.patient.familyName
      );
    },
    confirmCancelAppointment() {
      this.updateAppointmentStatus(this.appointment, "cancelled");
    },
    endEncounter() {
      this.updateEncounter({
        encounter: this.encounter,
        appointment: this.appointment,
        status: "finished",
      });

      this.insertSheet({
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
      });
    },

    startEncounter() {
      this.createEncounter(this.appointment);
    },
    createDoctorNote(note) {
      this.createDiagnosticReport({
        appointment: this.appointment,
        encounter: this.encounter,
        note,
      });
    },
    createClinicalNote(note) {
      this.createClinicalNoteAction({
        appointment: this.appointment,
        encounter: this.encounter,
        note,
      });
    },
    openCreateNoteDialog(type, note = "", isEditing = false) {
      switch (type) {
        case "doctorNote":
          this.$refs.createDoctorNoteDialog.toggleDialog(type, note, isEditing);
          break;
        case "clinicalNote":
          this.$refs.createClinicalNoteDialog.toggleDialog(
            type,
            note,
            isEditing
          );
          break;
      }
    },
    openEditPatientDetailsDialog(e) {
      e.preventDefault();
      this.$refs.editPatientDialog.toggleDialog(this.patientObject);
    },
  },
};
</script>

<style></style>
