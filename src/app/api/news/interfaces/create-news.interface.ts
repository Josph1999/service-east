import { type ImageInterface } from "@/components/dashboard/add-speaker/interfaces/image.interface";

export interface CreateNews {
    title_ka: string;
    title_eng: string;
    description_ka: string;
    description_eng: string;
    images: ImageInterface[];
}

export interface UploadImagesInterface {
    url: string;
    original_name: string;
    name: string;
    media_type: string;
    type: string;
    news_id?: string;
}