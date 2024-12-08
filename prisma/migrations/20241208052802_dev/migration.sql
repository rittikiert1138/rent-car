-- AlterTable
ALTER TABLE `lotto_limit` ADD COLUMN `user_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `lotto_limit` ADD CONSTRAINT `lotto_limit_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
