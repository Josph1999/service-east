-- CreateTable
CREATE TABLE "Sponsors" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "logo_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sponsors_pkey" PRIMARY KEY ("id")
);
