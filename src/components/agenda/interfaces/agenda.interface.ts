export interface AgendaItem {
    id: string;
    location_ka: string;
    location_eng: string;
    activity_ka: string;
    activity_eng: string;
    description_ka: string | null;
    description_eng: string | null;
    agenda_date_id: string;
    time: string;
    created_at: string;
    updated_at: string;
}

export interface AgendaInterface {
    id: string;
    date: string;
    name: string | null;
    created_at: string;
    updated_at: string;
    agenda: AgendaItem[];
}