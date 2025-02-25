/*
  Warnings:

  - Added the required column `lotto_type_id` to the `lotto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lotto` ADD COLUMN `lotto_type_id` INTEGER NOT NULL;
