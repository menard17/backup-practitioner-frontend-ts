<template>
  <v-dialog width="500" v-model="dialog">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col align="start"> Edit Patient </v-col>
          <v-col align="end">
            <v-btn icon @click="cancel">
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-row class="ma-2">
        <v-col>
          <v-row>
            <v-col>
              <label-text-field label="Family Name" v-model="familyName" />
            </v-col>
            <v-col>
              <label-text-field label="First Name" v-model="firstName" />
            </v-col>
          </v-row>
          <label-text-field class="mt-2" label="Phone" v-model="phone" />
          <v-row dense class="mt-2">
            <v-col>
              <div class="subtitle-2 mb-2">Gender</div>
              <v-select
                v-model="selectedGender"
                outlined
                hide-details
                dense
                :items="['MALE', 'FEMALE']"
              />
            </v-col>
            <v-col>
              <div class="mb-2 subtitle-2">Birth Date</div>
              <v-text-field
                type="date"
                dense
                outlined
                hide-details
                v-model="birthDate"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div class="mx-5 mt-3 title">Address Information</div>
      <label-text-field
        class="mx-5 mt-2"
        label="Postal Code"
        v-model="postalCode"
      />
      <v-row dense class="mx-4 mt-2">
        <v-col>
          <label-text-field label="City" v-model="city" />
        </v-col>
        <v-col>
          <label-text-field label="State / Prefecture" v-model="state" />
        </v-col>
      </v-row>
      <v-row dense class="mx-4 mb-3">
        <v-col>
          <label-text-field
            class="mt-2"
            label="Address Line 1"
            v-model="addressLine1"
          />
          <label-text-field
            class="mt-2"
            label="Address Line 2"
            v-model="addressLine2"
          />
        </v-col>
      </v-row>

      <v-card-actions>
        <v-spacer />
        <v-btn
          @click="cancel"
          color="error"
          class="text-none subtitle-2"
          outlined
        >
          Cancel</v-btn
        >
        <v-btn color="primary" class="text-none subtitle-2" @click="save">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import LabelTextField from "@/components/LabelTextField";
import { mapActions } from "vuex";
export default {
  name: "EditPatientDialog",
  components: { LabelTextField },
  data() {
    return {
      dialog: false,
      familyName: "",
      firstName: "",
      email: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      gender: "",
      birthDate: "",
      selectedGender: "",
      id: "",
    };
  },
  computed: {
    changeFields() {
      return {
        given_name: this.firstName,
        family_name: this.familyName,
        gender: this.selectedGender.toLowerCase(),
        dob: this.birthDate,
        phone: this.phone,
        address: [
          {
            use: "home",
            type: "both",
            city: this.city,
            country: "JP",
            line: [this.addressLine1, this.addressLine2],
            postalCode: this.postalCode,
            state: this.state,
          },
        ],
      };
    },
  },
  methods: {
    ...mapActions("$_patients", {
      updatePatient: "updatePatient",
    }),
    cancel() {
      this.familyName = "";
      this.firstName = "";
      this.email = "";
      this.phone = "";
      this.addressLine1 = "";
      this.addressLine2 = "";
      this.city = "";
      this.state = "";
      this.postalCode = "";
      this.country = "";
      this.gender = "";
      this.birthDate = "";
      this.selectedGender = "";
      this.id = "";
      this.dialog = false;
    },
    save() {
      this.updatePatient({ patientId: this.id, payload: this.changeFields });
      this.cancel();
    },
    toggleDialog(patient) {
      this.dialog = !this.dialog;
      if (this.dialog) {
        this.id = patient.id;
        this.familyName = patient.name[0].family;
        this.firstName = patient.name[0].given[0];
        this.email = patient.telecom.find(
          (item) => item.system === "email"
        ).value;
        this.phone = patient.telecom.find(
          (item) => item.system === "phone"
        ).value;
        this.birthDate = patient.birthDate;
        this.selectedGender = patient.gender.toUpperCase();
        this.addressLine1 = patient.address[0].line[0];
        this.addressLine2 = patient.address[0].line[1];
        this.city = patient.address[0].city;
        this.state = patient.address[0].state;
        this.postalCode = patient.address[0].postalCode;
        this.country = patient.address[0].country;
      }
    },
  },
};
</script>

<style scoped></style>
