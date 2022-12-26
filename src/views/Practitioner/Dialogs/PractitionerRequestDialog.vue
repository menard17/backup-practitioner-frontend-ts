<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title>
        <v-row>
          <v-col cols="auto" align="start"> {{ title }} </v-col>
          <v-col align="end">
            <v-btn icon @click="cancel">
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-form class="text-left px-5">
        <v-row>
          <v-col v-if="user">
            <label-card label="Email" :text="user.email" />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <div class="subtitle-2 mb-2">Role Type</div>
            <v-select
              :disabled="!this.isNewPractitioner"
              v-model="selectedRoleType"
              outlined
              hide-details
              dense
              :items="['DOCTOR', 'NURSE', 'STAFF']"
            />
            <span :class="getClass(selectedRoleType)" class="error-style">
              Please Select Role Type
            </span>
          </v-col>
          <v-col align="start">
            <div class="subtitle-2 mb-2">Gender</div>
            <v-select
              v-model="selectedGender"
              outlined
              hide-details
              dense
              :items="['MALE', 'FEMALE']"
            />
            <span :class="getClass(selectedGender)" class="error-style">
              Please Select Gender
            </span>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <div class="title mb-2">Practitioner Details (JP)</div>
            <v-row dense>
              <v-col>
                <label-text-field label="Family Name" v-model="familyNameJp" />
                <span
                  :class="getClass(familyNameJp.trim())"
                  class="error-style"
                >
                  Family Name Required
                </span>
              </v-col>
              <v-col>
                <label-text-field label="First Name" v-model="firstNameJp" />
                <span :class="getClass(firstNameJp.trim())" class="error-style">
                  First Name Required
                </span>
              </v-col>
              <v-col cols="12" v-if="this.selectedRoleType != 'STAFF'">
                <label-text-area label="Biography" v-model="bioJp" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <div class="title mb-2">Practitioner Details (EN)</div>
            <v-row dense>
              <v-col>
                <label-text-field label="Family Name" v-model="familyNameEn" />
                <span :class="getClass(familyNameEn)" class="error-style">
                  English Family Name Required
                </span>
              </v-col>
              <v-col>
                <label-text-field label="First Name" v-model="firstNameEn" />
                <span :class="getClass(firstNameEn)" class="error-style">
                  English First Name Required
                </span>
              </v-col>
              <v-col cols="12" v-if="this.selectedRoleType != 'STAFF'">
                <label-text-area label="Biography" v-model="bioEn" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col v-if="this.selectedRoleType != 'STAFF'">
            <div class="title mb-2">Serving Date Range</div>
            <v-row dense>
              <v-col cols="12">
                <v-menu
                  ref="menuFrom"
                  v-model="menuFrom"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      outlined
                      v-model="date"
                      label="Select Range"
                      append-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                    />
                    <span
                      :class="getClass('dateRangeField')"
                      class="date-error"
                    >
                      Please Select From and To Date
                    </span>
                  </template>
                  <v-date-picker
                    v-model="dateRange"
                    color="primary"
                    no-title
                    range
                    @input="menuFrom = false"
                    :min="minCurrentMonth"
                  />
                </v-menu>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row dense class="mt-2">
          <v-col v-if="this.selectedRoleType != 'STAFF'">
            <div class="title">Upload a Photo</div>
            <div
              v-if="image"
              class="d-flex align-content-center justify-center mb-2"
            >
              <v-avatar
                color="blue"
                min-height="150"
                min-width="150"
                size="150"
              >
                <v-img :src="photo" cover />
              </v-avatar>
            </div>
            <v-file-input
              dense
              outlined
              @change="previewImage"
              v-model="image"
              accept="image/png"
              :rules="rules"
            />
            <span :class="getClass(image)" class="image-error">
              Photo is required
            </span>
          </v-col>
        </v-row>

        <v-row dense class="mt-2">
          <v-col>
            <div class="mb-3 email-error">
              <span :class="getClass('emailField')">
                Please verify your email first
              </span>
            </div>
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions>
        <v-spacer />
        <v-btn
          @click="cancel"
          outlined
          color="error"
          class="text-none subtitle-2"
        >
          Cancel
        </v-btn>
        <v-btn @click="validate" color="primary" class="text-none subtitle-2">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import LabelTextField from "@/components/LabelTextField";
import LabelTextArea from "@/components/LabelTextArea";
import LabelCard from "@/components/LabelCard";
import { toBase64, resizeImage } from "@/utils/fileProcess";
import { mapActions } from "vuex";
import { formatDateString } from "@/utils/dateHelpers";
import { auth } from "@/plugins/firebase";

export default {
  name: "PractitionerRequestDialog",
  components: { LabelCard, LabelTextArea, LabelTextField },
  props: {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      isSaveButtonClicked: false,
      dialog: false,
      familyNameJp: "",
      firstNameJp: "",
      bioJp: "",
      familyNameEn: "",
      firstNameEn: "",
      bioEn: "",
      photo: null,
      image: null,
      selectedGender: "",
      selectedRoleType: "",
      isNewPractitioner: false,
      isNewPhoto: false,
      rules: [
        (value) =>
          !value ||
          value.size < 6250000 ||
          "photo size should be less than ~ 5 MB!",
      ],
      isMyPractitioner: false,
      practitionerRoleId: "",
      dateRange: [],
      menuFrom: false,
      menuTo: false,
    };
  },
  computed: {
    changeFields() {
      const output = {
        family_name_en: this.familyNameEn,
        given_name_en: this.firstNameEn,
        start: this.dateRange[0],
        end: this.dateRange[1],
        role_type: this.selectedRoleType.toLowerCase(),
        gender: this.selectedGender.toLowerCase(),
        family_name_ja: this.familyNameJp,
        given_name_ja: this.firstNameJp,
        bio_en: this.bioEn,
        bio_ja: this.bioJp,
      };

      if (this.photo) {
        output["photo"] = this.photo;
      }
      if (this.dateRange) {
        output["start"] = this.dateRange[0];
        output["end"] = this.dateRange[1];
      }
      return output;
    },
    date() {
      if (this.dateRange.length > 1) {
        return `${this.dateRange[0]}  -  ${this.dateRange[1]}`;
      }
      if (this.dateRange.length) {
        return `${this.dateRange[0]}  -  Select`;
      }
      if (!this.dateRange.length) {
        return "Select  -  Select";
      }
      return `${this.start} - ${this.end}`;
    },
    minCurrentMonth() {
      if (this.dateRange.length == 1) {
        let current = new Date(this.dateRange[0]);
        current.setDate(current.getDate());
        return current.toISOString().slice(0, 10);
      } else {
        return new Date().toISOString().slice(0, 10);
      }
    },
  },
  methods: {
    async refreshAuthState() {
      await auth.currentUser.reload();
      const idToken = await auth.currentUser?.getIdTokenResult(true);

      this.setToken(idToken.token);
    },
    getClass(input) {
      if (input === "dateRangeField") {
        if (this.dateRange.length < 2 && this.isSaveButtonClicked) {
          return "show-error";
        }
        return "hide-error";
      }
      if (input === "emailField" && this.isSaveButtonClicked) {
        if (auth.currentUser.emailVerified) {
          return "hide-error";
        }
        return "show-error";
      }
      if (input && this.isSaveButtonClicked) {
        if (typeof input === "string" && input.trim() === "") {
          return "show-error";
        }
        return "hide-error";
      } else if (!input && this.isSaveButtonClicked) {
        return "show-error";
      }
      return "hide-error";
    },
    async validate() {
      if (!auth.currentUser) return;

      await auth.currentUser.reload();
      const idToken = await auth.currentUser?.getIdTokenResult(true);

      this.setToken(idToken.token);
      this.isSaveButtonClicked = true;
      if (
        (auth.currentUser.emailVerified &&
          this.familyNameJp.trim() &&
          this.firstNameJp.trim() &&
          this.selectedGender &&
          this.dateRange.length > 1 &&
          this.image &&
          this.familyNameEn.trim() &&
          this.firstNameEn.trim() &&
          this.selectedRoleType === "DOCTOR") ||
        (auth.currentUser.emailVerified &&
          this.familyNameJp.trim() &&
          this.firstNameJp.trim() &&
          this.selectedGender &&
          this.dateRange.length > 1 &&
          this.image &&
          this.familyNameEn.trim() &&
          this.firstNameEn.trim() &&
          this.selectedRoleType === "NURSE") ||
        (auth.currentUser.emailVerified &&
          this.familyNameJp.trim() &&
          this.firstNameJp.trim() &&
          this.selectedGender &&
          this.familyNameEn &&
          this.familyNameEn.trim() &&
          this.firstNameEn &&
          this.firstNameEn.trim() &&
          this.selectedRoleType === "STAFF")
      ) {
        this.save();
      } else {
        return;
      }
    },
    ...mapActions("$_practitioners", {
      updatePractitioner: "updatePractitioner",
    }),
    ...mapActions("$_account", {
      updateMyPractitionerRole: "updateMyPractitionerRole",
      createMyPractitionerWithPractitionerRole:
        "createMyPractitionerWithPractitionerRole",
    }),
    ...mapActions("$_auth", {
      setToken: "setToken",
    }),
    async previewImage() {
      // file size in pixel
      const FileSize = 104;
      const resizedImage = await resizeImage({
        file: this.image,
        maxSize: FileSize,
      }).catch((e) => Error(e));
      this.isNewPhoto = true;
      this.photo = await toBase64(resizedImage).catch((e) => Error(e));
    },
    toggleDialog(
      practitioner,
      practitionerRole,
      isNewPractitioner,
      isMyPractitioner
    ) {
      this.dialog = !this.dialog;
      this.isNewPractitioner = isNewPractitioner;
      this.isMyPractitioner = isMyPractitioner;
      if (this.dialog && practitioner && practitionerRole) {
        this.familyNameJp = practitioner.jp.familyName;
        this.firstNameJp = practitioner.jp.firstName;
        this.bioJp = practitioner.jp.bio;
        this.familyNameEn = practitioner.en.familyName;
        this.firstNameEn = practitioner.en.firstName;
        this.bioEn = practitioner.en.bio;
        this.selectedRoleType = practitionerRole.roleType.toUpperCase();
        this.practitionerRoleId = practitionerRole.id;
        this.photo = practitioner.photo
          ? `data:${practitioner.photo.type};base64,${practitioner.photo.data}`
          : null;
        this.selectedGender = practitioner.sex.toUpperCase();
        this.image = practitioner.photo
          ? {
              name: `${practitioner.photo.data.substring(0, 11)}.${
                practitioner.photo.type.split("/")[1]
              }`,
              size: 1,
            }
          : null;
        if (practitionerRole.period) {
          this.start = practitionerRole.period.start;
          this.end = practitionerRole.period.end;
          this.dateRange = [this.start, this.end];
        }
      }
    },
    save() {
      if (!this.isMyPractitioner) {
        this.updatePractitioner({
          payload: this.changeFields,
          practitionerRoleId: this.practitionerRoleId,
        });

        this.cancel();
        return;
      }

      if (this.isNewPractitioner) {
        this.createMyPractitionerWithPractitionerRole({
          changeFields: this.changeFields,
        });
      } else {
        this.updateMyPractitionerRole({ changeFields: this.changeFields });
      }
      this.cancel();
    },
    cancel() {
      this.isNewPractitioner = false;
      this.familyNameJp = "";
      this.firstNameJp = "";
      this.bioJp = "";
      this.familyNameEn = "";
      this.firstNameEn = "";
      this.bioEn = "";
      this.selectedRoleType = "";
      this.photo = "";
      this.selectedGender = "";
      this.isNewPhoto = false;
      this.image = null;
      this.dialog = false;
      this.isMyPractitioner = false;
      this.start = formatDateString(new Date(), "yyyy-MM-dd");
      this.end = formatDateString(new Date(), "yyyy-MM-dd");
      this.isSaveButtonClicked = false;
    },
  },
};
</script>

<style scoped>
.date-error {
  position: relative;
  top: -37px;
  color: #bb2124;
  font-size: 10px;
}
.error-style {
  color: #bb2124;
  font-size: 10px;
  position: relative;
  top: -7px;
}
.email-error {
  color: #bb2124;
  text-align: center;
  font-size: 12px;
}
.image-error {
  margin-left: 30px;
  position: relative;
  top: -32px;
  color: #bb2124;
  font-size: 12px;
}
.show-error {
  visibility: visible;
}
.hide-error {
  visibility: hidden;
}
</style>
