<template>
  <v-dialog v-model="dialog" width="700">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col align="start"> Add a {{ noteTypeTitle }} Note </v-col>
          <v-col align="end">
            <v-btn @click="cancel" icon>
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <div class="pa-4">
        <v-select
          label="Note Templates"
          class="align-start"
          :items="templates"
          v-model="selectedTemplate"
          @change="setNoteTemplate"
          item-text="title"
          item-value="text"
        />
        <v-textarea
          outlined
          placeholder="Type your notes Here"
          v-model="note"
          rows="18"
        />
        <v-autocomplete
          v-model="medications"
          :items="medicalTerms.medications[0].array"
          label="Prescriptions"
          multiple
          item-value="value"
          item-text="display"
          :search-input.sync="searchInput"
          @change="searchInput = ''"
          chips
          return-object
          v-if="medicalTerms && medicalTerms.medications"
        />
        <v-select
          v-model="test"
          :items="medicalTerms.tests[0].array"
          label="Tests"
          item-value="value"
          item-text="display"
          dense
          return-object
          v-if="medicalTerms && medicalTerms.tests"
        />
      </div>
      <v-card-actions>
        <v-spacer />
        <v-btn
          @click="cancel"
          :disabled="isLoadingNote"
          color="error"
          class="text-none subtitle-2"
          outlined
        >
          Cancel</v-btn
        >
        <v-btn
          :loading="isLoadingNote"
          :disabled="isLoadingNote"
          color="primary"
          class="text-none subtitle-2"
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "CreateNoteDialog",
  data() {
    return {
      note: "",
      dialog: false,
      selectedTemplate: null,
      isLoadingNote: false,
      noteType: "",
      medications: [],
      test: {},
      searchInput: "",
    };
  },
  computed: {
    ...mapState("$_application", {
      templates: "templates",
      medicalTerms: "medicalTerms",
    }),
    noteTypeTitle() {
      switch (this.noteType) {
        case "clinicalNote":
          return "Clinical";
        case "doctorNote":
          return "Doctors";
        default:
          return "";
      }
    },
  },
  methods: {
    ...mapActions("$_application", {
      getTemplates: "getTemplates",
      getMedicalTerms: "getMedicalTerms",
    }),
    save() {
      if (
        this.note &&
        this.medications.length > 0 &&
        JSON.stringify(this.test) !== "{}"
      ) {
        this.$emit("onSave", this.note, this.medications, this.test);
        this.cancel();
      }
    },
    cancel() {
      this.note = "";
      this.selectedTemplate = null;
      this.noteType = "";
      this.dialog = false;
    },
    async toggleDialog(type, note, isEditing = false, test, medications) {
      this.dialog = !this.dialog;
      if (this.dialog) {
        this.noteType = type;
        this.getTemplates({ type: this.noteType });
        this.getMedicalTerms({ type: "tests" });
        this.getMedicalTerms({ type: "medications" });

        if (isEditing) {
          this.note = note;
          this.test = test;
          this.medications = medications;
        }
      }
    },
    setNoteTemplate(note) {
      this.note = note.replaceAll("\\n", "\n");
    },
  },
};
</script>

<style scoped></style>
