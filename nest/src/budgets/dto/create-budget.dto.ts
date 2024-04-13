import { AccountType, TransactionCategory } from "@prisma/client";

export class CreateBudgetDto {
    name: string;
    amount: number;
    category: TransactionCategory;
    account: AccountType;
    userId: number;
}
