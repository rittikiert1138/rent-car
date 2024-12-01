/*
  Warnings:

  - You are about to drop the `lotto_group` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `lotto_group`;

-- CreateTable
CREATE TABLE `lotto_type` (
    `lotto_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lotto_type_name` VARCHAR(191) NOT NULL,
    `lotto_type_status` INTEGER NOT NULL,
    `lotto_type_icon` VARCHAR(191) NULL,
    `lotto_type_color` VARCHAR(191) NULL,
    `order_seq` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `lotto_type_lotto_type_name_key`(`lotto_type_name`),
    PRIMARY KEY (`lotto_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
