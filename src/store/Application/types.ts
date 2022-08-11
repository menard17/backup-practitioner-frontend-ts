export interface ApplicationState {
  templates: Template[];
  medicalTerms: {
    [key: string]: MedicalTerm[];
  };
  emailSent: boolean;
  sheetAdded: boolean;
  loadingData: {
    getTemplates: { isLoading: boolean };
    getMedicalTerms: { isLoading: boolean };
    callLogicApp: { isLoading: boolean };
  };
}

export type EmailObject = {
  email: string;
  familyName: string;
  type: string;
};

export interface Loading {
  action: any;
  value: string;
}

export type SheetObject = {
  email: string;
  phone: string;
  lastName: string;
  firstName: string;
  date: string;
  clinicalNote: string;
  doctor: string;
  start: string;
  address: string;
  insuranceFront: string;
  insuranceBack: string;
  worksheet: string;
  dob: string;
  gender: string;
};

export interface Template {
  title: string;
  type: string;
  text: string;
  createdOn: any;
  displayOrder: number;
  language: string;
}

export interface MedicalTerm {
  type: string;
  language: string;
  array: {
    value: string;
    display: string;
  }[];
}
