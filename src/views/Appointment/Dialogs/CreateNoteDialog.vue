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
    };
  },
  computed: {
    ...mapState("$_application", {
      templates: "templates",
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
    }),
    save() {
      this.$emit("onSave", this.note);
      this.cancel();
    },
    cancel() {
      this.note = "";
      this.selectedTemplate = null;
      this.noteType = "";
      this.dialog = false;
    },
    toggleDialog(type, note, isEditing = false) {
      this.dialog = !this.dialog;
      if (this.dialog) {
        this.noteType = type;
        this.getTemplates({ type });
        if (isEditing) {
          this.note = note;
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
