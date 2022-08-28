<template>
  <div>
    <data-table title="Practitioner Roles">
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
import { mapActions, mapState } from "vuex";

export default {
  name: "PractitionerRolesPage",
  components: { DataTable },
  data() {
    return {
      search: "",
      selectedType: "doctor",
      headers: [
        {
          text: "Last Name",
          value: "practitionerObj.name[0].family",
        },
        {
          text: "First Name",
          value: "practitionerObj.name[0].given[0]",
        },
        {
          text: "Role",
          value: "code[0].coding[0].code",
        },
        {
          text: "Active",
          value: "active",
        },
      ],
    };
  },
  computed: {
    ...mapState("$_practitioners", {
      isLoading: (state) => state.loadingData.getPractitionerRoles.isLoading,
    }),
    ...mapState("$_practitioners", {
      practitionerRoles: "practitionerRoles",
    }),
  },
  created() {
    this.getPractitionerRoles(this.selectedType);
  },
  methods: {
    ...mapActions("$_practitioners", {
      getPractitionerRoles: "getPractitionerRoles",
    }),
    onTypeChange() {
      this.getPractitionerRoles(this.selectedType);
    },
    rowClicked(item) {
      console.log("row:", item);
      this.$router.push(`/practitioners/${item.practitionerObj.id}`);
    },
  },
};
</script>

<style scoped></style>
