export interface ResponseInterface<T> {
  message: string;
  status: number;
  success: boolean;
  count?: number;
  data: T;
}

// Interface for File model
export interface File {
  id: string;
  url: string;
  original_name: string;
  name: string;
  media_type: string;
  lang: string;
  vacancy_id: string;
  vacancy: Vacancy; // Reference to the Vacancy model
}

// Interface for Vacancy model
export interface Vacancy {
  id: string;
  title_ka: string;
  title_eng: string;
  description_ka: string;
  description_eng: string;
  files: File[]; // Array of File references
}
