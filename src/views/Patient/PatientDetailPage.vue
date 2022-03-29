<template>
  <v-container style="max-width: 800px">
    <div class="headline my-3" v-if="patient">{{ patient.name }}</div>

    <v-card>
      <v-card-title> Personal Information </v-card-title>
      <v-row class="pa-4">
        <v-col :cols="item.cols" v-for="item in personal" :key="item.title">
          <div class="caption">
            {{ item.title }}
          </div>
          <div>
            {{ item.subtitle }}
          </div>
        </v-col>
      </v-row>
      <v-row class="pa-4 px-6">
        <v-btn class="mr-2 subtitle-2 text-none"> Insurance Card </v-btn>
        <v-btn class="subtitle-2 text-none"> Medical Record </v-btn>
      </v-row>
    </v-card>
    <v-card class="mt-4">
      <v-card-title> Contact Information </v-card-title>
      <v-row class="pa-4">
        <v-col :cols="item.cols" v-for="item in contact" :key="item.title">
          <div class="caption">
            {{ item.title }}
          </div>
          <div>
            {{ item.subtitle }}
          </div>
        </v-col>
      </v-row>
    </v-card>

    <v-card class="mt-4">
      <v-card-title> Payment Information </v-card-title>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th
                class="text-left"
                v-for="header in creditCardHeaders"
                :key="header"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cards" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.last4 }}</td>
              <td>{{ item.exp }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <v-card class="my-2">
      <v-card-title> Appointments </v-card-title>
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
            <tr v-for="item in appointments" :key="item.name">
              <td>{{ item.date }}</td>
              <td>{{ item.start }}</td>
              <td>{{ item.end }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.practitioner }}</td>
              <td>{{ item.status }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <v-card class="my-2">
      <v-card-title>
        <v-row>
          <v-col> Payments </v-col>
          <v-col align="right">
            <v-btn class="subtitle-2 text-none" color="primary"
              >Create Charge
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
                v-for="header in paymentHeaders"
                :key="header"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in payments" :key="item.name">
              <td>{{ item.purpose }}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.amount }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "PatientDetailPage",

  computed: {
    ...mapGetters("$_patients", {
      patient: "patient",
      appointments: "appointments",
    }),
    ...mapState("$_patients", {
      isLoading: (state) => state.loadingData.getPatientById.isLoading,
    }),
    personal() {
      if (!this.patient) {
        return [];
      }

      const fullName = {
        title: "Full Name",
        subtitle: this.patient && this.patient.name,
      };

      const sex = {
        title: "Sex",
        subtitle:
          (this.patient.sex && this.patient.sex.toUpperCase()) ||
          "Not Provided",
      };

      const birthDate = {
        title: "Birth Date",
        subtitle: this.patient.birthDate || "Not Provided",
      };

      const id = {
        cols: 12,
        title: "Patient Id",
        subtitle: this.patient && this.patient.id,
      };

      return [fullName, sex, birthDate, id];
    },
    contact() {
      if (!this.patient) {
        return [];
      }

      const email = {
        title: "Email",
        subtitle: this.patient.email || "Not Provided",
      };

      const phone = {
        title: "Phone",
        subtitle: this.patient.phone || "Not Provided",
      };

      const address = {
        cols: 12,
        title: "Address",
        subtitle: this.patient.address || "Not Provided",
      };

      return [email, phone, address];
    },
  },
  data() {
    return {
      creditCardHeaders: ["Name", "Card Type", "Last 4", "Exp"],
      appointmentHeaders: [
        "Date",
        "Start Time",
        "End Time",
        "Type",
        "Practitioner",
        "Status",
      ],
      paymentHeaders: ["Purpose", "Date", "Amount"],

      cards: [
        {
          name: "Uzir Thapa",
          type: "VISA",
          last4: "x6783",
          exp: "12/24",
        },
      ],
      // appointments: [
      //   {
      //     date: "2016-05-01",
      //     startTime: "12:00 pm",
      //     endTime: "12:15 pm",
      //     type: "Online Visit",
      //     practitioner: "Miwa Nishikawa",
      //     status: "fulfilled",
      //   },
      //   {
      //     date: "2016-05-01",
      //     startTime: "12:00 pm",
      //     endTime: "12:15 pm",
      //     type: "Home Visit",
      //     practitioner: "Kenro Maki",
      //     status: "booked",
      //   },
      // ],
      payments: [
        {
          purpose: "Appointment",
          date: "2016-05-01",
          amount: "$500",
        },
      ],
    };
  },
  async created() {
    console.log(this.$route);
    this.getPatientById(this.$route.params.id);
    this.getAppointments(this.$route.params.id);
  },
  methods: {
    ...mapActions("$_patients", {
      getPatientById: "getPatientById",
      getAppointments: "getAppointments",
    }),
  },
};
</script>

<style></style>
