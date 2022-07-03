<template>
  <v-card class="text-center pa-4">
    <v-row dense>
      <v-col cols="12">
        <label-card class="text-left mt-2" label="Email" :text="user.email" />
      </v-col>
      <v-col cols="12">
        <label-card
          class="text-left mt-2"
          label="Sex"
          :text="practitioner.sex"
        />
      </v-col>
      <v-col cols="12">
        <label-card
          class="text-left mt-2"
          label="Role Type"
          :text="practitionerRole.roleType"
        />
      </v-col>
    </v-row>

    <v-row class="mt-5" dense>
      <v-col cols="12">
        <div class="subtitle-1 text-left">Practitioner Details (JP)</div>
      </v-col>
      <v-col>
        <label-card
          class="text-left"
          label="Name"
          :text="`${practitioner.jp.familyName}, ${practitioner.jp.firstName}`"
        />
        <label-card
          v-if="practitionerRole.roleType != 'STAFF'"
          class="text-left mt-2"
          label="Biography"
          :text="practitioner.jp.bio"
        />
      </v-col>
    </v-row>
    <v-row class="mt-5" dense>
      <v-col cols="12">
        <div class="subtitle-1 text-left">Practitioner Details (EN)</div>
      </v-col>
      <v-col>
        <label-card
          class="text-left"
          label="Name"
          :text="`${practitioner.en.familyName}, ${practitioner.en.firstName}`"
        />
        <label-card
          v-if="practitionerRole.roleType != 'STAFF'"
          class="text-left mt-2"
          label="Biography"
          :text="practitioner.en.bio"
        />
      </v-col>
    </v-row>

    <v-btn
      @click="$emit('edit')"
      block
      color="primary"
      class="mt-4 subtitle-2 text-none"
    >
      Edit
    </v-btn>
  </v-card>
</template>

<script>
import LabelCard from "@/components/LabelCard";
export default {
  name: "PractitionerDetailsCard",
  components: { LabelCard },
  props: {
    practitioner: {
      type: Object,
      required: true,
    },
    practitionerRole: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
