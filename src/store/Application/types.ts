export interface Template {
  title: string;
  type: string;
  text: string | undefined;
  createdOn: any;
  displayOrder: number;
  language: string;
}

export interface ApplicationState {
  templates: Template[];
  loadingData: {
    getTemplates: { isLoading: boolean };
  };
}

export interface Loading {
  action: any;
  value: string;
}
