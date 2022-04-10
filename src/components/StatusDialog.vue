<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title>
        <v-row align="center">
          <v-col align="start">
            {{ title }}
          </v-col>
          <v-col align="end">
            <v-btn @click="dialog = false" icon>
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <div class="pa-4">
        <div class="mb-3">
          {{ body }}
        </div>

        <slot v-if="status === 'success'" />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "StatusDialog",
  data() {
    return {
      dialog: false,
      title: "",
      body: "",
      status: "",
    };
  },
  methods: {
    toggleDialog({ title, body, status }) {
      this.dialog = !this.dialog;
      if (this.dialog) {
        this.title = title;
        this.body = body;
        this.status = status;
      }
    },
  },
};
</script>

<style scoped></style>
