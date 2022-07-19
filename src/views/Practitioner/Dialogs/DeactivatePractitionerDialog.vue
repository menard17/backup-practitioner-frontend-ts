<template>
  <v-dialog width="300" v-model="dialog">
    <v-card>
      <v-card-title>
        <div>
          Are you sure you want to {{ activationType }} this practitioner?
        </div>
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
  name: "DeactivatePractitionerDialog",
  data() {
    return {
      dialog: false,
      activationType: "",
    };
  },
  methods: {
    save() {
      this.$emit("save", this.activationType);
      this.cancel();
    },
    cancel() {
      this.dialog = false;
    },
    toggleDialog(activationType) {
      this.dialog = !this.dialog;
      if (this.dialog) {
        this.activationType = activationType;
      }
    },
  },
};
</script>

<style scoped></style>
