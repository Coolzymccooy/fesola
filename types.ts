
export interface ContactDetail {
  label: string;
  phones: string[];
}

export interface CampusLocation {
  id: string;
  name: string;
  addressLines: string[];
  contacts: ContactDetail[];
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
