<template>
  <v-row>
    <v-btn
      v-if="insuranceCard"
      @click="openDocumentReferenceDialog('insurance')"
      class="mr-2 subtitle-2 text-none"
    >
      {{ this.$t("Insurance Card") }}
    </v-btn>
    <v-btn
      v-if="medicalRecord"
      @click="openDocumentReferenceDialog('medicalRecord')"
      class="mr-2 subtitle-2 text-none"
    >
      {{ this.$t("Medical Record") }}
    </v-btn>
    <v-btn
      v-if="medicalCard"
      @click="openDocumentReferenceDialog('medicalCard')"
      class="mr-2 subtitle-2 text-none"
    >
      {{ this.$t("Medical Card") }}
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
      medicalCard: "medicalCard",
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
            this.$t("Insurance Card")
          );
          break;
        case "medicalRecord":
          this.$refs.documentReferenceDialogRef.toggleDialog(
            this.medicalRecord,
            this.$t("Medical Record")
          );
          break;
        case "medicalCard":
          this.$refs.documentReferenceDialogRef.toggleDialog(
            this.medicalCard,
            this.$t("Medical Card")
          );
          break;
      }
    },
  },
};
</script>

<style></style>
