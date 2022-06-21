export interface AccountState {
  practitioner: any;
  practitionerRole: any;
  user: any;
  firebaseRole: string;
  loadingData: {
    getCurrentUser: { isLoading: boolean };
    getCurrentUserRole: { isLoading: boolean };
    updateMyPractitionerRole: { isLoading: boolean };
    createMyPractitionerWithPractitionerRole: { isLoading: boolean };
  };
}

export interface HumanName {
  extension: Extension[];
  family: string;
  given: string[];
  prefix: string[];
  text: string;
}

export interface Telecom {
  system: string;
  use: string;
  value: string;
}

export interface Extension {
  url: string;
  valueString: string;
}

export interface BioExtension {
  extension: Extension[];
  url: string;
  valueString: string;
}

export interface AvailableTime {
  availableEndTime: string | undefined;
  availableStartTime: string | undefined;
  daysOfWeek: string[];
}
