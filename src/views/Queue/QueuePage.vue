<template>
  <div>
    <queue-details v-if="isVisitType" :queueData="QueueData" />
    <div v-else>
      Please Set your schedule to Walk in to be able to pick-up queue
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import QueueDetails from "./components/QueueDetails.vue";
import { mapActions, mapState, mapGetters } from "vuex";

export default defineComponent({
  name: "QueuePage",
  components: {
    QueueDetails,
  },
  computed: {
    ...mapGetters("$_account", {
      availableTime: "roleAvailableTime",
      isVisitType: "isVisitType",
    }),
    ...mapState("$_queues", {
      QueueData: "QueueData",
      listId: "listId",
    }),
  },
  methods: {
    ...mapActions({
      getQueueToday: "$_queues/getQueueToday",
      getCurrentUser: "$_account/getCurrentUser",
      getListId: "$_queues/getListId",
    }),
  },
  async created() {
    if (!this.availableTime) {
      await this.getCurrentUser();
    }

    await this.getListId();
    this.getQueueToday({
      availableTime: this.availableTime,
      listId: this.listId,
    });
  },
});
</script>
