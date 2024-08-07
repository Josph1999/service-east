import { type FileInterface } from '../../interfaces/add-vacancy-interface';

export interface UpdateVacancyInterface {
  title_ka?: string;
  title_eng?: string;
  description_ka?: string;
  description_eng?: string;
  pdf_ka?: FileInterface;
  pdf_eng?: FileInterface;
}
