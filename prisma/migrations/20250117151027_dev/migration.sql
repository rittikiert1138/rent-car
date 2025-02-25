/*
  Warnings:

  - You are about to drop the column `lotto_type_id` on the `lotto` table. All the data in the column will be lost.
  - You are about to drop the `lotto_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `lotto` DROP FOREIGN KEY `lotto_lotto_type_id_fkey`;

-- AlterTable
ALTER TABLE `lotto` DROP COLUMN `lotto_type_id`;

-- DropTable
DROP TABLE `lotto_type`;
