/*
  Warnings:

  - You are about to drop the column `followed_id` on the `follows` table. All the data in the column will be lost.
  - You are about to drop the column `following_id` on the `follows` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[followerId,followingId]` on the table `follows` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `followerId` to the `follows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingId` to the `follows` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `follows` DROP COLUMN `followed_id`,
    DROP COLUMN `following_id`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `followerId` INTEGER NOT NULL,
    ADD COLUMN `followingId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tweets` MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `follows_followerId_followingId_key` ON `follows`(`followerId`, `followingId`);

-- AddForeignKey
ALTER TABLE `follows` ADD CONSTRAINT `follows_followerId_fkey` FOREIGN KEY (`followerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `follows` ADD CONSTRAINT `follows_followingId_fkey` FOREIGN KEY (`followingId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tweets` ADD CONSTRAINT `tweets_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
