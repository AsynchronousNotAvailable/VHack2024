import { RepeatOption } from "@prisma/client";

export class CreateBillDto {
    name: string;
    amount: number;
    repeating_option: RepeatOption;
    userId: number;
}
