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

-- AddForeignKey
ALTER TABLE `MemberBank` ADD CONSTRAINT `MemberBank_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Member`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
