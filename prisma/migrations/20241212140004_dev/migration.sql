-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL,
    `createdBy` INTEGER NOT NULL,
    `updatedBy` INTEGER NOT NULL,
    `user_path` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_phone_key`(`phone`),
    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_user_path_key`(`user_path`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Member` (
    `member_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL,
    `attemp` INTEGER NOT NULL DEFAULT 0,
    `phone` VARCHAR(10) NOT NULL,
    `balance` DOUBLE NOT NULL DEFAULT 0,
    `total_bet` DOUBLE NOT NULL DEFAULT 0,
    `isLogin` INTEGER NOT NULL DEFAULT 0,
    `user_id` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Member_username_key`(`username`),
    UNIQUE INDEX `Member_phone_key`(`phone`),
    PRIMARY KEY (`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `transaction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_type` INTEGER NOT NULL,
    `transaction_status` INTEGER NOT NULL,
    `transaction_slip` VARCHAR(191) NULL,
    `balance` DOUBLE NOT NULL DEFAULT 0,
    `member_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MemberBank` (
    `member_bank_id` INTEGER NOT NULL AUTO_INCREMENT,
    `bank_type` INTEGER NOT NULL,
    `bank_name` VARCHAR(191) NOT NULL,
    `bank_number` VARCHAR(191) NOT NULL,
    `bank_account_name` VARCHAR(191) NOT NULL,
    `member_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`member_bank_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bank` (
    `bank_id` INTEGER NOT NULL AUTO_INCREMENT,
    `bank_type` INTEGER NOT NULL,
    `bank_name` VARCHAR(191) NOT NULL,
    `bank_number` VARCHAR(191) NOT NULL,
    `bank_account_name` VARCHAR(191) NOT NULL,
    `bank_status` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`bank_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `otp_system` (
    `otp_id` INTEGER NOT NULL AUTO_INCREMENT,
    `otp` VARCHAR(191) NOT NULL,
    `ref` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(10) NOT NULL,
    `expired` DATETIME(3) NOT NULL,

    PRIMARY KEY (`otp_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lotto_type` (
    `lotto_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lotto_type_name` VARCHAR(191) NOT NULL,
    `lotto_type_status` INTEGER NOT NULL,
    `lotto_type_icon` VARCHAR(191) NULL,
    `lotto_type_color` VARCHAR(191) NULL,
    `order_seq` INTEGER NULL,
    `lotto_type_width` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `lotto_type_lotto_type_name_key`(`lotto_type_name`),
    PRIMARY KEY (`lotto_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lotto` (
    `lotto_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lotto_type_id` INTEGER NOT NULL,
    `period` VARCHAR(191) NOT NULL,
    `open_time` VARCHAR(191) NOT NULL,
    `close_time` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`lotto_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lotto_limit` (
    `lotto_limit_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lotto_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `user_id` INTEGER NULL,

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

-- CreateTable
CREATE TABLE `lotto_result` (
    `lotto_result_id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `lotto_id` INTEGER NOT NULL,

    PRIMARY KEY (`lotto_result_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `member_lotto` (
    `member_lotto_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lotto_id` INTEGER NOT NULL,
    `member_id` INTEGER NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`member_lotto_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `member_lotto_list` (
    `member_lotto_list_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lotto_id` INTEGER NOT NULL,
    `member_id` INTEGER NOT NULL,
    `bet_type` INTEGER NOT NULL,
    `bet_number` VARCHAR(191) NOT NULL,
    `bet_amount` DOUBLE NOT NULL,
    `bet_status` INTEGER NOT NULL,
    `bet_pay` DOUBLE NULL,
    `bet_pay_result` DOUBLE NULL,
    `bet_number_result` VARCHAR(191) NULL,
    `member_lotto_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`member_lotto_list_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Banner` (
    `banner_id` INTEGER NOT NULL AUTO_INCREMENT,
    `banner_image` VARCHAR(191) NOT NULL,
    `banner_status` INTEGER NOT NULL,
    `order_seq` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`banner_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `flash_news` (
    `flash_news_id` INTEGER NOT NULL AUTO_INCREMENT,
    `flash_news_content` VARCHAR(191) NOT NULL,
    `flash_news_status` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`flash_news_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Member`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberBank` ADD CONSTRAINT `MemberBank_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Member`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lotto` ADD CONSTRAINT `lotto_lotto_type_id_fkey` FOREIGN KEY (`lotto_type_id`) REFERENCES `lotto_type`(`lotto_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lotto_limit` ADD CONSTRAINT `lotto_limit_lotto_id_fkey` FOREIGN KEY (`lotto_id`) REFERENCES `lotto`(`lotto_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lotto_limit` ADD CONSTRAINT `lotto_limit_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lotto_limit_list` ADD CONSTRAINT `lotto_limit_list_lotto_limit_id_fkey` FOREIGN KEY (`lotto_limit_id`) REFERENCES `lotto_limit`(`lotto_limit_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lotto_result` ADD CONSTRAINT `lotto_result_lotto_id_fkey` FOREIGN KEY (`lotto_id`) REFERENCES `lotto`(`lotto_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lotto_result_list` ADD CONSTRAINT `lotto_result_list_lotto_result_id_fkey` FOREIGN KEY (`lotto_result_id`) REFERENCES `lotto_result`(`lotto_result_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_lotto` ADD CONSTRAINT `member_lotto_lotto_id_fkey` FOREIGN KEY (`lotto_id`) REFERENCES `lotto`(`lotto_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_lotto` ADD CONSTRAINT `member_lotto_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Member`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_lotto_list` ADD CONSTRAINT `member_lotto_list_member_lotto_id_fkey` FOREIGN KEY (`member_lotto_id`) REFERENCES `member_lotto`(`member_lotto_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
