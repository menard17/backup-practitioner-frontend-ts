<template>
  <v-container v-if="!isLoading">
    <v-card>
      <v-card-title> Personal Information </v-card-title>
      <grid-list :items="personal" />

      <v-row class="pa-4 px-6">
        <v-btn
          v-if="insuranceCard"
          @click="openDocumentReferenceDialog('insurance')"
          class="mr-2 subtitle-2 text-none"
        >
          Insurance Card
        </v-btn>
        <v-btn
          v-if="medicalRecord"
          @click="openDocumentReferenceDialog('medicalRecord')"
          class="subtitle-2 text-none"
        >
          Medical Record
        </v-btn>
      </v-row>
    </v-card>
    <v-card class="mt-4">
      <v-card-title> Contact Information </v-card-title>
      <grid-list :items="contact" />
    </v-card>
    <document-reference-dialog ref="documentReferenceDialogRef" />
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import GridList from "@/components/GridList.vue";
import DocumentReferenceDialog from "../DocumentReferenceDialog.vue";
export default {
  name: "PatientPersonalTab",
  components: { GridList, DocumentReferenceDialog },
  computed: {
    ...mapGetters("$_patients", {
      patient: "patient",
      appointments: "appointments",
      insuranceCard: "insuranceCard",
      medicalRecord: "medicalRecord",
    }),
    ...mapState("$_patients", {
      isLoading: (state) => state.loadingData.getPatientById.isLoading,
    }),
    personal() {
      if (!this.patient) {
        return [];
      }

      const firstName = {
        title: "First Name",
        subtitle: this.patient && this.patient.firstName,
      };

      const familyName = {
        title: "Family Name",
        subtitle: this.patient && this.patient.familyName,
      };

      const sex = {
        title: "Sex",
        subtitle:
          (this.patient.sex && this.patient.sex.toUpperCase()) ||
          "Not Provided",
      };

      const birthDate = {
        title: "Birth Date",
        subtitle: this.patient.birthDate || "Not Provided",
      };

      return [familyName, firstName, sex, birthDate];
    },
    contact() {
      if (!this.patient) {
        return [];
      }

      const email = {
        title: "Email",
        subtitle: this.patient.email || "Not Provided",
      };

      const phone = {
        title: "Phone",
        subtitle: this.patient.phone || "Not Provided",
      };

      const address = {
        cols: 12,
        title: "Address",
        subtitle: this.patient.address || "Not Provided",
      };

      return [email, phone, address];
    },
  },
  methods: {
    openDocumentReferenceDialog(documentType) {
      console.log(documentType);
      console.log(this.insuranceCard);
      switch (documentType) {
        case "insurance":
          this.$refs.documentReferenceDialogRef.toggleDialog(
            this.insuranceCard,
            "Insurance Card"
          );
          break;
        case "medicalRecord":
          this.$refs.documentReferenceDialogRef.toggleDialog(
            this.medicalRecord,
            "Medical Record"
          );
          break;
      }
    },
  },
};
</script>

<style></style>
