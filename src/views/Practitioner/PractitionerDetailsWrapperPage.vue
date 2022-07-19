<template>
  <div v-if="practitioner && practitionerRole">
    <practitioner-details-page
      v-if="!isUpdatingPractitionerRole"
      :user="{}"
      :practitioner="practitioner"
      :practitioner-role="practitionerRole"
      @updatePractitionerRole="updatePractitionerRole"
      @updateSchedule="updateSchedule"
    />
    <v-skeleton-loader v-else type="article"></v-skeleton-loader>
  </div>
</template>

<script>
import PractitionerDetailsPage from "@/views/Practitioner/PractitionerDetailsPage";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "PractitionerDetailsWrapperPage",
  components: { PractitionerDetailsPage },
  computed: {
    ...mapState("$_practitioners", {
      isUpdatingPractitionerRole: (state) =>
        state.loadingData.updatePractitioner.isLoading,
    }),
    ...mapGetters("$_practitioners", {
      practitioner: "practitioner",
      practitionerRole: "practitionerRole",
    }),
  },
  created() {
    console.log(this.$route.params.id);
    this.getPractitionerById(this.$route.params.id);
    this.getPractitionerRoleByPractitionerId(this.$route.params.id);
  },
  methods: {
    ...mapActions("$_practitioners", {
      getPractitionerRoleByPractitionerId:
        "getPractitionerRoleByPractitionerId",
      getPractitionerById: "getPractitionerById",
      updatePractitionerRole: "updatePractitioner",
    }),
    updateSchedule(availableTime) {
      const changeFields = {
        available_time: availableTime,
      };

      this.updatePractitionerRole({
        payload: changeFields,
        practitionerRoleId: this.practitionerRole.id,
      });
    },
  },
};
</script>

<style scoped></style>
