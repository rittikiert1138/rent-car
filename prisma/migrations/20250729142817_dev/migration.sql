/*
  Warnings:

  - You are about to drop the `lotto_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `lotto` DROP FOREIGN KEY `lotto_lotto_type_id_fkey`;

-- DropIndex
DROP INDEX `lotto_lotto_type_id_fkey` ON `lotto`;

-- DropTable
DROP TABLE `lotto_type`;
