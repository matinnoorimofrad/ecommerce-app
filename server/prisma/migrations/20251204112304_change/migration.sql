/*
  Warnings:

  - You are about to drop the column `console_id` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `game_id` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `consoles` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `consoles` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `consoles` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `consoles` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `console_id` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `game_id` on the `order_items` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_id]` on the table `consoles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_id]` on the table `games` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `consoles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genres` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."cart_items" DROP CONSTRAINT "cart_items_console_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."cart_items" DROP CONSTRAINT "cart_items_game_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."consoles" DROP CONSTRAINT "consoles_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."games" DROP CONSTRAINT "games_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."order_items" DROP CONSTRAINT "order_items_console_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."order_items" DROP CONSTRAINT "order_items_game_id_fkey";

-- AlterTable
ALTER TABLE "cart_items" DROP COLUMN "console_id",
DROP COLUMN "game_id",
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "consoles" DROP COLUMN "category_id",
DROP COLUMN "created_at",
DROP COLUMN "price",
DROP COLUMN "updated_at",
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "games" DROP COLUMN "category_id",
DROP COLUMN "created_at",
DROP COLUMN "price",
DROP COLUMN "updated_at",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "genres" TEXT NOT NULL,
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "console_id",
DROP COLUMN "game_id",
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "consoles_product_id_key" ON "consoles"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "games_product_id_key" ON "games"("product_id");

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consoles" ADD CONSTRAINT "consoles_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
