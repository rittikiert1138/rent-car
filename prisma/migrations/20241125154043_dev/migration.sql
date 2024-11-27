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
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_phone_key`(`phone`),
    UNIQUE INDEX `User_username_key`(`username`),
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
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `user_id` INTEGER NULL,

    UNIQUE INDEX `Member_username_key`(`username`),
    UNIQUE INDEX `Member_phone_key`(`phone`),
    PRIMARY KEY (`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lotto` (
    `lotto_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lotto_type` VARCHAR(191) NOT NULL,
    `close_time` DATETIME(3) NOT NULL,
    `period` INTEGER NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 0,
    `createdBy` INTEGER NOT NULL,
    `updatedBy` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`lotto_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `transaction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_type` INTEGER NOT NULL,
    `transaction_status` INTEGER NOT NULL,
    `transaction_slip` VARCHAR(191) NULL,
    `balance` DOUBLE NOT NULL DEFAULT 0,
    `member_id` INTEGER NOT NULL,

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

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lotto` ADD CONSTRAINT `Lotto_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Member`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberBank` ADD CONSTRAINT `MemberBank_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Member`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
