export type Telecom = {
  system: string;
  use: string;
  value: string;
};

export type Name = {
  use: string | null;
  family: string;
  given: [string];
  extension: [Extension];
};

export type Extension = {
  url: string;
  valueString: string;
};
