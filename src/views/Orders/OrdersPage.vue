<template>
  <div class="deliveries">
    <v-data-table
      :headers="orderHeaders"
      :items="orders"
      loading-text="Loading... Please wait"
      :expanded.sync="expanded"
      item-key="documentId"
      show-expand
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Order Table</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <v-select
          v-model="item.status"
          :items="status"
          @change="statusUpdated(item)"
        ></v-select>
      </template>
      <template v-slot:[`item.area`]="{ item }">
        <div v-if="item.status === 'unassigned'">
          <v-text-field v-model="item.area"></v-text-field>
        </div>
        <div v-if="item.status !== 'unassigned'">
          <v-text-field readonly v-model="item.area"></v-text-field>
        </div>
      </template>
      <template v-slot:[`item.porter`]="{ item }">
        <div v-if="item.status === 'unassigned'">
          <v-select
            v-model="item.porter"
            :items="porters(item.area)"
            @change="porterSelected(item)"
          ></v-select>
        </div>
        <div v-if="item.status !== 'unassigned'">
          <v-text-field v-model="item.porter" readonly></v-text-field>
        </div>
      </template>
      <template v-slot:[`item.required`]="{ item }">
        <div v-if="item.required">✅</div>
        <div v-if="!item.required">❌</div>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length / 3">
          Prescription: {{ getMedicines(item) }}
        </td>
        <td :colspan="headers.length / 3">Tests: {{ getTests(item) }}</td>
        <td :colspan="headers.length / 3">Comment: {{ item.comment }}</td>
      </template>
    </v-data-table>
    <v-data-table :headers="statsHeaders" :items="getPorterStats()">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Porter Stats Table</v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>
    <v-data-table :headers="pcrHeaders" :items="getPCRList()">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>PCR Table</v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Order, OrderGetter } from "@/store/Orders/types";
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import { Status } from "@/store/Orders/constants";
import * as _ from "lodash";

export default Vue.extend({
  name: "OrdersPage",
  data() {
    return {
      expanded: [],
      orderHeaders: [
        { text: "Required", value: "required" },
        { text: "Patient", value: "name" },
        { text: "Address", value: "address" },
        { text: "Phone", value: "phone" },
        { text: "Status", value: "status" },
        { text: "Area", value: "area" },
        { text: "Porter", value: "porter" },
        { text: "", value: "data-table-expand" },
      ],
      statsHeaders: [
        { text: "Porter", value: "porter" },
        { text: "Unassigned", value: "unassigned" },
        { text: "Assigned", value: "assigned" },
        { text: "Contacted", value: "contacted" },
        { text: "Delivered", value: "delivered" },
      ],
      pcrHeaders: [
        { text: "Porter", value: "porter" },
        { text: "PCR", value: "count" },
      ],
      status: Object.values(Status),
    };
  },
  computed: {
    ...mapGetters("$_porters", {
      porters: "portersFromArea",
      porterId: "porterIdFromName",
      isLoading: "isLoading",
    }),
    ...mapGetters("$_orders", {
      orders: "orders",
    }),
  },
  created() {
    this.getPorters();
    this.getOrders();
  },
  beforeDestroy() {
    this.stopListenerForOrders();
  },
  methods: {
    ...mapActions({
      getPorters: "$_porters/getPorters",
      getOrders: "$_orders/startListenerForOrders",
      stopListenerForOrders: "$_orders/stopListenerForOrders",
      updateOrder: "$_orders/updateOrder",
      updateStatus: "$_orders/updateStatus",
    }),
    porterSelected(order: Order): void {
      order.porterId = this.porterId(order.porter);
      this.updateOrder(order);
    },
    statusUpdated(order: Order): void {
      this.updateStatus(order);
    },
    getPCRList() {
      // Get list of Non-Unassigned PCR orders by porters
      const filteredList = this.orders.filter(
        (item: OrderGetter) => item.hasTest
      );
      const result = _.countBy(filteredList, "porter");
      const porters = Object.keys(result);
      return porters.map((porter: string) => {
        return {
          porter: porter,
          count: result[porter],
        };
      });
    },
    getPorterStats() {
      type PorterStats = {
        porter: string;
        unassigned?: string;
        assigned?: string;
        contacted?: string;
        delivered?: string;
      };
      const groupByPorter = _.groupBy(this.orders, (order) => order.porter);
      const porters = Object.keys(groupByPorter);
      const result: PorterStats[] = porters.map((porter: string) => {
        return {
          porter: porter,
          ..._.countBy(groupByPorter[porter], "status"),
        };
      });
      return result;
    },
    getMedicines(order: Order) {
      console.log(order.medicines);
      return order.medicines.map((medicine) => medicine.display);
    },
    getTests(order: Order) {
      return order.tests.map((test) => test.display);
    },
  },
});
</script>

<style />
