<template>
  <v-dialog width="500" v-model="dialog">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col align="start"> Create Charge </v-col>
          <v-col align="end">
            <v-btn icon @click="dialog = false">
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <div class="px-5">
        <!-- <v-layout class="mt-3">
          <v-flex>
            <div class="subtitle-2">Payment Method</div>
          </v-flex>
        </v-layout>
        <v-layout class="my-3">
          <v-flex>
            <v-card class="py-4">
              <v-list-item>
                <v-flex>
                  <v-layout justify-space-between>
                    <div>
                      {{ paymentMethod.card.brand.toUpperCase() }} ending in
                      {{ paymentMethod.card.last4 }}
                    </div>
                    <v-icon color="green"> mdi-check-circle </v-icon>
                  </v-layout>

                  <div>
                    {{ paymentMethod.billing_details.name }}
                  </div>
                  <div>
                    {{ paymentMethod.card.exp_month }} /
                    {{ paymentMethod.card.exp_year }}
                  </div>
                </v-flex>
              </v-list-item>
            </v-card>
          </v-flex>
        </v-layout> -->

        <v-row class="mt-3" no-gutters>
          <v-col align="start">
            <div class="subtitle-2 mb-2">Price</div>
            <v-row no-gutters>
              <v-text-field
                v-model="price"
                type="number"
                dense
                outlined
                placeholder="Charge Amount"
              />
              <v-btn
                class="subtitle-2 text-none ml-4"
                color="primary"
                depressed
              >
                Create Charge
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      price: 0,
      languageItems: ["JP", "EN"],
      defaultLanguage: "JP",
    };
  },
  methods: {
    toggleDialog() {
      this.dialog = !this.dialog;
    },
  },
};
</script>

<style></style>
