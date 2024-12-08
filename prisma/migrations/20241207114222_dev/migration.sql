/*
  Warnings:

  - You are about to drop the column `lotto_type_id` on the `lotto_result` table. All the data in the column will be lost.
  - Added the required column `lotto_id` to the `lotto_result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lotto_result` DROP COLUMN `lotto_type_id`,
    ADD COLUMN `lotto_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `lotto_result_list` (
    `lotto_result_list_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lotto_result_id` INTEGER NOT NULL,
    `lotto_result_type` INTEGER NOT NULL,
    `lotto_result_number` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`lotto_result_list_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `lotto_result` ADD CONSTRAINT `lotto_result_lotto_id_fkey` FOREIGN KEY (`lotto_id`) REFERENCES `lotto`(`lotto_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lotto_result_list` ADD CONSTRAINT `lotto_result_list_lotto_result_id_fkey` FOREIGN KEY (`lotto_result_id`) REFERENCES `lotto_result`(`lotto_result_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
