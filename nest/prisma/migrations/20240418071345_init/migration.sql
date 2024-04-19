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
CREATE TABLE "user" (
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
    "extra_payment" DOUBLE PRECISION,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loan" (
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

    CONSTRAINT "loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "repeating_option" "RepeatOption" NOT NULL,
    "bill_status" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "userId" INTEGER NOT NULL,
    "repayment_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" "TransactionCategory" NOT NULL,
    "account" "AccountType" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "designation" TEXT NOT NULL,

    CONSTRAINT "consultant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointment" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "consultantId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "account" "AccountType" NOT NULL,
    "category" "TransactionCategory" NOT NULL,
    "description" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "TransactionType" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill" ADD CONSTRAINT "bill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_consultantId_fkey" FOREIGN KEY ("consultantId") REFERENCES "consultant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
