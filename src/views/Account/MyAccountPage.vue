<template>
  <div class="home">
    <v-container class="my-4">
      <v-card v-if="user">
        <v-row align="center" justify="center">
          <v-col align="center">
            <div class="headline">Welcome to UMed, {{ user.displayName }}!</div>
          </v-col>
        </v-row>
      </v-card>
      <div class="mt-10" v-if="isLoading">
        <div class="text-center mb-3">Loading...</div>
        <v-progress-linear indeterminate />
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
      <v-card class="mt-10" flat>
        <v-row v-if="practitioner && user">
          <v-col cols="4">
            <practitioner-details-card
              :practitioner="practitioner"
              :practitionerRole="practitionerRole"
              :user="user"
              @edit="openPractitionerRequestDialog(false)"
            />
          </v-col>

          <v-col>
            <div class="headline">
              <v-row>
                <v-col> Your Zoom Info </v-col>
                <v-col align="end">
                  <v-btn
                    @click="openZoomDetailsDialog"
                    class="text-none subtitle-2"
                    color="primary"
                  >
                    Edit
                  </v-btn>
                </v-col>
              </v-row>
            </div>
            <v-row dense>
              <v-col>
                <label-card
                  class="text-left mt-2"
                  label="Zoom ID"
                  :text="practitionerRole.zoomId"
                />
              </v-col>
              <v-col>
                <label-card
                  class="text-left mt-2"
                  label="Zoom Passcode"
                  :text="practitionerRole.zoomPasscode"
                />
              </v-col>
            </v-row>
            <div class="headline my-4">Your Schedule</div>
            <v-card>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Days Of Week</th>
                      <th class="text-left">Start Time</th>
                      <th class="text-left">End Time</th>
                      <th class="text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(time, i) in practitionerRole.availableTime"
                      :key="i"
                    >
                      <td>
                        <span v-for="day in time.daysOfWeek" :key="day">
                          {{ day.toUpperCase() }},
                        </span>
                      </td>
                      <td>{{ time.availableStartTime }}</td>
                      <td>{{ time.availableEndTime }}</td>
                      <td>
                        <v-icon @click="deleteScheduleItem(i)">
                          mdi-delete
                        </v-icon>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
            <v-btn
              @click="openScheduleDialog"
              class="text-none subtitle-2 mt-5"
              color="primary"
            >
              Add a schedule
            </v-btn>
          </v-col>
          <v-col cols="7"> </v-col>
        </v-row>
      </v-card>
    </v-container>
    <schedule-dialog
      v-if="practitioner && practitionerRole"
      ref="scheduleDialogRef"
      @save="addItemToMySchedule"
    />
    <practitioner-request-dialog
      v-if="user"
      :title="title"
      :user="user"
      ref="practitionerRequestDialogRef"
    />
    <zoom-detail-dialog
      v-if="practitionerRole"
      ref="zoomDetailsDialog"
      @save="updateZoomDetails"
    />

    <v-dialog v-model="deleteDialog" width="300">
      <v-card class="pa-4">
        <div>Are you sure you want to delete this Available Time?</div>

        <v-row no-gutters class="mt-4">
          <v-col class="mr-1">
            <v-btn block outlined color="error" @click="deleteDialog = false">
              No
            </v-btn>
          </v-col>
          <v-col>
            <v-btn block @click="deleteItemFromMySchedule" color="primary">
              Yes
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import PractitionerRequestDialog from "@/views/Practitioner/Dialogs/PractitionerRequestDialog.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import PractitionerDetailsCard from "@/views/Practitioner/PractitionerDetailsCard";
import ScheduleDialog from "@/views/Practitioner/Dialogs/ScheduleDialog";
import LabelCard from "@/components/LabelCard";
import ZoomDetailDialog from "@/views/Practitioner/Dialogs/ZoomDetailDialog";

export default {
  name: "MyAccountPage",
  components: {
    ZoomDetailDialog,
    LabelCard,
    ScheduleDialog,
    PractitionerDetailsCard,
    PractitionerRequestDialog,
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
      isLoadingCurrentUser: (state) =>
        state.loadingData.getCurrentUser.isLoading,
      isUpdatingPractitionerRole: (state) =>
        state.loadingData.updateMyPractitionerRole.isLoading,
    }),
    ...mapState("$_account", {
      user: "user",
    }),
    isLoading() {
      console.log(this.isLoadingCurrentUser, this.isUpdatingPractitionerRole);
      return this.isLoadingCurrentUser || this.isUpdatingPractitionerRole;
    },
  },
  created() {
    this.getCurrentUser();
  },
  methods: {
    ...mapActions("$_account", {
      getCurrentUser: "getCurrentUser",
      updateMyPractitionerRole: "updateMyPractitionerRole",
    }),
    deleteItemFromMySchedule() {
      const currentAvailableTime = this.practitionerRole.availableTime;

      currentAvailableTime.splice(this.scheduleItemIndexToDelete, 1);

      this.updateMySchedule(currentAvailableTime);
      this.deleteDialog = false;
    },
    addItemToMySchedule(availableTime) {
      const currentAvailableTime = this.practitionerRole.availableTime;
      const newAvailableTime = [...currentAvailableTime, availableTime];

      this.updateMySchedule(newAvailableTime);
    },
    updateMySchedule(availableTime) {
      const changeFields = {
        available_time: availableTime,
      };

      this.updateMyPractitionerRole({ changeFields });
    },
    openPractitionerRequestDialog: function (isNewPractitioner) {
      this.title = "Practitioner";
      this.$refs.practitionerRequestDialogRef?.toggleDialog(
        this.practitioner,
        this.practitionerRole,
        isNewPractitioner
      );
    },
    openScheduleDialog() {
      this.$refs.scheduleDialogRef.toggleDialog();
    },
    deleteScheduleItem(index) {
      this.scheduleItemIndexToDelete = index;
      this.deleteDialog = true;
    },
    openZoomDetailsDialog() {
      this.$refs.zoomDetailsDialog.toggleDialog(this.practitionerRole);
    },
    updateZoomDetails(zoomDetails) {
      const changeFields = {
        zoom_id: zoomDetails.zoomId,
        zoom_password: zoomDetails.zoomPasscode,
      };

      this.updateMyPractitionerRole({ changeFields });
    },
  },
};
</script>
