export interface ResponseInterface<T> {
  message: string;
  status: number;
  success: boolean;
  count?: number;
  data: T;
}

export interface Media {
  created_at: string;
  id: string;
  media_type: string;
  name: string;
  original_name: string;
  speaker_id: string;
  type: string;
  updated_at: string;
  url: string;
}

export interface SpeakerInterface {
  bio_eng: string | null;
  bio_ka: string | null;
  created_at: string;
  id: string;
  image?: Media[];
  name_eng: string;
  name_ka: string;
  position_eng: string;
  position_ka: string;
  updated_at: string;
}
