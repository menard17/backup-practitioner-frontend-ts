<template>
  <v-dialog
    v-model="dialog"
    max-width="290"
    persistent
    :hide-overlay="isHideOverlay"
    transition="dialog-bottom-transition"
    class="overflow-hidden"
  >
    <v-card>
      <v-row>
        <v-col align="end">
          <v-btn @click="close" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-card-title class="flex-column center text-center">
        <span class="text-body1">{{ labelCallStatus }}</span>
        <div v-if="status === 'calling'" class="dot-pulse mt-5 mb-10"></div>
      </v-card-title>
      <v-card-actions v-if="status == 'declined' || status == 'timeout'">
        <v-btn color="red darken-1" text @click="close"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  data() {
    return {
      dialog: true,
    };
  },
  props: {
    status: {
      type: String,
      required: false,
    },
    isHideOverlay: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    close() {
      this.setStatus(undefined);
    },
    toggleDialog() {
      this.setStatus(undefined);
    },
    ...mapActions({
      setStatus: "$_appointments/setStatus",
    }),
  },
  computed: {
    labelCallStatus: {
      get(): string {
        if (this.status === "calling") return "Calling Patient";
        else if (this.status === "declined") return "Patient Decline the call";
        else if (this.status === "timeout") return "Call Time out";

        return "";
      },
    },
  },
});
</script>

<style scoped>
.dot-pulse {
  position: relative;
  left: -9999px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  box-shadow: 9999px 0 0 -5px;
  animation: dot-pulse 1.5s infinite linear;
  animation-delay: 0.25s;
}
.dot-pulse::before,
.dot-pulse::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
}
.dot-pulse::before {
  box-shadow: 9984px 0 0 -5px;
  animation: dot-pulse-before 1.5s infinite linear;
  animation-delay: 0s;
}
.dot-pulse::after {
  box-shadow: 10014px 0 0 -5px;
  animation: dot-pulse-after 1.5s infinite linear;
  animation-delay: 0.5s;
}

@keyframes dot-pulse-before {
  0% {
    box-shadow: 9984px 0 0 -5px;
  }
  30% {
    box-shadow: 9984px 0 0 2px;
  }
  60%,
  100% {
    box-shadow: 9984px 0 0 -5px;
  }
}
@keyframes dot-pulse {
  0% {
    box-shadow: 9999px 0 0 -5px;
  }
  30% {
    box-shadow: 9999px 0 0 2px;
  }
  60%,
  100% {
    box-shadow: 9999px 0 0 -5px;
  }
}
@keyframes dot-pulse-after {
  0% {
    box-shadow: 10014px 0 0 -5px;
  }
  30% {
    box-shadow: 10014px 0 0 2px;
  }
  60%,
  100% {
    box-shadow: 10014px 0 0 -5px;
  }
}
</style>
