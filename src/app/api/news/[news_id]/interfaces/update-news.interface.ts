import { type ImageInterface } from "@/components/dashboard/add-speaker/interfaces/image.interface";

export interface UpdateNewsInterface {
    title_ka?: string;
    title_eng?: string;
    description_ka?: string;
    description_eng?: string;
    images?: ImageInterface[];
}