<template>
  <v-container>
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
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
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
      appointments: "appointments",
    }),
  },
};
</script>

<style></style>
