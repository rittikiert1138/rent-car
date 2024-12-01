-- CreateTable
CREATE TABLE `lotto_group` (
    `lotto_group_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lotto_group_name` VARCHAR(191) NOT NULL,
    `lotto_group_status` INTEGER NOT NULL,
    `lotto_group_icon` VARCHAR(191) NULL,
    `lotto_group_color` VARCHAR(191) NULL,
    `order_seq` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `lotto_group_lotto_group_name_key`(`lotto_group_name`),
    PRIMARY KEY (`lotto_group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
