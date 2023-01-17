<template>
  <v-dialog v-model="dialog" width="700">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col align="start"> {{ noteTypeTitle }} </v-col>
          <v-col align="end">
            <v-btn @click="cancel" icon>
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <div class="pa-4">
        <v-select
          :label="this.$t('Note Templates')"
          class="align-start"
          :items="templates"
          v-model="selectedTemplate"
          @change="setNoteTemplate"
          item-text="title"
          item-value="text"
        />
        <v-textarea
          outlined
          :placeholder="this.$t('Place Holder for Notes')"
          v-model="note"
          rows="18"
        />
        <v-autocomplete
          v-model="selectedMedications"
          :items="medicalTerms.medications[0].array.filter(filterMedications)"
          :label="this.$t('Medications')"
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
          v-model="selectedTest"
          :items="medicalTerms.tests[0].array"
          :label="this.$t('Tests')"
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
          {{ this.$t("Cancel") }}</v-btn
        >
        <v-btn
          :loading="isLoadingNote"
          :disabled="isLoadingNote"
          color="primary"
          class="text-none subtitle-2"
          @click="save"
        >
          {{ this.$t("Save") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "CreateNoteDialog",
  data() {
    return {
      note: "",
      dialog: false,
      selectedTemplate: null,
      selectedTest: {},
      isLoadingNote: false,
      noteType: "",
      selectedMedications: [],
      searchInput: "",
    };
  },
  computed: {
    ...mapState("$_application", {
      templates: "templates",
      medicalTerms: "medicalTerms",
    }),
    ...mapGetters("$_application", {
      getmedicalTermsTest: "medicalTermsForTests",
      getmedicalTermsMedications: "medicalTermsForMedications",
    }),
    noteTypeTitle() {
      switch (this.noteType) {
        case "clinicalNote":
          return this.$t("Clinical Note");
        case "doctorNote":
          return "Doctors";
        default:
          return "";
      }
    },
  },
  async created() {
    await this.getMedicalTerms({ type: "tests" });
    await this.getMedicalTerms({ type: "medications" });
  },
  methods: {
    ...mapActions("$_application", {
      getTemplates: "getTemplates",
      getMedicalTerms: "getMedicalTerms",
    }),
    save() {
      if (
        this.note &&
        this.selectedMedications.length > 0 &&
        JSON.stringify(this.selectedTest) !== "{}"
      ) {
        this.$emit(
          "onSave",
          this.note,
          this.selectedMedications,
          this.selectedTest
        );
        this.cancel();
      }
    },
    // We want to enforce that
    //if medication with id=0 is selected, other medications cannot be chosen
    filterMedications(medication) {
      if (this.selectedMedications.length == 0) return true;
      if (this.selectedMedications[0].id != 0 && medication.id != 0)
        return true;
      return !!(
        this.selectedMedications[0].id == 0 &&
        this.selectedMedications[0].value == medication.value
      );
    },
    cancel() {
      this.note = "";
      this.selectedTemplate = null;
      this.noteType = "";
      this.dialog = false;
      this.selectedMedications = [];
    },
    async toggleDialog(type, note, isEditing = false, test, medications) {
      this.dialog = !this.dialog;
      if (this.dialog) {
        this.noteType = type;
        this.getTemplates({ type: this.noteType });
        if (isEditing) {
          this.note = note;
          this.getSelectedTest(test);
          this.getSelectedMedications(medications);
        }
      }
    },
    setNoteTemplate(note) {
      this.note = note.replaceAll("\\n", "\n");
    },
    getSelectedTest(test) {
      const medicalTermsTest = this.getmedicalTermsTest.find(
        (medicalTermsTest) => medicalTermsTest.display === test
      );
      this.selectedTest = medicalTermsTest;
    },
    getSelectedMedications(medications) {
      const listMedicationsName = medications.split(",");
      listMedicationsName.forEach((name) => {
        this.selectedMedications.push(
          this.getmedicalTermsMedications.find(
            (medicalTerms) => medicalTerms.display === name
          )
        );
      });
    },
  },
};
</script>

<style scoped></style>
