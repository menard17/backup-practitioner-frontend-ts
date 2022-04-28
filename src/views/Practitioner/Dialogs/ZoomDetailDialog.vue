<template>
  <v-dialog width="500" v-model="dialog">
    <v-card>
      <v-card-title>
        <v-row align="start">
          <v-col align-start cols="auto"> Add your Zoom Information </v-col>
          <v-col align="end">
            <v-btn icon @click="cancel">
              <v-icon>mdi-close </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-row no-gutters class="mt-2 px-4">
        <v-col class="mr-2">
          <label-text-field label="Zoom ID" v-model="zoomId" />
        </v-col>
        <v-col>
          <label-text-field label="Zoom Passcode" v-model="zoomPasscode" />
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer />
        <v-btn
          @click="cancel"
          outlined
          color="error"
          class="text-none subtitle-2"
        >
          Cancel
        </v-btn>
        <v-btn @click="save" color="primary" class="text-none subtitle-2">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import LabelTextField from "@/components/LabelTextField";
export default {
  name: "ZoomDetailDialog",
  components: { LabelTextField },
  data() {
    return {
      dialog: false,
      zoomId: "",
      zoomPasscode: "",
    };
  },
  computed: {
    changeFields() {
      return {
        zoomId: this.zoomId,
        zoomPasscode: this.zoomPasscode,
      };
    },
  },
  methods: {
    cancel() {
      this.zoomId = "";
      this.zoomPasscode = "";
      this.dialog = false;
    },
    save() {
      this.$emit("save", this.changeFields);
      this.cancel();
    },
    toggleDialog(practitionerRole) {
      this.dialog = !this.dialog;
      if (this.dialog) {
        this.zoomId = practitionerRole.zoomId;
        this.zoomPasscode = practitionerRole.zoomPasscode;
      }
    },
  },
};
</script>

<style scoped></style>
