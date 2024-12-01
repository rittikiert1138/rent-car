/*
  Warnings:

  - You are about to drop the column `createdAt` on the `lotto` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `lotto` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `member` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `member` table. All the data in the column will be lost.
  - You are about to drop the column `bet_amount` on the `member_lotto` table. All the data in the column will be lost.
  - You are about to drop the column `bet_number` on the `member_lotto` table. All the data in the column will be lost.
  - You are about to drop the column `bet_status` on the `member_lotto` table. All the data in the column will be lost.
  - You are about to drop the column `bet_type` on the `member_lotto` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `member_lotto` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - Added the required column `updated` to the `Bank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `lotto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `member_lotto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `MemberBank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bank` ADD COLUMN `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `lotto` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `member` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `member_lotto` DROP COLUMN `bet_amount`,
    DROP COLUMN `bet_number`,
    DROP COLUMN `bet_status`,
    DROP COLUMN `bet_type`,
    DROP COLUMN `createdAt`,
    ADD COLUMN `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `memberbank` ADD COLUMN `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `member_lotto_list` (
    `member_lotto_list_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lotto_id` INTEGER NOT NULL,
    `member_id` INTEGER NOT NULL,
    `bet_type` INTEGER NOT NULL,
    `bet_number` VARCHAR(191) NOT NULL,
    `bet_amount` DOUBLE NOT NULL,
    `bet_status` INTEGER NOT NULL,
    `member_lotto_id` INTEGER NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL,

    PRIMARY KEY (`member_lotto_list_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `member_lotto_list` ADD CONSTRAINT `member_lotto_list_member_lotto_id_fkey` FOREIGN KEY (`member_lotto_id`) REFERENCES `member_lotto`(`member_lotto_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
