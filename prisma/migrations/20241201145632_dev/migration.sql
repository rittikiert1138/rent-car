/*
  Warnings:

  - Added the required column `lotto_type_width` to the `lotto_type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lotto_type` ADD COLUMN `lotto_type_width` VARCHAR(191) NOT NULL;
