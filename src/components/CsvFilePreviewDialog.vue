<template>
  <v-dialog
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
    v-model="dialog"
  >
    <v-card tile>
      <v-card-title>
        <v-row>
          <v-col>
            <div>{{ title }}</div>
          </v-col>
          <v-col align="end" cols="2">
            <v-btn icon @click="cancel">
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th v-for="(header, i) in headers" :key="`header-${i}`">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(object, i) in list" :key="`list-${i}`">
              <td v-for="(item, j) in Object.values(object)" :key="`obj-${j}`">
                {{ item }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CsvFilePreviewDialog",
  data() {
    return {
      dialog: false,
      headers: [],
      list: [],
      title: "",
    };
  },
  methods: {
    toggleDialog({ headers, list, name }) {
      this.dialog = !this.dialog;
      if (this.dialog) {
        this.headers = headers;
        this.list = list;
        this.title = name;
      }
    },
    cancel() {
      this.$emit("cancel");
      this.list = [];
      this.headers = [];
      this.title = "";
      this.dialog = false;
    },
  },
};
</script>

<style scoped></style>
