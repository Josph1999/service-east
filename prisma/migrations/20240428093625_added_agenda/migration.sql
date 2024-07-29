-- CreateTable
CREATE TABLE "AgendaDate" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgendaDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agenda" (
    "id" TEXT NOT NULL,
    "location_ka" TEXT NOT NULL,
    "location_eng" TEXT NOT NULL,
    "activity_ka" TEXT NOT NULL,
    "activity_eng" TEXT NOT NULL,
    "description_ka" TEXT,
    "description_eng" TEXT,
    "agenda_date_id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agenda_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Agenda" ADD CONSTRAINT "Agenda_agenda_date_id_fkey" FOREIGN KEY ("agenda_date_id") REFERENCES "AgendaDate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
