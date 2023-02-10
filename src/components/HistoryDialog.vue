<template>
  <v-dialog v-model="dialog" width="500">
    <v-card class="pa-8">
      <div class="d-flex justify-space-between align-center mb-4">
        <div class="d-flex align-center">
          <span class="font-weight-bold text-h6 mr-4">History</span>
          <div class="loading-container" v-if="isLoadingHistory">
            <v-progress-circular :size="16" indeterminate></v-progress-circular>
          </div>
        </div>
        <v-btn icon @click="toggleDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <div class="ps-2 caption" v-if="!isLoadingHistory && isHistoryEmpty">
        this order has no history
      </div>

      <div
        class="ps-2"
        v-else
        v-for="(history, i) in getHistoryByOrderId(orderId)"
        :key="i"
      >
        <div class="subtitle-2">{{ formatTitle(history) }}</div>
        <div class="caption">{{ formatDate(history.timeStamp) }}</div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { OrderHistory } from "@/store/Orders/types";
import Vue from "vue";
import { Timestamp } from "firebase/firestore";
import { mapActions, mapGetters } from "vuex";

export default Vue.extend({
  name: "HistoryDialog",
  data() {
    return {
      orderId: "",
      dialog: false,
    };
  },
  computed: {
    ...mapGetters("$_orders", {
      isLoadingHistory: "isLoadingHistory",
      getHistoryByOrderId: "getHistoryByOrderId",
    }),
    isHistoryEmpty: function (): boolean {
      return this.getHistoryByOrderId(this.orderId).length === 0;
    },
  },
  methods: {
    ...mapActions({
      fetchHistory: "$_orders/fetchHistory",
    }),
    toggleDialog(orderId: string) {
      this.dialog = !this.dialog;
      if (this.dialog) {
        this.orderId = orderId;
        this.fetchHistory(orderId);
      }
    },
    formatDate(date: Timestamp) {
      return date.toDate().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    formatTitle(history: OrderHistory) {
      return `${history.userDisplayName} changed the ${history.fieldUpdated} to ${history.newData}`;
    },
  },
});
</script>

<style scoped>
.caption {
  color: #666666;
  margin-bottom: 12px;
}

.loading-container {
  display: block;
  display: flex;
  justify-content: center;
}
</style>
