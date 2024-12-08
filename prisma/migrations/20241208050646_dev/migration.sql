-- AlterTable
ALTER TABLE `member` ADD COLUMN `isLogin` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `lotto_limit` (
    `lotto_limit_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lotto_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`lotto_limit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lotto_limit_list` (
    `lotto_limit_list_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lotto_limit_id` INTEGER NOT NULL,
    `limit_number` VARCHAR(191) NOT NULL,
    `limit_amount` DOUBLE NOT NULL,
    `bet_type` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`lotto_limit_list_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `lotto_limit` ADD CONSTRAINT `lotto_limit_lotto_id_fkey` FOREIGN KEY (`lotto_id`) REFERENCES `lotto`(`lotto_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lotto_limit_list` ADD CONSTRAINT `lotto_limit_list_lotto_limit_id_fkey` FOREIGN KEY (`lotto_limit_id`) REFERENCES `lotto_limit`(`lotto_limit_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
