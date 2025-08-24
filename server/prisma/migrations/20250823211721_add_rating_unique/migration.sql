/*
  Warnings:

  - A unique constraint covering the columns `[userId,storeId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Rating_userId_storeId_key" ON "public"."Rating"("userId", "storeId");

-- CreateIndex
CREATE INDEX "Store_name_idx" ON "public"."Store"("name");

-- CreateIndex
CREATE INDEX "Store_email_idx" ON "public"."Store"("email");

-- CreateIndex
CREATE INDEX "User_name_idx" ON "public"."User"("name");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "public"."User"("email");
