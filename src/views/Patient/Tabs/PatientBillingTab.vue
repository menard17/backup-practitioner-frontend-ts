<template>
  <v-container>
    <v-card class="mt-4">
      <v-card-title> Payment Methods </v-card-title>
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
            <tr v-for="method in paymentMethods" :key="method.name">
              <td>{{ method.name }}</td>
              <td>{{ method.brand }}</td>
              <td>{{ method.last4 }}</td>
              <td>{{ method.exp }}</td>
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
            <v-btn
              @click="openCreateChargeDialog"
              class="subtitle-2 text-none"
              color="primary"
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
    <create-charge-dialog ref="createChargeDialogRef" />
  </v-container>
</template>

<script>
import CreateChargeDialog from "@/views/Payments/CreateChargeDialog.vue";
import { mapGetters } from "vuex";
export default {
  components: { CreateChargeDialog },
  data() {
    return {
      creditCardHeaders: ["Name", "Card Type", "Last 4", "Exp"],

      paymentHeaders: ["Purpose", "Date", "Amount"],

      cards: [
        {
          name: "Uzir Thapa",
          type: "VISA",
          last4: "x6783",
          exp: "12/24",
        },
      ],

      payments: [
        {
          purpose: "Appointment",
          date: "2016-05-01",
          amount: "$500",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("$_patients", {
      paymentMethods: "paymentMethods",
    }),
  },
  methods: {
    openCreateChargeDialog() {
      this.$refs.createChargeDialogRef.toggleDialog();
    },
  },
};
</script>

<style></style>
