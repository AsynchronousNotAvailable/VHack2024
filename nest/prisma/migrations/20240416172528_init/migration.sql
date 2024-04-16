-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "TransactionCategory" AS ENUM ('SHOPPING', 'HOUSING', 'TRANSPORTATION', 'EDUCATION', 'HEALTH', 'ENTERTAINMENT', 'FOOD', 'SALARY', 'SCHOLARSHIP', 'GIFTS', 'OTHER');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'E_WALLET');

-- CreateEnum
CREATE TYPE "RepeatOption" AS ENUM ('DAILY', 'MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "StrategyType" AS ENUM ('AVALANCHE', 'SNOWBALL');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('DEBTOR', 'CONSULTANT');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAID', 'UNPAID');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "monthly_income" DOUBLE PRECISION,
    "monthly_payment" DOUBLE PRECISION,
    "monthly_loan" DOUBLE PRECISION,
    "debt_free_date" TIMESTAMP(3),
    "strategy" "StrategyType",
    "username" TEXT NOT NULL,
    "user_type" "UserType" NOT NULL DEFAULT 'DEBTOR',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "loan_amount" DOUBLE PRECISION NOT NULL,
    "installment_month" INTEGER NOT NULL,
    "payment_remaining" INTEGER NOT NULL,
    "interest_rate" DOUBLE PRECISION NOT NULL,
    "loan_status" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "userId" INTEGER NOT NULL,
    "repayment_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "repeating_option" "RepeatOption" NOT NULL,
    "bill_status" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "userId" INTEGER NOT NULL,
    "repayment_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "account" "AccountType" NOT NULL,
    "category" "TransactionCategory" NOT NULL,
    "description" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "TransactionType" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budget" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" "TransactionCategory" NOT NULL,
    "account" "AccountType" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Consultant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "consultantId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_consultantId_fkey" FOREIGN KEY ("consultantId") REFERENCES "Consultant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
