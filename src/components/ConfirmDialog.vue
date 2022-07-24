<template>
  <v-dialog width="500" v-model="dialog">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col>
            {{ title }}
          </v-col>
          <v-col align="end">
            <v-btn icon @click="cancel">
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <div class="text-center mb-3">{{ message }}</div>
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
  name: "ConfirmDialog",
  props: {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    save() {
      this.$emit("save");
      this.dialog = false;
    },
    cancel() {
      this.$emit("cancel");
      this.dialog = false;
    },
    toggleDialog() {
      this.dialog = !this.dialog;
    },
  },
};
</script>

<style scoped></style>
