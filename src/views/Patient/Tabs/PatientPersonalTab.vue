<template>
  <v-container v-if="!isLoading">
    <v-card>
      <v-card-title> Personal Information </v-card-title>
      <grid-list :items="personal" />
      <div class="pa-7">
        <document-reference-wrapper />
      </div>
    </v-card>
    <v-card class="mt-4">
      <v-card-title> Contact Information </v-card-title>
      <grid-list :items="contact" />
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import GridList from "@/components/GridList.vue";
import DocumentReferenceWrapper from "../DocumentReferenceWrapper.vue";
export default {
  name: "PatientPersonalTab",
  components: { GridList, DocumentReferenceWrapper },
  computed: {
    ...mapGetters("$_patients", {
      patient: "patient",
      appointments: "appointments",
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
        subtitle: this.patient?.firstName,
      };

      const familyName = {
        title: "Family Name",
        subtitle: this.patient?.familyName,
      };

      const kanaGivenName = {
        title: "Kana Given Name",
        subtitle: this.patient?.kanaFirstName,
      };

      const kanaFamilyName = {
        title: "Kana family Name",
        subtitle: this.patient?.kanaFamilyName,
      };

      const sex = {
        title: "Sex",
        subtitle: this.patient?.sex.toUpperCase() || "Not Provided",
      };

      const birthDate = {
        title: "Birth Date",
        subtitle: this.patient?.birthDate || "Not Provided",
      };

      return [
        familyName,
        firstName,
        kanaFamilyName,
        kanaGivenName,
        sex,
        birthDate,
      ];
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
};
</script>

<style></style>
