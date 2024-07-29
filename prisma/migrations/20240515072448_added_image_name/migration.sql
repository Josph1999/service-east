/*
  Warnings:

  - Added the required column `image_name` to the `Sponsors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sponsors" ADD COLUMN     "image_name" TEXT NOT NULL;
