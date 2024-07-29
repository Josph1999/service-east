import { type Media } from "../../speakers/interfaces/response.interface";


export interface NewsInterface {
    id: string;
    title_ka: string;
    title_eng: string;
    description_ka: string;
    description_eng: string;
    created_at: string;
    updated_at: string;
    images: Media[];
}