export interface FileInterface {
    url: string;
    name: string;
    original_name: string;
    type: string;
  }

export interface AddVacancyInterface {
    title_ka: string;
    title_eng: string;
    description_ka: string;
    description_eng: string;
    pdf_ka?: FileInterface;
    pdf_eng?: FileInterface;
}