-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "media_type" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "vacancy_id" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vacancy" (
    "id" TEXT NOT NULL,
    "title_ka" TEXT NOT NULL,
    "title_eng" TEXT NOT NULL,
    "description_ka" TEXT NOT NULL,
    "description_eng" TEXT NOT NULL,

    CONSTRAINT "Vacancy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_vacancy_id_fkey" FOREIGN KEY ("vacancy_id") REFERENCES "Vacancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
