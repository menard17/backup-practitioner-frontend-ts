<template>
  <v-dialog v-model="dialog" persistent width="500px">
    <v-card>
      <v-card-title>
        <v-row no-gutters dense justify="space-between">
          <v-col align="start"> Start Encounter </v-col>
          <v-col align="end">
            <v-btn @click="dialog = false" icon>
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <div class="my-5">Did the patient join the Zoom Call?</div>
      <v-card-actions>
        <v-btn @click="dialog = false" color="red" outlined class="subtitle-2">
          No show
        </v-btn>
        <v-spacer> </v-spacer>

        <v-btn @click="startEncounter" color="primary" class="subtitle-2">
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    toggleDialog() {
      this.dialog = !this.dialog;
    },
    startEncounter() {
      this.$emit("onYesClicked");
      this.dialog = false;
    },
  },
};
</script>

<style></style>
