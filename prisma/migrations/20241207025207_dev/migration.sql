-- CreateTable
CREATE TABLE `lotto_result` (
    `lotto_result_id` INTEGER NOT NULL AUTO_INCREMENT,
    `lotto_type_id` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`lotto_result_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Banner` (
    `banner_id` INTEGER NOT NULL AUTO_INCREMENT,
    `banner_name` VARCHAR(191) NOT NULL,
    `banner_image` VARCHAR(191) NOT NULL,
    `banner_status` INTEGER NOT NULL,
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
