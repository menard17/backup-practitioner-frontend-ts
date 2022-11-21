<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          <v-row class="title">
            <v-col> Porter's Info </v-col>
            <v-col align="end" cols="2">
              <v-btn icon @click="cancel">
                <v-icon> mdi-close </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-list three-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-card-text>
                <v-list-item-title>
                  <h3>Name:</h3>
                  <v-text-field v-model="name" />
                </v-list-item-title>
              </v-card-text>
              <v-card-text>
                <v-list-item-title>
                  <h3>Area:</h3>
                  <v-text-field v-model="area" />
                </v-list-item-title>
              </v-card-text>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-btn color="primary" class="text-none subtitle-2" @click="save">
              Save
            </v-btn>
          </v-card-actions>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
import { Porter } from "@/store/Porters/types";
import { DocumentReference } from "@firebase/firestore";
import { DocumentData } from "firebase/firestore";

export default Vue.extend({
  name: "PorterDialog",
  data() {
    return {
      dialog: false,
      active: false,
      name: "",
      area: "",
      documentId: "",
      ref: null as DocumentReference<DocumentData> | null,
    };
  },
  methods: {
    cancel() {
      this.dialog = false;
    },
    save() {
      this.updatePorter({
        ref: this.ref,
        documentId: this.documentId,
        name: this.name,
        area: this.area,
        active: this.active,
      });
      this.dialog = false;
    },
    toggleDialog(porter: Porter): void {
      this.name = porter.name;
      this.area = porter.area;
      this.ref = porter.ref;
      this.active = porter.active;
      this.documentId = porter.documentId;
      this.dialog = !this.dialog;
    },
    ...mapActions({
      updatePorter: "$_porters/updatePorter",
    }),
  },
});
</script>

<style scoped>
.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  margin-top: 25px;
}
</style>
