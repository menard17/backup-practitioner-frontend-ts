<template>
  <div>
    <data-table title="Patients">
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search Patients"
          single-line
          hide-details
          @keyup.enter="searchPatientName"
        ></v-text-field>
      </v-col>
      <v-data-table
        :headers="headers"
        :items="patients"
        :items-per-page="itemsPerPage"
        class="elevation-0"
        :loading="isLoading"
        @click:row="rowClicked"
        hide-default-footer
      >
      </v-data-table>
    </data-table>
    <div class="text-center">
      <v-btn small icon :disabled="isPrevDisabled" @click="prevClicked">
        <v-icon>$prev</v-icon>
      </v-btn>

      <v-btn small icon :disabled="isNextDisabled" @click="nextClicked">
        <v-icon>$next</v-icon>
      </v-btn>
    </div>
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
  name: "PatientsPage",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Kana Name",
          value: "kanaName",
        },
        {
          text: "Email",
          value: "email",
        },
        {
          text: "Phone Number",
          value: "phone",
        },
        {
          text: "Sex",
          value: "sex",
        },
        {
          text: "Birth Date",
          value: "birthDate",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("$_patients", {
      patients: "patients",
    }),
    ...mapState("$_patients", {
      isLoading: (state: any) => state.loadingData.getPatients.isLoading,
      isPrevDisabled: (state: any) => state.pagination.isPrevDisabled,
      isNextDisabled: (state: any) => state.pagination.isNextDisabled,
      itemsPerPage: (state: any) => state.pagination.pageSize,
    }),
  },
  created() {
    if (!this.patients.length) {
      this.getPatients();
    }
  },
  methods: {
    ...mapActions("$_patients", {
      getPatients: "getPatients",
      moveToNext: "moveToNext",
      moveToPrev: "moveToPrev",
      searchPatient: "searchPatient",
    }),
    editItem(item: any) {
      console.log("Edit item", item);
    },
    rowClicked(item: any) {
      this.$router.push(`/patients/${item.id}`);
    },
    formatDate(date: string) {
      return formatDateString(date, TimeConstants.monthDayYearTime);
    },
    nextClicked() {
      this.moveToNext();
    },
    prevClicked() {
      this.moveToPrev();
    },
    searchPatientName(event: KeyboardEvent) {
      event.preventDefault();
      this.searchPatient(this.search);
    },
  },
});
</script>

<style></style>
