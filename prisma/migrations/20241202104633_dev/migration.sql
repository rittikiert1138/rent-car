/*
  Warnings:

  - You are about to drop the column `lotto_type` on the `lotto` table. All the data in the column will be lost.
  - Added the required column `lotto_type_id` to the `lotto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `open_time` to the `lotto` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `lotto_lotto_type_key` ON `lotto`;

-- AlterTable
ALTER TABLE `lotto` DROP COLUMN `lotto_type`,
    ADD COLUMN `lotto_type_id` INTEGER NOT NULL,
    ADD COLUMN `open_time` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `lotto` ADD CONSTRAINT `lotto_lotto_type_id_fkey` FOREIGN KEY (`lotto_type_id`) REFERENCES `lotto_type`(`lotto_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_lotto` ADD CONSTRAINT `member_lotto_lotto_id_fkey` FOREIGN KEY (`lotto_id`) REFERENCES `lotto`(`lotto_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
