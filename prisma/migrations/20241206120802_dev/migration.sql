/*
  Warnings:

  - You are about to drop the column `bet_result` on the `member_lotto_list` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `member_lotto_list` DROP COLUMN `bet_result`,
    ADD COLUMN `bet_pay_result` DOUBLE NULL;
