<template>
  <div>
    <data-table title="Practitioners">
      <template v-slot:headerButton>
        <v-select
          hide-details
          outlined
          dense
          @change="onTypeChange"
          v-model="selectedType"
          :items="['doctor', 'nurse', 'porter']"
        />
      </template>
      <v-data-table
        :headers="headers"
        :items="practitionerRoles"
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

<script>
import DataTable from "@/components/DataTable";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "PractitionersPage",
  components: { DataTable },
  data() {
    return {
      search: "",
      selectedType: "doctor",
      headers: [
        {
          text: "En First Name",
          value: "en.firstName",
        },
        {
          text: "En Family Name",
          value: "en.familyName",
        },
        {
          text: "Jp First Name",
          value: "jp.firstName",
        },
        {
          text: "Jp Family Name",
          value: "jp.familyName",
        },
        {
          text: "Email",
          value: "email",
        },
        {
          text: "Gender",
          value: "sex",
        },
        {
          text: "Type",
          value: "roleType",
        },
        {
          text: "Active",
          value: "active",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("$_practitioners", {
      practitioners: "practitioner",
      practitionerRoles: "practitionerRoles",
    }),
    ...mapState("$_practitioners", {
      isLoading: (state) => state.loadingData.getPractitionerRoles.isLoading,
    }),
  },
  created() {
    if (this.practitionerRoles) {
      return;
    }

    this.getPractitionerRoles(this.selectedType);
  },
  methods: {
    ...mapActions("$_practitioners", {
      getPractitionerRoles: "getPractitionerRoles",
    }),
    rowClicked(item) {
      console.log(item);
      this.$router.push(`/practitioners/${item.id}`);
    },
    onTypeChange() {
      this.getPractitionerRoles(this.selectedType);
    },
  },
};
</script>

<style scoped></style>
