<template>
  <v-dialog width="500" v-model="dialog">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col>
            {{ title }}
          </v-col>
          <v-col align="end" cols="2">
            <v-btn icon @click="cancel">
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <div class="text-center">{{ message }}</div>
      </v-card-text>
      <v-card-actions>
        <div>
          <v-text-field v-model="value" />
        </div>
        <v-spacer />
        <v-btn
          @click="cancel"
          color="error"
          class="text-none subtitle-2"
          outlined
        >
          {{ this.$t("No") }}
        </v-btn>
        <v-btn
          v-if="!this.keyword || this.value == this.keyword"
          color="primary"
          class="text-none subtitle-2"
          @click="save"
        >
          {{ this.$t("Yes") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props: {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    keyword: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      dialog: false,
      value: "",
    };
  },
  methods: {
    save() {
      this.$emit("save");
      this.dialog = false;
    },
    cancel() {
      this.$emit("cancel");
      this.dialog = false;
    },
    toggleDialog() {
      this.dialog = !this.dialog;
    },
  },
};
</script>

<style scoped></style>
