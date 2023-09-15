-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "deparmentId" TEXT,
    CONSTRAINT "File_deparmentId_fkey" FOREIGN KEY ("deparmentId") REFERENCES "Department" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "department" TEXT NOT NULL,
    "semester" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "File_name_key" ON "File"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Department_department_key" ON "Department"("department");
