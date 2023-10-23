-- CreateTable
CREATE TABLE "internship" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "SkillRequired" TEXT NOT NULL,
    "stipend" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL
);
