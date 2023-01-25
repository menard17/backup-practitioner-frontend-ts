<template>
  <v-container
    v-if="practitioner && practitionerRole"
    style="max-width: 700px"
    class="mt-2"
  >
    <v-card>
      <v-row>
        <v-col align="end">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon> mdi-dots-vertical </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-if="practitioner.active"
                @click="openTogglePractitionerStatusDialog"
              >
                <v-list-item-title>Deactivate</v-list-item-title>
              </v-list-item>
              <v-list-item v-else @click="openTogglePractitionerStatusDialog">
                <v-list-item-title>Activate</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
      <v-row justify="center" v-if="practitionerRole.roleType != 'STAFF'">
        <v-col align="center">
          <v-avatar color="blue" size="150">
            <v-img
              :src="`data:${practitioner.photo.type};base64,${practitioner.photo.data}`"
            />
          </v-avatar>

          <div class="headline mt-4">
            {{ practitioner.en.firstName }} {{ practitioner.en.familyName }}
          </div>
          <div class="headline">
            {{ practitioner.jp.familyName }} {{ practitioner.jp.firstName }}
          </div>
          <div>
            <v-chip
              label
              dark
              :color="practitioner.active ? 'green' : 'red'"
              class="subtitle-2 my-2"
            >
              {{ practitioner.active ? "Active" : "Inactive" }}
            </v-chip>
          </div>
        </v-col>
      </v-row>
      <v-tabs grow :show-arrows="false">
        <v-tab v-for="item in items" :key="item"> {{ item }} </v-tab>
        <v-tab-item>
          <practitioner-details-card
            :practitioner="practitioner"
            :practitionerRole="practitionerRole"
            :user="user"
            @edit="openPractitionerRequestDialog(false, 'Practitioner')"
          />
        </v-tab-item>
        <v-tab-item>
          <v-card class="pa-4">
            <v-row class="mt-5" dense>
              <v-col cols="12">
                <div
                  class="subtitle-1 text-left"
                  v-if="practitionerRole.period"
                >
                  Serving Date Range
                </div>
              </v-col>
              <v-col>
                <label-card
                  v-if="practitionerRole.visitType"
                  class="text-left mt-2"
                  label="Visit Type"
                  :text="practitionerRole.visitType"
                />
                <label-card
                  class="text-left mt-2"
                  label="Start"
                  :text="practitionerRole.period.start"
                />
                <label-card
                  v-if="practitionerRole.period && practitionerRole.period.end"
                  class="text-left mt-2"
                  label="End"
                  :text="practitionerRole.period.end"
                />
              </v-col>
              <v-btn
                @click="openPractitionerRequestDialog(false, 'Scheduled')"
                block
                color="primary"
                class="mt-4 subtitle-2 text-none"
              >
                Edit
              </v-btn>
            </v-row>
            <v-card class="mt-5" dense>
              <v-col cols="12">
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
                <v-btn
                  @click="openScheduleDialog"
                  class="text-none subtitle-2 mt-5"
                  color="primary"
                  block
                >
                  Add a schedule
                </v-btn>
              </v-col>
            </v-card>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>

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
    <confirm-dialog
      :title="`${
        practitioner.active ? 'Deactivate' : 'Activate'
      } Practitioner?`"
      :message="`Are you sure you want to ${
        practitioner.active ? 'deactivate' : 'activate'
      }  this practitioner? `"
      ref="togglePractitionerStatusDialogRef"
      @save="togglePractitionerStatus"
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
  </v-container>
</template>

<script>
import LabelCard from "@/components/LabelCard.vue";
import PractitionerDetailsCard from "@/views/Practitioner/PractitionerDetailsCard";
import { mapState } from "vuex";
import ScheduleDialog from "@/views/Practitioner/Dialogs/ScheduleDialog";
import PractitionerRequestDialog from "@/views/Practitioner/Dialogs/PractitionerRequestDialog";
import ConfirmDialog from "@/components/ConfirmDialog";
export default {
  name: "PractitionerDetailsPage",
  components: {
    ConfirmDialog,
    LabelCard,
    PractitionerRequestDialog,
    ScheduleDialog,
    PractitionerDetailsCard,
  },
  props: {
    practitioner: {
      type: Object,
      required: true,
    },
    practitionerRole: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tab: null,
      items: ["Personal", "Schedule"],
      title: "",
      isNewPractitioner: false,
      deleteDialog: false,
      scheduleItemIndexToDelete: null,
    };
  },
  computed: {
    ...mapState("$_account", {
      isLoadingCurrentUser: (state) =>
        state.loadingData.getCurrentUser.isLoading,
      isUpdatingPractitionerRole: (state) =>
        state.loadingData.updateMyPractitionerRole.isLoading,
    }),
    isLoading() {
      return this.isLoadingCurrentUser || this.isUpdatingPractitionerRole;
    },
  },
  methods: {
    openTogglePractitionerStatusDialog() {
      this.$refs.togglePractitionerStatusDialogRef.toggleDialog();
    },
    togglePractitionerStatus() {
      this.$emit("updatePractitionerStatus", {
        practitionerStatus: !this.practitioner.active,
        practitionerRoleId: this.practitionerRole.id,
      });
    },
    deleteItemFromMySchedule() {
      const currentAvailableTime = this.practitionerRole.availableTime;
      currentAvailableTime.splice(this.scheduleItemIndexToDelete, 1);
      this.$emit("updateSchedule", currentAvailableTime);
      this.deleteDialog = false;
    },
    addItemToMySchedule(availableTime, visit_type) {
      const currentAvailableTime = this.practitionerRole.availableTime;
      const newAvailableTime = [...currentAvailableTime, availableTime];

      this.$emit("updateSchedule", newAvailableTime, visit_type);
    },
    updateMySchedule(availableTime) {
      const changeFields = {
        available_time: availableTime,
      };

      this.$emit("updatePractitionerRole", { changeFields });
    },
    openPractitionerRequestDialog: function (isNewPractitioner, title) {
      this.title = title;
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
  },
};
</script>

<style scoped></style>
