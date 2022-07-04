<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col align="start"> Add a Note </v-col>
          <v-col align="end">
            <v-btn @click="cancel" icon>
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <div class="pa-4">
        <v-select
          v-if="noteType === 'doctorNote'"
          @change="setNoteTemplate"
          v-model="selectedTemplate"
          label="Note Templates"
          class="align-start"
          :items="Object.values(noteTemplates)"
        />
        <v-textarea
          outlined
          auto-grow
          placeholder="Type your notes Here"
          v-model="note"
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
import { NoteConstants } from "@/utils/constants";

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
    noteTemplates() {
      return {
        patternOneJp: "Pattern 1 Jp",
        patternTwoJp: "Pattern 2 Jp",
        patternOneEn: "Pattern 1 En",
      };
    },
  },
  methods: {
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
        if (isEditing) {
          this.note = note;
        }
      }
    },
    setNoteTemplate(noteTemplate) {
      switch (noteTemplate) {
        case this.noteTemplates.patternOneJp:
          this.note = NoteConstants.patternOneJp;
          break;
        case this.noteTemplates.patternTwoJp:
          this.note = NoteConstants.patternTwoJp;
          break;
        case this.noteTemplates.patternOneEn:
          this.note = NoteConstants.patternOneEn;
          break;
      }
    },
  },
};
</script>

<style scoped></style>
