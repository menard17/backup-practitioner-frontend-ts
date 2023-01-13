<template>
  <div>
    <queue-details
      v-if="isVisitTypeQueue"
      :queueData="queueData"
      @next="pickUpPatient"
    />

    <div v-else>
      {{ $t("label queue visit") }}
    </div>

    <alert-dialog
      :content="error"
      @confirm="toggleErrorDiaglog"
      @cancel="toggleErrorDiaglog"
      :isHideOverlay="false"
      ref="aletDialogRef"
      withIcon
      icon="mdi-alert-circle"
      colorIcon="red"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import AlertDialog from "@/components/AlertDialog.vue";
import { mapActions, mapState, mapGetters } from "vuex";
import { QueueState, TMapState } from "@/store/Queue/types";

export default defineComponent({
  name: "QueuePage",
  components: {
    QueueDetails: defineAsyncComponent(
      () => import("./components/QueueDetails.vue")
    ),
    AlertDialog,
  },
  computed: {
    ...mapGetters("$_account", {
      availableTime: "roleAvailableTime",
      isVisitTypeQueue: "isVisitType",
      practitioner: "practitioner",
    }),

    ...mapState<any, TMapState<QueueState>>("$_queues", {
      queueData: (state: QueueState) => state.queueData,
      appointmentId: (state: QueueState) => state.appointmentId,
      error: (state: QueueState) => state.error,
    }),
    ...mapGetters("$_queues", {
      loadingData: "loadingData",
    }),
  },
  methods: {
    ...mapActions({
      getQueueToday: "$_queues/getQueueToday",
      getCurrentUser: "$_account/getCurrentUser",
      nextPatient: "$_queues/nextPatient",
      setError: "$_queues/setError",
    }),

    async pickUpPatient() {
      await this.nextPatient();

      if (this.error) {
        this.openErrorDialog();
        await this.getQueueToday({
          availableTime: this.availableTime,
        });
        return;
      }

      this.$router.push(`/appointments/${this.appointmentId}?type=queue`);
    },
    toggleErrorDiaglog() {
      this.openErrorDialog();
      this.setError("");
    },
    openErrorDialog() {
      const alertDialogRef = this.$refs.aletDialogRef as any;
      alertDialogRef.toggleDialog();
    },
  },
  async created() {
    if (!this.availableTime) {
      await this.getCurrentUser();
    }

    await this.getQueueToday({
      availableTime: this.availableTime,
    });
  },
});
</script>
