<template>
  <v-dialog width="300" v-model="dialog">
    <v-card>
      <v-card-title>
        <div>Are you sure you want to cancel this appointment?</div>
      </v-card-title>

      <v-card-actions>
        <v-spacer />
        <v-btn
          @click="cancel"
          color="error"
          class="text-none subtitle-2"
          outlined
        >
          No</v-btn
        >
        <v-btn color="primary" class="text-none subtitle-2" @click="save">
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmCancelAppointmentDialog",
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    save() {
      this.$emit("save");
      this.cancel();
    },
    cancel() {
      this.dialog = false;
    },
    toggleDialog() {
      this.dialog = !this.dialog;
    },
  },
};
</script>

<style scoped></style>
