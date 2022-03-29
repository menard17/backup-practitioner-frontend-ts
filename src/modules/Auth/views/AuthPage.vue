<template>
  <v-container>
    <v-layout fill-height justify-center align-center wrap>
      <v-card width="500">
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="basil"
          grow
          centered
        >
          <v-tab>Sign-in</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <e-login-form />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import ELoginForm from "../components/ELoginForm.vue";

export default {
  components: {
    ELoginForm,
  },
  data() {
    return {
      tab: 0,
    };
  },
};
</script>

<style></style>
