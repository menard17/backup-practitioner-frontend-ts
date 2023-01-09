<template>
  <v-card class="mb-5 pa-2">
    <v-card-title class="font-weight-bold title"> Queuing </v-card-title>
    <v-card-text class="mt-8">
      <v-row align="start" class="mx-0">
        <p>
          {{ $t("queue start time") }}
          <span class="d-block font-lg black--text mt-1">
            {{
              queueData.startTime === ""
                ? "No Available start time for today"
                : queueData.startTime
            }}
          </span>
        </p>
      </v-row>
      <v-row align="start" class="mx-0">
        <p>
          {{ $t("queue ending time") }}
          <span class="d-block font-lg black--text mt-1">
            {{
              queueData.endTime === ""
                ? "No Available end time for today"
                : queueData.endTime
            }}
          </span>
        </p>
      </v-row>
      <v-row align="start" class="mx-0">
        <p>
          {{ $t("queue number people") }}
          <span class="d-block font-lg black--text mt-1">
            {{ labelQueue }}
          </span>
        </p>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn class="pa-4 ms-2" depressed color="primary">
        {{ $t("next patient") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Queue } from "@/store/Queue/types";

export default Vue.extend({
  name: "QueueDetails",
  props: {
    queueData: {
      type: Object as PropType<Queue>,
      required: true,
    },
  },
  computed: {
    labelQueue: {
      get(): string {
        if (!this.queueData.patientLists?.entry) return "None";

        return this.queueData.patientLists.entry.length > 0
          ? this.queueData.patientLists.entry.length.toString()
          : "None";
      },
      set(newValue: string): string {
        return newValue;
      },
    },
  },
});
</script>

<style>
.font-lg {
  font-size: 1.15em;
}
</style>
