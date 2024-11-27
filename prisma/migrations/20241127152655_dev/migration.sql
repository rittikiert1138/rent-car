/*
  Warnings:

  - A unique constraint covering the columns `[lotto_type]` on the table `lotto` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `lotto_lotto_type_key` ON `lotto`(`lotto_type`);
