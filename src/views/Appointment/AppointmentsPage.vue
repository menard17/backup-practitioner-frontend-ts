<template>
  <div>
    <data-table title="My Appointments">
      <template v-slot:headerButton>
        <v-row>
          <v-col cols="4">
            <v-menu
              ref="menuFrom"
              v-model="menuFrom"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateFrom"
                  label="From"
                  append-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="dateRange"
                color="primary"
                no-title
                range
                @input="menuFrom = false"
              />
            </v-menu>
          </v-col>
          <v-col cols="4">
            <v-menu
              ref="menuTo"
              v-model="menuTo"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateTo"
                  label="To"
                  append-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="dateRange"
                color="primary"
                no-title
                range
                @input="menuTo = false"
                :min="minCurrentMonth"
              />
            </v-menu>
          </v-col>
          <v-col cols="4">
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
          </v-col>
        </v-row>
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
        :custom-sort="customSort"
        @click:row="rowClicked"
        :custom-filter="customFilter"
      />
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
          :events="showingEvents"
          :event-ripple="false"
          ref="calendarRef"
          v-model="focus"
          :type="calendarRangeOption"
          color="primary"
          interval-count="14"
          first-interval="7"
          @change="updateSelectedRange"
          @mousedown:event="startDrag"
          @mousedown:time="startTime"
          @mousemove:time="mouseMove"
          @mouseup:time="endDrag"
          @click:event="showEvent"
        >
          <template v-slot:event="{ event, timed, eventSummary }">
            <div class="v-event-draggable" v-html="eventSummary()"></div>
            <div
              v-if="timed && event.status == null"
              class="v-event-drag-bottom"
              @mousedown.stop="extendBottom(event)"
            ></div>
          </template>
        </v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text v-if="selectedEvent.status == null">
              Click 'Save' button to create a new block schedule from
              <b>
                {{ new Date(selectedEvent.start).getHours() }}:
                {{ new Date(selectedEvent.start).getMinutes() }}
              </b>
              to
              <b>
                {{ new Date(selectedEvent.end).getHours() }}:
                {{ new Date(selectedEvent.end).getMinutes() }}
              </b>
            </v-card-text>
            <v-card-text v-if="selectedEvent.status">
              <span v-html="selectedEvent.start"></span>
              to
              <span v-html="selectedEvent.end"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-if="selectedEvent.status === 'busy-unavailable'"
                text
                color="primary"
                @click="removeSlot()"
              >
                Remove
              </v-btn>
              <v-btn
                v-if="selectedEvent.status == null"
                text
                color="primary"
                @click="removeSlot(true)"
              >
                Remove
              </v-btn>
              <v-btn
                v-if="selectedEvent.status == null"
                text
                color="primary"
                @click="saveSlot()"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
        <v-card height="200" flat> </v-card>
      </v-sheet>
    </data-table>
  </div>
</template>

<script>
import DataTable from "@/components/DataTable.vue";
import Vue from "vue";
import { mapActions, mapState, mapGetters } from "vuex";
import {
  formatDateString,
  converTimeToInt,
  compareDate,
} from "@/utils/dateHelpers";
import { TimeConstants } from "@/utils/constants";

export default Vue.extend({
  components: { DataTable },
  name: "AppointmentsPage",
  data() {
    return {
      search: formatDateString(new Date(), TimeConstants.monthDayYear),
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
        { text: "Type", value: "type" },
        {
          text: "Status",
          value: "status",
        },
      ],
      showingEvents: [],
      newSlot: null,
      extendingBottom: false,
      isDragging: false,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      selectedRange: null,
      dateRange: [],
      menuFrom: false,
      menuTo: false,
    };
  },
  watch: {
    // whenever question changes, this function will run
    // refresh the appointment data once we get both start and end date
    dateRange(newDateRange) {
      if (newDateRange.length == 2) {
        this.getAppointmentsByPractitionerId({
          practitionerId: "",
          dateFrom: this.dateFrom,
          dateTo: this.dateTo,
        });
      }
      this.search = "";
      return newDateRange;
    },
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
    // sort the date, always put the smaller one as the `dateFrom` and larger one as `dateTo`
    dateFrom() {
      if (!this.dateRange.length) {
        return formatDateString(new Date(), "yyyy-MM-dd");
      }
      return compareDate(this.dateRange[0], this.dateRange[1])
        ? this.dateRange[1]
        : this.dateRange[0];
    },
    dateTo() {
      if (!this.dateRange.length) {
        return formatDateString(new Date(), "yyyy-MM-dd");
      }
      return compareDate(this.dateRange[0], this.dateRange[1])
        ? this.dateRange[0]
        : this.dateRange[1];
    },
    minCurrentMonth() {
      if (this.dateRange.length) {
        let current = new Date(this.dateFrom);
        current.setDate(current.getDate());
        return current.toISOString().slice(0, 10);
      } else {
        return new Date().toISOString().slice(0, 10);
      }
    },
    maxDate() {
      return new Date().toISOString().slice(0, 10);
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
    customFilter: (value, search) => {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString() === search
      );
    },
    customSort: function (items, index, isDesc) {
      items.sort((a, b) => {
        if (index[0] === "date") {
          console.log(b[index]);
          if (!isDesc[0]) {
            return new Date(b[index]) - new Date(a[index]);
          } else {
            return new Date(a[index]) - new Date(b[index]);
          }
        } else if (index[0] == "start" || index[0] == "end") {
          if (!isDesc[0]) {
            return converTimeToInt(b[index]) - converTimeToInt(a[index]);
          } else {
            return converTimeToInt(a[index]) - converTimeToInt(b[index]);
          }
        } else {
          if (!isDesc[0]) {
            return a[index] > b[index] ? 1 : -1;
          } else {
            return b[index] > a[index] ? 1 : -1;
          }
        }
      });
      return items;
    },
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
      }).then(() => {
        this.showingEvents = this.events;
      });
    },
    setToday() {
      this.focus = "";
    },
    updateSelectedRange(timeRange) {
      this.selectedRange = timeRange;
      this.populateSlots(timeRange.start.date, timeRange.end.date);
      this.newSlot = null;
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
    startDrag(event, timed) {
      if (event && timed) {
        this.isDragging = true;
      }
    },
    startTime(tms) {
      if (!this.isDragging && !this.newSlot) {
        const mouse = this.toTime(tms);

        const startTime = this.roundTime(mouse);
        const endTime = this.createStart + 15 * 60 * 1000;

        this.newSlot = {
          name: `New`,
          color: "#FEAB87",
          start: startTime,
          end: endTime,
          timed: true,
        };

        this.showingEvents.push(this.newSlot);
      }
    },
    endDrag() {
      this.extendingBottom = false;
      this.isDragging = false;
    },
    mouseMove(tms) {
      const mouse = this.toTime(tms);

      if (this.newSlot && this.isDragging) {
        const start = this.newSlot.start;
        const end = this.newSlot.end;
        const duration = end - start;
        const newStart = this.roundTime(mouse);
        const newEnd = newStart + duration;

        this.newSlot.start = newStart;
        this.newSlot.end = newEnd;
      } else if (this.newSlot && this.extendingBottom) {
        const mouseRounded = this.roundTime(mouse, false);
        const min = Math.min(mouseRounded, this.newSlot.start);
        const max = Math.max(mouseRounded, this.newSlot.start);

        this.newSlot.start = min;
        this.newSlot.end = max;
      }
    },
    extendBottom(event) {
      this.newSlot = event;
      this.extendingBottom = true;
    },
    roundTime(time, down = true) {
      const roundTo = 15; // minutes
      const roundDownTime = roundTo * 60 * 1000;

      return down
        ? time - (time % roundDownTime)
        : time + (roundDownTime - (time % roundDownTime));
    },
    toTime(tms) {
      return new Date(
        tms.year,
        tms.month - 1,
        tms.day,
        tms.hour,
        tms.minute
      ).getTime();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            this.selectedOpen = true;
          });
        });
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => open());
        });
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    saveSlot() {
      this.selectedOpen = false;

      const start = new Date(this.newSlot.start);
      const end = new Date(this.newSlot.end);
      this.createSlot({
        practitionerId: this.practitionerRole.id,
        start: start.toISOString(),
        end: end.toISOString(),
      }).then(() => {
        this.newSlot = null;
        this.updateSelectedRange(this.selectedRange);
      });
    },
    removeSlot(isNewSlot = false) {
      this.selectedOpen = false;
      if (isNewSlot) {
        this.newSlot = null;
        this.showingEvents.pop();
      } else {
        this.freeSlot({
          slotId: this.selectedEvent.slotId,
        }).then(() => {
          this.updateSelectedRange(this.selectedRange);
        });
      }
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

.v-event-draggable {
  padding-left: 6px;
}
.v-event-timed {
  user-select: none;
  -webkit-user-select: none;
}
.v-event-drag-bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 4px;
  cursor: ns-resize;
}
.v-event-drag-bottom::after {
  display: none;
  position: absolute;
  left: 50%;
  height: 4px;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  width: 16px;
  margin-left: -8px;
  opacity: 0.8;
  content: "";
}
.v-event-drag-bottom:hover::after {
  display: block;
}
</style>
