<template>
  <v-dialog width="500" v-model="dialog">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col>
            {{ title }}
          </v-col>
          <v-col align="end" cols="2">
            <v-btn icon @click="cancel">
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <div class="px-6">
        <div class="text-left mb-3">{{ message }}</div>
        <v-file-input
          @change="updateParent"
          outlined
          dense
          v-model="file"
          accept=".csv"
          label="File input"
        ></v-file-input>
        <v-progress-linear
          v-if="fileUploadProgress > 0"
          class="mb-5"
          color="light-blue"
          height="10"
          :value="fileUploadProgress"
          striped
        ></v-progress-linear>
      </div>

      <v-card-actions>
        <v-btn
          :disabled="file === null"
          color="primary"
          class="text-none subtitle-2"
          @click="previewFile"
        >
          Preview
        </v-btn>
        <v-spacer />
        <v-btn
          @click="cancel"
          color="error"
          class="text-none subtitle-2"
          outlined
        >
          Cancel</v-btn
        >
        <v-btn
          v-if="fileUploadProgress < 100"
          :loading="fileUploadProgress > 0"
          color="primary"
          class="text-none subtitle-2"
          @click="save"
        >
          Upload
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "UploadDialog.vue",
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
      file: null,
    };
  },
  watch: {
    fileUploadProgress(newVal) {
      if (newVal === 100) {
        this.cancel();
      }
    },
  },
  computed: {
    ...mapState("$_application", {
      fileUploadProgress: "fileUploadProgress",
    }),
  },
  methods: {
    ...mapMutations("$_application", {
      setFIleUploadProgress: "setFileUploadProgress",
    }),
    updateParent() {
      this.$emit("change", this.file);
    },
    previewFile() {
      this.$emit("preview-file", this.file);
    },
    save() {
      this.$emit("save", this.file);
    },
    cancel() {
      this.$emit("cancel");
      this.dialog = false;
      this.file = null;
      this.setFIleUploadProgress(0);
    },
    toggleDialog() {
      this.dialog = !this.dialog;
    },
  },
};
</script>

<style scoped></style>
