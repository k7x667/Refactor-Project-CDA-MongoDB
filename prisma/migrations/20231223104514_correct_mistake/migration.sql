/*
  Warnings:

  - You are about to drop the `_ActionToScene` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `sceneId` on the `Action` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "_ActionToScene_B_index";

-- DropIndex
DROP INDEX "_ActionToScene_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ActionToScene";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_@belongsTo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_@belongsTo_A_fkey" FOREIGN KEY ("A") REFERENCES "Action" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_@belongsTo_B_fkey" FOREIGN KEY ("B") REFERENCES "Scene" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Action" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "actionId" TEXT NOT NULL,
    CONSTRAINT "Action_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Scene" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Action" ("actionId", "content", "id", "type") SELECT "actionId", "content", "id", "type" FROM "Action";
DROP TABLE "Action";
ALTER TABLE "new_Action" RENAME TO "Action";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_@belongsTo_AB_unique" ON "_@belongsTo"("A", "B");

-- CreateIndex
CREATE INDEX "_@belongsTo_B_index" ON "_@belongsTo"("B");
