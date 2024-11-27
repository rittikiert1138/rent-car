/*
  Warnings:

  - You are about to drop the column `createdBy` on the `lotto` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `lotto` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `lotto` table. All the data in the column will be lost.
  - Changed the type of `period` on the `lotto` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE `lotto` DROP FOREIGN KEY `Lotto_createdBy_fkey`;

-- AlterTable
ALTER TABLE `lotto` DROP COLUMN `createdBy`,
    DROP COLUMN `status`,
    DROP COLUMN `updatedBy`,
    DROP COLUMN `period`,
    ADD COLUMN `period` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `member_lotto` (
    `member_lotto_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lotto_id` INTEGER NOT NULL,
    `member_id` INTEGER NOT NULL,
    `bet_type` INTEGER NOT NULL,
    `bet_number` VARCHAR(191) NOT NULL,
    `bet_amount` DOUBLE NOT NULL,
    `bet_status` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`member_lotto_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `member_lotto` ADD CONSTRAINT `member_lotto_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Member`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
