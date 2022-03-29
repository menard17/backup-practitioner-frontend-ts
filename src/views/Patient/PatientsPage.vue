<template>
  <div>
    <data-table title="Patients">
      <v-data-table
        :headers="headers"
        :items="patients"
        :items-per-page="30"
        class="elevation-0"
        :search="search"
        :loading="isLoading"
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
  },
});
</script>

<style></style>
