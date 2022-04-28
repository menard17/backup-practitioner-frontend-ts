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
          <v-col>
            <label-card label="Email" :text="user.email" />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <div class="subtitle-2 mb-2">Role Type?</div>
            <v-select
              v-model="selectedRoleType"
              outlined
              hide-details
              dense
              :items="['DOCTOR', 'NURSE']"
            />
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
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <div class="title mb-2">Practitioner Details (JP)</div>
            <v-row dense>
              <v-col>
                <label-text-field label="Family Name" v-model="familyNameJp" />
              </v-col>
              <v-col>
                <label-text-field label="First Name" v-model="firstNameJp" />
              </v-col>
              <v-col cols="12">
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
              </v-col>
              <v-col>
                <label-text-field label="First Name" v-model="firstNameEn" />
              </v-col>
              <v-col cols="12">
                <label-text-area label="Biography" v-model="bioEn" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row dense class="mt-2">
          <v-col>
            <div class="subtitle-2 mb-2">Upload a Photo</div>
            <v-file-input
              dense
              outlined
              @change="previewImage"
              v-model="image"
              accept="image/png"
              :rules="rules"
            />
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
        <v-btn @click="save" color="primary" class="text-none subtitle-2">
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
import { createMyPractitionerWithPractitionerRole } from "@/store/Account/account.actions";

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
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      familyNameJp: "",
      firstNameJp: "",
      bioJp: "",
      familyNameEn: "",
      firstNameEn: "",
      bioEn: "",
      zoomId: "",
      zoomPasscode: "",
      photo: "",
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
    };
  },
  computed: {
    changeFields() {
      return {
        family_name_en: this.familyNameEn,
        given_name_en: this.firstNameEn,
        start: "2021-01-01",
        end: "2099-03-31",
        role_type: this.selectedRoleType.toLowerCase(),
        gender: this.selectedGender.toLowerCase(),
        family_name_ja: this.familyNameJp,
        given_name_ja: this.firstNameJp,
        photo:
          this.isNewPractitioner || this.isNewPhoto
            ? this.photo
            : `data:${this.photo.type};base64,${this.photo.data}`,
        bio_en: this.bioEn,
        bio_ja: this.bioJp,
      };
    },
  },
  methods: {
    ...mapActions("$_account", {
      updateMyPractitionerRole: "updateMyPractitionerRole",
      createMyPractitionerWithPractitionerRole:
        "createMyPractitionerWithPractitionerRole",
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
    toggleDialog(practitioner, practitionerRole, isNewPractitioner) {
      this.dialog = !this.dialog;
      this.isNewPractitioner = isNewPractitioner;
      if (this.dialog && practitioner && practitionerRole) {
        this.familyNameJp = practitioner.jp.familyName;
        this.firstNameJp = practitioner.jp.firstName;
        this.bioJp = practitioner.jp.bio;
        this.familyNameEn = practitioner.en.familyName;
        this.firstNameEn = practitioner.en.firstName;
        this.bioEn = practitioner.en.bio;
        this.zoomId = practitionerRole.zoomId;
        this.zoomPasscode = practitionerRole.zoomPasscode;
        this.selectedRoleType = practitionerRole.roleType.toUpperCase();
        this.photo = practitioner.photo;
        this.selectedGender = practitioner.sex.toUpperCase();
        this.image = null;
      }
    },
    save() {
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
      this.zoomId = "";
      this.zoomPasscode = "";
      this.selectedRoleType = "";
      this.photo = "";
      this.selectedGender = "";
      this.isNewPhoto = false;
      this.image = null;
      this.dialog = false;
    },
  },
};
</script>

<style scoped></style>
