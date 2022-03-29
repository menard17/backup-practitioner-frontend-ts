<template>
  <div>Appointment Detail</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AppointmentDetailPage",
  async created() {
    console.log(this.$route);

    const appointment = await this.getAppointmentById(this.$route.params.id);
    console.log("DETAIL: ", appointment);
  },
  methods: {
    ...mapActions("$_appointments", {
      getAppointmentById: "getAppointmentById",
    }),
  },
};
</script>

<style></style>
