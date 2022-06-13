<template>
  <v-dialog v-model="dialog" width="550">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col align="start">{{ content }}</v-col>
          <v-col align="end">
            <v-btn @click="cancel" icon>
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        Are you sure you want to send email to this user?
        <br />
        This email is about
        {{ content }}.
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="cancel"
          :disabled="isLoading"
          color="error"
          class="text-none subtitle-2"
          outlined
        >
          Cancel</v-btn
        >
        <v-spacer />
        <v-btn
          :loading="isLoading"
          :disabled="isLoading"
          color="primary"
          class="text-none subtitle-2"
          @click="save"
        >
          Send Email
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import sendEmail from "@/utils/emailServices";

export default {
  name: "EmailConfirmationDialog",
  data() {
    return {
      dialog: false,
      isLoading: false,
      type: "",
      content: "",
      email: "",
      familyName: "",
    };
  },
  methods: {
    cancel() {
      this.url = "";
      this.content = "";
      this.email = "";
      this.dialog = false;
    },
    save() {
      this.isLoading = true;
      const { email, familyName, type } = this;
      sendEmail({ email, familyName, type })
        .then(() => {
          this.isLoading = false;
          this.$emit("onSent", true);
          this.cancel();
        })
        .catch((_) => {
          this.isLoading = false;
          this.$emit("onSent", false);
          this.cancel();
        });
    },
    toggleDialog(type, content, email, familyName) {
      this.dialog = !this.dialog;
      if (this.dialog) {
        this.type = type;
        this.content = content;
        this.email = email;
        this.familyName = familyName;
      }
    },
  },
};
</script>

<style scoped></style>
