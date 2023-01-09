<template>
  <div class="home">
    <v-container>
      <div v-if="isLoading">
        <v-skeleton-loader type="article"></v-skeleton-loader>
      </div>
      <v-row v-if="!practitioner && !isLoadingCurrentUser" class="mt-4">
        <v-col>
          <div>
            Please create a Request to be a Practitioner to start meeting
            patients
          </div>
          <v-btn
            @click="openPractitionerRequestDialog(true)"
            class="text-none subtitle-2 mt-2"
          >
            Request to be a practitioner
          </v-btn>
        </v-col>
      </v-row>
      <div v-if="practitioner && practitionerRole && user">
        <v-overlay :value="isUpdateLoading">
          <v-progress-circular
            :indeterminate="true"
            size="64"
          ></v-progress-circular>
        </v-overlay>
        <practitioner-details-page
          v-if="!isLoading"
          :user="user"
          :practitioner="practitioner"
          :practitioner-role="practitionerRole"
          @updatePractitionerRole="updateMyPractitionerRole"
          @updateSchedule="updateMySchedule"
          @updatePractitionerStatus="updateMyStatus"
        />
      </div>
    </v-container>
    <practitioner-request-dialog
      v-if="user"
      :title="title"
      :user="user"
      ref="practitionerRequestDialogRef"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import PractitionerDetailsPage from "@/views/Practitioner/PractitionerDetailsPage";
import PractitionerRequestDialog from "@/views/Practitioner/Dialogs/PractitionerRequestDialog";

export default {
  name: "MyAccountPage",
  components: {
    PractitionerRequestDialog,
    PractitionerDetailsPage,
  },
  data() {
    return {
      title: "",
      isNewPractitioner: false,
      deleteDialog: false,
      scheduleItemIndexToDelete: null,
    };
  },
  computed: {
    ...mapGetters("$_account", {
      practitioner: "practitioner",
      practitionerRole: "practitionerRole",
    }),
    ...mapState("$_account", {
      user: "user",
      isLoadingCurrentUser: (state) =>
        state.loadingData.getCurrentUser.isLoading,
      isUpdatingPractitionerRole: (state) =>
        state.loadingData.updateMyPractitionerRole.isLoading,
      isUpdatingPractitionerStatus: (state) =>
        state.loadingData.updateMyPractitionerStatus.isLoading,
    }),
    ...mapState("$_practitioners", {
      isUpdateLoading: (state) =>
        state.loadingData.updatePractitioner.isLoading,
    }),
    isLoading() {
      return (
        this.isLoadingCurrentUser ||
        this.isUpdatingPractitionerRole ||
        this.isUpdatingPractitionerStatus
      );
    },
  },
  created() {
    this.getCurrentUser();
  },
  methods: {
    ...mapActions("$_account", {
      getCurrentUser: "getCurrentUser",
      updateMyPractitionerRole: "updateMyPractitionerRole",
      updateMyPractitionerStatus: "updateMyPractitionerStatus",
    }),
    updateMySchedule(availableTime, visitType) {
      const changeFields = {
        available_time: availableTime,
        visit_type: visitType,
      };

      this.updateMyPractitionerRole({ changeFields });
    },
    updateMyStatus({ practitionerStatus, practitionerRoleId }) {
      this.updateMyPractitionerStatus({
        practitionerStatus,
        practitionerRoleId,
      });
    },
    openPractitionerRequestDialog: function (isNewPractitioner) {
      this.title = "Practitioner";
      this.$refs.practitionerRequestDialogRef?.toggleDialog(
        this.practitioner,
        this.practitionerRole,
        isNewPractitioner,
        true /*isMyPractitioner*/
      );
    },
  },
};
</script>
