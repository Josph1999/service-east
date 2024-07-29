-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "news_id" TEXT;

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "title_ka" TEXT NOT NULL,
    "title_eng" TEXT NOT NULL,
    "description_ka" TEXT NOT NULL,
    "description_eng" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "News"("id") ON DELETE SET NULL ON UPDATE CASCADE;
