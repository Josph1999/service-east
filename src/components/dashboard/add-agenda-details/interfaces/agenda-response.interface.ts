import { type Agenda } from "@prisma/client";

export interface AgendaDateInterface {
    id: string;        // Unique identifier for the AgendaDate
    date: Date;        // The date associated with the AgendaDate
    name?: string;     // Optional name for the AgendaDate
    createdAt: Date;   // Timestamp for when the AgendaDate was created
    updatedAt: Date;   // Timestamp for when the AgendaDate was last updated
    agenda: Agenda[];  // List of Agenda items associated with the AgendaDate
  }
  