<template>
  <v-row>
    <v-btn
      v-if="insuranceCard"
      @click="openDocumentReferenceDialog('insurance')"
      class="mr-2 subtitle-2 text-none"
    >
      Insurance Card
    </v-btn>
    <v-btn
      v-if="medicalRecord"
      @click="openDocumentReferenceDialog('medicalRecord')"
      class="subtitle-2 text-none"
    >
      Medical Record
    </v-btn>
    <document-reference-dialog ref="documentReferenceDialogRef" />
  </v-row>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import DocumentReferenceDialog from "./Dialogs/DocumentReferenceDialog.vue";
export default {
  name: "DocumentReferenceWrapper",
  components: { DocumentReferenceDialog },
  computed: {
    ...mapGetters("$_patients", {
      patient: "patient",
      insuranceCard: "insuranceCard",
      medicalRecord: "medicalRecord",
    }),
    ...mapState("$_patients", {
      isLoading: (state) => state.loadingData.getPatientById.isLoading,
    }),
  },
  methods: {
    openDocumentReferenceDialog(documentType) {
      switch (documentType) {
        case "insurance":
          this.$refs.documentReferenceDialogRef.toggleDialog(
            this.insuranceCard,
            "Insurance Card"
          );
          break;
        case "medicalRecord":
          this.$refs.documentReferenceDialogRef.toggleDialog(
            this.medicalRecord,
            "Medical Record"
          );
          break;
      }
    },
  },
};
</script>

<style></style>
