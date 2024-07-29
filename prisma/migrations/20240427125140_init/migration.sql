-- CreateTable
CREATE TABLE "Speaker" (
    "id" TEXT NOT NULL,
    "name_ka" TEXT NOT NULL,
    "name_eng" TEXT NOT NULL,
    "position_ka" TEXT NOT NULL,
    "position_eng" TEXT NOT NULL,
    "bio_ka" TEXT,
    "bio_eng" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Speaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "media_type" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "speaker_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_speaker_id_fkey" FOREIGN KEY ("speaker_id") REFERENCES "Speaker"("id") ON DELETE SET NULL ON UPDATE CASCADE;
