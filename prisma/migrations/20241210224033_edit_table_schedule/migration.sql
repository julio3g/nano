-- DropForeignKey
ALTER TABLE "fortnights" DROP CONSTRAINT "fortnights_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "fortnights" DROP CONSTRAINT "fortnights_payer_id_fkey";

-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_fortnight_id_fkey";

-- AlterTable
ALTER TABLE "schedules" ALTER COLUMN "morning" SET DEFAULT false,
ALTER COLUMN "afternoon" SET DEFAULT false,
ALTER COLUMN "overtime" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_fortnight_id_fkey" FOREIGN KEY ("fortnight_id") REFERENCES "fortnights"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fortnights" ADD CONSTRAINT "fortnights_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fortnights" ADD CONSTRAINT "fortnights_payer_id_fkey" FOREIGN KEY ("payer_id") REFERENCES "payers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
