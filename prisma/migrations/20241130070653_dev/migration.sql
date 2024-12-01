/*
  Warnings:

  - You are about to drop the column `created` on the `bank` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `bank` table. All the data in the column will be lost.
  - You are about to drop the column `created` on the `lotto` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `lotto` table. All the data in the column will be lost.
  - You are about to drop the column `created` on the `member` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `member` table. All the data in the column will be lost.
  - You are about to drop the column `created` on the `member_lotto` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `member_lotto` table. All the data in the column will be lost.
  - You are about to drop the column `created` on the `member_lotto_list` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `member_lotto_list` table. All the data in the column will be lost.
  - You are about to drop the column `created` on the `memberbank` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `memberbank` table. All the data in the column will be lost.
  - You are about to drop the column `created` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `created` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `user` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Bank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `lotto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `member_lotto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `member_lotto_list` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `MemberBank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bank` DROP COLUMN `created`,
    DROP COLUMN `updated`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `lotto` DROP COLUMN `created`,
    DROP COLUMN `updated`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `member` DROP COLUMN `created`,
    DROP COLUMN `updated`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `member_lotto` DROP COLUMN `created`,
    DROP COLUMN `updated`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `member_lotto_list` DROP COLUMN `created`,
    DROP COLUMN `updated`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `memberbank` DROP COLUMN `created`,
    DROP COLUMN `updated`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `created`,
    DROP COLUMN `updated`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `created`,
    DROP COLUMN `updated`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
