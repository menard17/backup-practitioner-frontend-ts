<template>
  <v-container>
    <v-card class="my-2">
      <v-card-title>
        <v-row>
          <v-col> Appointments </v-col>
          <v-col align="end">
            <v-btn
              color="primary"
              @click="openCreateAppointmentDialog"
              class="text-none subtitle-2"
              >Create Appointment
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th
                class="text-left"
                v-for="header in appointmentHeaders"
                :key="header"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              @click="rowClicked(item)"
              v-for="item in appointments"
              :key="item.name"
            >
              <td>{{ item.date }}</td>
              <td>{{ item.start }}</td>
              <td>{{ item.end }}</td>
              <td>{{ item.type }}</td>
              <td>
                {{ item.practitioner.firstName }}
                {{ item.practitioner.familyName }}
              </td>
              <td>{{ item.status }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <create-appointment-dialog
      v-if="patient"
      :patient="patient"
      @onCreated="onAppointmentCreated"
      ref="createAppointmentDialogRef"
    />
    <status-dialog ref="statusDialogRef">
      <v-btn class="text-none subtitle-2"> Go to Appointment </v-btn>
    </status-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CreateAppointmentDialog from "@/views/Appointment/Dialogs/CreateAppointmentDialog";
import StatusDialog from "@/components/StatusDialog";
import { StatusTypes } from "@/utils/constants";
export default {
  components: { StatusDialog, CreateAppointmentDialog },
  data() {
    return {
      appointmentHeaders: [
        "Date",
        "Start Time",
        "End Time",
        "Type",
        "Practitioner",
        "Status",
      ],
    };
  },
  computed: {
    ...mapGetters("$_patients", {
      patient: "patient",
      appointments: "appointments",
    }),
  },

  methods: {
    ...mapActions("$_patients", {
      getAppointments: "getAppointments",
    }),
    onAppointmentCreated(appointment) {
      const title = appointment ? "Success!" : "Failed";
      const body = appointment
        ? "The appointment was created successfully"
        : "There was a problem creating the appointment";
      const status = appointment ? StatusTypes.success : StatusTypes.error;
      if (appointment) {
        this.getAppointments({ actorId: this.$route.params.id });
      }

      this.$refs.statusDialogRef.toggleDialog({ title, body, status });
    },
    rowClicked(item) {
      this.$router.replace(`/appointments/${item.id}`);
    },
    openCreateAppointmentDialog() {
      this.$refs.createAppointmentDialogRef.toggleDialog();
    },
  },
};
</script>

<style></style>
