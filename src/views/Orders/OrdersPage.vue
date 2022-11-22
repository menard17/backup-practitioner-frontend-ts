<template>
  <div class="deliveries">
    <v-data-table
      :headers="headers"
      :items="orders"
      loading-text="Loading... Please wait"
    >
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
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Order } from "@/store/Orders/types";
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import { Status } from "@/store/Orders/constants";

export default Vue.extend({
  name: "OrdersPage",
  data() {
    return {
      headers: [
        { text: "Patient", value: "name" },
        { text: "Address", value: "address" },
        { text: "Phone", value: "phone" },
        { text: "Status", value: "status" },
        { text: "Area", value: "area" },
        { text: "Porter", value: "porter" },
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
  },
});
</script>

<style />
