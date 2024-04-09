import { AccountType, TransactionCategory, TransactionType } from "@prisma/client";

export class CreateTransactionDto {
    date: Date;
    account: AccountType;
    category: TransactionCategory;
    description: string;
    amount: number;
    type: TransactionType;
    userId: number;

}
