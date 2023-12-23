-- CreateTable
CREATE TABLE "Scene" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Dialog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "speaker" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sceneId" TEXT
);

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "actionId" TEXT NOT NULL,
    "sceneId" TEXT,
    CONSTRAINT "Action_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_DialogToScene" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_DialogToScene_A_fkey" FOREIGN KEY ("A") REFERENCES "Dialog" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DialogToScene_B_fkey" FOREIGN KEY ("B") REFERENCES "Scene" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ActionToScene" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ActionToScene_A_fkey" FOREIGN KEY ("A") REFERENCES "Action" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ActionToScene_B_fkey" FOREIGN KEY ("B") REFERENCES "Scene" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_DialogToScene_AB_unique" ON "_DialogToScene"("A", "B");

-- CreateIndex
CREATE INDEX "_DialogToScene_B_index" ON "_DialogToScene"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActionToScene_AB_unique" ON "_ActionToScene"("A", "B");

-- CreateIndex
CREATE INDEX "_ActionToScene_B_index" ON "_ActionToScene"("B");
