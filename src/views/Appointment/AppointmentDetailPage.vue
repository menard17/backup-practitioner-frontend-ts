<template>
  <v-container style="max-width: 800px">
    <v-card>
      <v-card-title> Appointment Information </v-card-title>
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
        <v-row dense>
          <v-col cols="6">
            <label-text-field label="Patient" :text="`${patient.name}`" />
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
        <v-row>
          <v-col>
            <v-btn
              @click="confirmPatientJoined"
              class="text-none subtitle-2"
              color="primary"
            >
              Start Encounter
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="mt-5" dense no-gutters>
          <v-col>
            <div class="subtitle-2 mb-2">Doctors Notes</div>
            <v-textarea
              outlined
              v-model="notes"
              placeholder="Enter your notes here"
            />
          </v-col>
        </v-row>

        <v-row dense no-gutters>
          <v-col cols="6">
            <label-text-field label="Practitioner" :text="`Miwa Nishikawa`" />
          </v-col>
        </v-row>
      </div>
    </v-card>
    <start-encounter-dialog
      @onYesClicked="startEncounter"
      ref="startEncounterDialogRef"
    />
  </v-container>
</template>

<script>
import LabelTextField from "@/components/LabelTextField.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import TitleSubtitle from "@/components/TitleSubtitle.vue";
import StartEncounterDialog from "./StartEncounterDialog.vue";
export default {
  components: { LabelTextField, TitleSubtitle, StartEncounterDialog },
  name: "AppointmentDetailPage",
  data() {
    return {
      notes: "",
    };
  },
  computed: {
    ...mapState("$_appointments", {
      isLoading: (state) => state.loadingData.populateAppointment.isLoading,
    }),
    ...mapGetters("$_appointments", {
      appointment: "appointment",
    }),
    ...mapGetters("$_patients", {
      patient: "patient",
    }),
    patientDetails() {
      return [
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
    }),
    confirmPatientJoined() {
      this.$refs.startEncounterDialogRef.toggleDialog();
    },
    startEncounter() {
      console.log("Start Encounter");
    },
  },
};
</script>

<style></style>
