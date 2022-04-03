<template>
  <v-container>
    <div class="headline my-3" v-if="patient">{{ patient.name }}</div>
    <v-tabs>
      <v-tab :to="{ name: 'patient-personal' }">Personal</v-tab>
      <v-tab :to="{ name: 'patient-appointments' }">Appointments</v-tab>
      <v-tab :to="{ name: 'patient-billing' }">Biling & Payments</v-tab>
    </v-tabs>
    <v-skeleton-loader v-if="isLoading" type="article"></v-skeleton-loader>
    <router-view />
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters("$_patients", {
      patient: "patient",
    }),
    ...mapState("$_patients", {
      isLoading: (state) => state.loadingData.getPatientById.isLoading,
    }),
  },
  async created() {
    console.log(this.$route);
    //  this.getPatientById(this.$route.params.id);
    // this.getAppointments(this.$route.params.id);
    // this.getPaymentMethods(this.$route.params.id);
    this.populatePatient(this.$route.params.id);
  },
  methods: {
    ...mapActions("$_patients", {
      populatePatient: "populatePatient",
    }),
  },
};
</script>

<style></style>
