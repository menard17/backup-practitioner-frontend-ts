<template>
  <div>
    <data-table title="My Appointments">
      <template v-slot:headerButton>
        <v-btn-toggle v-model="viewOption" borderless>
          <v-btn value="list">
            <v-icon left> mdi-format-list-bulleted </v-icon>
            <span class="hidden-sm-and-down">List</span>
          </v-btn>

          <v-btn value="calendar">
            <v-icon left> mdi-calendar </v-icon>
            <span class="hidden-sm-and-down">Calendar</span>
          </v-btn>
        </v-btn-toggle>
      </template>

      <v-data-table
        v-if="viewOption === 'list'"
        :headers="headers"
        :items="appointments"
        :items-per-page="30"
        class="elevation-0"
        :search="search"
        :loading="
          this.isLoadingAppointments ||
          this.isLoadingMyAppointments ||
          this.isLoadingSlots
        "
        @click:row="rowClicked"
      >
      </v-data-table>
      <v-sheet
        v-show="viewOption === 'calendar'"
        elevation="0"
        height="660"
        class="mb-10"
      >
        <v-row class="ma-1">
          <v-col>
            <v-btn
              @click="setToday"
              small
              outlined
              class="mr-4"
              color="grey darken-2"
            >
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small> mdi-chevron-left </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small> mdi-chevron-right </v-icon>
            </v-btn>
            <v-toolbar-title class="mt-4" v-if="$refs.calendarRef && ready">
              {{ $refs.calendarRef.title }}
            </v-toolbar-title>
          </v-col>

          <v-col align="end">
            <v-btn-toggle v-model="calendarRangeOption" borderless>
              <v-btn small value="day">
                <span class="hidden-sm-and-down">Day</span>
              </v-btn>

              <v-btn small value="week">
                <span class="hidden-sm-and-down">Week</span>
              </v-btn>
              <v-btn small value="month">
                <span class="hidden-sm-and-down">Month</span>
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-progress-linear indeterminate v-if="isLoadingSlots" />
        <v-calendar
          :events="events"
          ref="calendarRef"
          v-model="focus"
          :type="calendarRangeOption"
          color="primary"
          interval-count="14"
          first-interval="7"
          @change="updateSelectedRange"
        >
          <template v-slot:day-body="{ date, week }">
            <div
              class="v-current-time"
              :class="{ first: date === week[0].date }"
              :style="{ top: nowY }"
            ></div>
          </template>
        </v-calendar>
        <v-card height="200" flat> </v-card>
      </v-sheet>
    </data-table>
  </div>
</template>

<script>
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
      focus: "",
      viewOption: "list",
      calendarRangeOption: "week",
      selectedMonth: new Date(),
      ready: false,
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
      slots: "slots",
      events: "events",
    }),
    ...mapGetters("$_account", {
      practitionerRole: "practitionerRole",
    }),
    ...mapState("$_appointments", {
      isLoadingAppointments: (state) =>
        state.loadingData.getAppointments.isLoading,
      isLoadingMyAppointments: (state) =>
        state.loadingData.getAppointmentsByPractitionerId.isLoading,
      isLoadingSlots: (state) =>
        state.loadingData.getSlotsByPractitionerRoleId.isLoading,
    }),
    cal() {
      return this.ready && this.isShowingCalendar
        ? this.$refs.calendarRef
        : null;
    },
    nowY() {
      return this.cal ? this.cal.timeToY(this.cal.times.now) + "px" : "-10px";
    },
    isShowingCalendar() {
      return this.viewOption === "calendar";
    },
  },
  mounted() {
    this.ready = true;
    this.scrollToTime();
    this.updateTime();
  },
  created() {
    if (!this.appointments.length) {
      this.getAppointmentsByPractitionerId({
        practitionerId: "",
      });
    }
  },
  methods: {
    ...mapActions("$_appointments", {
      getAppointmentsByPractitionerId: "getAppointmentsByPractitionerId",
      getAppointments: "getAppointments",
      getSlotsByPractitionerRoleId: "getSlotsByPractitionerRoleId",
      createSlot: "createSlot",
      freeSlot: "freeSlot",
    }),
    rowClicked(item) {
      this.$router.push(`/appointments/${item.id}`);
    },
    formatDate(date) {
      return formatDateString(date, TimeConstants.monthDayYearTime);
    },
    populateSlots(start, end) {
      this.getSlotsByPractitionerRoleId({
        start: start,
        end: end,
        practitionerRoleId:
          (this.practitionerRole && this.practitionerRole.id) || "",
      });
    },
    setToday() {
      this.focus = "";
    },
    updateSelectedRange(timeRange) {
      this.populateSlots(timeRange.start.date, timeRange.end.date);
    },
    prev() {
      const calendarRef = this.$refs.calendarRef;
      calendarRef.prev();
    },
    next() {
      const calendarRef = this.$refs.calendarRef;
      calendarRef.next();
    },
    getCurrentTime() {
      if (!this.isShowingCalendar) {
        return;
      }
      return this.cal
        ? this.cal.times.now.hour * 60 + this.cal.times.now.minute
        : 0;
    },
    scrollToTime() {
      if (!this.isShowingCalendar) {
        return;
      }
      const time = this.getCurrentTime();
      const first = Math.max(0, time - (time % 30) - 30);

      this.cal.scrollToTime(first);
    },
    updateTime() {
      if (!this.isShowingCalendar) {
        return;
      }
      setInterval(() => this.cal.updateTimes(), 60 * 1000);
    },
  },
});
</script>

<style>
.v-current-time {
  height: 2px;
  background-color: #ea4335;
  position: absolute;
  left: -1px;
  right: 0;
  pointer-events: none;
}
.v-current-time.first::before {
  content: "";
  position: absolute;
  background-color: #ea4335;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-top: -5px;
  margin-left: -6.5px;
}
</style>
