import { StrategyType, UserType } from "@prisma/client";


export class CreateUserDto {
    email: string;
    username: string;
    password: string;
    monthly_income?: number;
    monthly_payment?: number;
    monthly_loan?: number;
    debt_free_date?: Date;
    strategy?: StrategyType;
}
