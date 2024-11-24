/*
  Warnings:

  - You are about to drop the column `user_id` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `member_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_user_id_fkey`;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `user_id`,
    ADD COLUMN `member_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Member`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
