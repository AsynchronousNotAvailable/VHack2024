import { RepeatOption } from "@prisma/client";

export class CreateBillDto {
    name: string;
    amount: number;
    repayment_date: Date;
    repeating_option: RepeatOption;
    userId: number;
}
