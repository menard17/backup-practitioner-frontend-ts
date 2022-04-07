<template>
  <div>
    <data-table title="Appointments">
      <template v-slot:headerButton>
        <v-btn @click="openCreateAppointmentDialog" depressed color="primary">
          <span class="body-2 font-weight-medium text-none">
            Create Appointment
          </span>
        </v-btn>
      </template>
      <v-data-table
        :headers="headers"
        :items="appointments"
        :items-per-page="30"
        class="elevation-0"
        :search="search"
        :loading="isLoadingAppointments || isLoadingMyAppointments"
        @click:row="rowClicked"
      >
      </v-data-table>
    </data-table>
  </div>
</template>

<script lang="ts">
import DataTable from "@/components/DataTable.vue";
import Vue from "vue";
import { mapActions, mapState, mapGetters } from "vuex";
import { formatDateString } from "@/utils/dateHelpers";
import { TimeConstants } from "@/utils/constants";

export default Vue.extend({
  components: { DataTable },
  name: "AppointmentsPage",
  data() {
    return {
      search: "",
      items: ["My Appointments", "All"],
      headers: [
        {
          text: "Patient Family Name",
          value: "patient.familyName",
        },
        {
          text: "Patient First Name",
          value: "patient.firstName",
        },
        { text: "Date", value: "date" },
        { text: "Start", value: "start" },
        { text: "End", value: "end" },
        {
          text: "Status",
          value: "status",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("$_appointments", {
      appointments: "appointments",
    }),
    ...mapState("$_appointments", {
      isLoadingAppointments: (state: any) =>
        state.loadingData.getAppointments.isLoading,
      isLoadingMyAppointments: (state: any) =>
        state.loadingData.getAppointmentsByPractitionerId.isLoading,
    }),
  },
  created() {
    if (!this.appointments.length) {
      this.getAppointmentsByPractitionerId({ practitionerId: "" });
    }
  },
  methods: {
    ...mapActions("$_appointments", {
      getAppointmentsByPractitionerId: "getAppointmentsByPractitionerId",
      getAppointments: "getAppointments",
    }),
    openCreateAppointmentDialog() {
      console.log("Open Create appointment Dialog");
    },
    editItem(item: any) {
      console.log("Edit item", item);
    },
    rowClicked(item: any) {
      this.$router.push(`/appointments/${item.id}`);
    },
    formatDate(date: string) {
      return formatDateString(date, TimeConstants.monthDayYearTime);
    },
  },
});
</script>

<style></style>
