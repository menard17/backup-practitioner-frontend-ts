<template>
  <div class="porters">
    <v-data-table
      :headers="headers"
      :items="porters"
      :loading="isLoading"
      loading-text="Loading... Please wait"
      @click:row="openOrderDialog"
    >
      <template v-slot:[`item.active`]="{ item }">
        <v-simple-checkbox
          v-model="item.active"
          @click="updateActiveStatus(item)"
        />
      </template>
    </v-data-table>
    <porter-dialog ref="PorterDialogRef" />
  </div>
</template>

<script lang="ts">
import { Porter } from "@/store/Porters/types";
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import PorterDialog from "./PorterDialog.vue";

export default Vue.extend({
  components: { PorterDialog },
  name: "PortersPage",
  data() {
    return {
      headers: [
        { text: "Active", value: "active" },
        { text: "Name", value: "name" },
        { text: "Area", value: "area" },
        { text: "Id", value: "documentId" },
      ],
    };
  },
  computed: {
    ...mapGetters("$_porters", {
      porters: "porters",
      isLoading: "isLoading",
    }),
  },
  created() {
    this.getPorters();
  },
  methods: {
    updateActiveStatus(porter: Porter) {
      this.updatePorter(porter);
    },
    openOrderDialog(porter: Porter): void {
      const dialogRef = this.$refs.PorterDialogRef as any;
      dialogRef.toggleDialog(porter);
    },
    ...mapActions({
      getPorters: "$_porters/getPorters",
      updatePorter: "$_porters/updatePorter",
    }),
  },
});
</script>

<style />
