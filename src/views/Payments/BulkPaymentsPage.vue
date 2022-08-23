<template>
  <div>
    <data-table title="Bulk Payments">
      <template v-slot:headerButton>
        <v-btn
          @click="openUploadDialog"
          class="subtitle-2 text-none"
          color="primary"
        >
          Upload Bulk Payments List
        </v-btn>
      </template>
      <v-data-table
        :headers="headers"
        :items="bulkPaymentFiles"
        :items-per-page="30"
        class="elevation-0"
        :search="search"
        :loading="isLoading"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            :disabled="!item.contents.length || startedProcessing"
            :loading="startedProcessing"
            v-if="item.status === 'uploaded'"
            class="subtitle-2 text-none"
            small
            color="primary"
            @click="chargeAll(item)"
          >
            Process
          </v-btn>
          <v-progress-circular
            v-else-if="item.status === 'in-progress'"
            indeterminate
            size="22"
            width="3"
            color="primary"
          />
          <div v-else>
            <v-icon :color="item.status === 'error' ? 'amber' : 'green'">
              {{ item.status === "error" ? "mdi-alert-outline" : "mdi-check" }}
            </v-icon>
            {{ item.status }}
          </div>
        </template>
        <template v-slot:[`item.file`]="{ item }">
          <v-btn
            :disabled="!item.contents.length"
            icon
            small
            @click="previewFile(item)"
          >
            <v-icon> mdi-file-delimited-outline </v-icon>
          </v-btn>
        </template>
        <template v-slot:[`item.processedFileUrl`]="{ item }">
          <v-btn
            :disabled="!item.processedFileUrl"
            icon
            small
            target="_blank"
            :href="item.processedFileUrl"
          >
            <v-icon> mdi-download </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </data-table>
    <upload-dialog
      title="Upload Bulk Payments List"
      message="Upload a .csv file to process for bulk payments"
      ref="uploadDialogRef"
      @change="parseFile"
      @save="uploadFile"
      @preview-file="openCsvFilePreview(csvHeaders, csvList, fileName)"
    />
    <csv-file-preview-dialog ref="csvFilePreviewDialogRef" />
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { auth } from "@/plugins/firebase";
import DataTable from "@/components/DataTable";
import UploadDialog from "@/components/UploadDialog";
import Papa from "papaparse";
import CsvFilePreviewDialog from "@/components/CsvFilePreviewDialog";

export default {
  name: "BulkPaymentsPage",
  components: { CsvFilePreviewDialog, UploadDialog, DataTable },
  data() {
    return {
      search: "",
      files: [],
      headers: [
        {
          text: "File",
          value: "name",
        },
        {
          text: "Rows",
          value: "numberOfRows",
        },
        {
          text: "Created On",
          value: "createdOn",
        },
        {
          text: "Actions",
          value: "actions",
        },
        {
          text: "Preview",
          value: "file",
        },
        {
          text: "Download",
          value: "processedFileUrl",
        },
      ],
      csvHeaders: [],
      csvList: [],
      fileName: "",
      startedProcessing: false,
    };
  },
  computed: {
    ...mapState("$_payments", {
      bulkPaymentFiles: (state) => state.bulkPaymentFiles,
      isLoading: (state) => state.loadingData.getBulkPaymentFiles.isLoading,
    }),
  },
  created() {
    this.getBulkPaymentFiles();
  },
  methods: {
    ...mapActions("$_payments", {
      getBulkPaymentFiles: "getBulkPaymentFiles",
      uploadBulkPaymentFile: "uploadBulkPaymentFile",
      processBulkPaymentFile: "processBulkPaymentFile",
    }),
    ...mapMutations("$_application", {
      showNotification: "showNotification",
      toggleLoadingOverlay: "toggleLoadingOverlay",
    }),
    async chargeAll(item) {
      this.bulkPaymentFiles.find((file) => file.id === item.id).status =
        "in-progress";
      const list = item.contents;
      const bulkPaymentObject = {
        collection: "bulk_payment_files",
        collectionId: item.id,
        contents: list,
      };
      await this.processBulkPaymentFile(bulkPaymentObject);
    },
    uploadFile(file) {
      const numberOfRows = this.csvList.length;
      const bulkPaymentFile = {
        fileUploadObject: {
          name: file.name,
          path: "bulk_payment_files",
          contentType: file.type,
          file: file,
        },
        numberOfRows: numberOfRows,
        contents: JSON.stringify(this.csvList),
      };

      this.uploadBulkPaymentFile(bulkPaymentFile);
    },
    parseFile(file, download = false) {
      return new Promise((resolve, reject) => {
        Papa.parse(file, {
          download: download,
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            const headers = Object.keys(results.data[0]);
            const list = results.data;
            this.csvHeaders = headers;
            this.csvList = list;
            this.fileName = file.name;
            resolve({ headers, list });
          }.bind(this),
        });
      });
    },
    openCsvFilePreview(headers, list, name) {
      this.$refs.csvFilePreviewDialogRef.toggleDialog({
        headers,
        list,
        name,
      });
    },
    openUploadDialog() {
      this.$refs.uploadDialogRef.toggleDialog();
    },
    async previewFile(item) {
      const headers = Object.keys(item.contents[0]);
      const list = item.contents;
      this.openCsvFilePreview(headers, list, item.name);
    },
  },
};
</script>

<style scoped></style>
