<template>
  <v-dialog width="500" v-model="dialog">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col align="start">
            {{ title }}
          </v-col>
          <v-col align="end">
            <v-btn icon @click="closeDialog">
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card
        class="ma-2"
        v-for="document in documents"
        :key="document.attachment.title"
      >
        <v-img
          :lazy-src="document.attachment.url"
          :src="document.attachment.url"
        />
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      documents: [],
      title: "Document Reference",
    };
  },
  methods: {
    toggleDialog(documents, title) {
      this.documents = documents;
      this.title = title;
      this.dialog = !this.dialog;
    },
    closeDialog() {
      this.documents = [];
      this.title = "";
      this.dialog = false;
    },
  },
};
</script>

<style></style>
