import { logo } from '../../../styles/GlobalStyles';

export const mockData1 = [
    {
        image: logo.home_logo,
        backgroundColor: '#FDD5D7',
        itemName: 'House Loan',
        expiryDate: '20/3/2044',
        currentLoan: 250000,
        totalLoan: 350000,
        index: 1,
    },
    {
        image: logo.car_logo,
        backgroundColor: '#BDDCFF',
        itemName: 'Car Loan',
        expiryDate: '01/03/2026',
        currentLoan: 15000,
        totalLoan: 350000,
        index: 2,
    },
];

export const mockData2 = [
    {
        image: logo.home_logo,
        backgroundColor: '#FDD5D7',
        itemName: 'House Loan',
        paymentDate: '20/04',
        upcomingBills: 1571.66,
        index: 1,
    },
    {
        image: logo.car_logo,
        backgroundColor: '#BDDCFF',
        itemName: 'Car Loan',
        paymentDate: '22/04',
        upcomingBills: 55.03,
        index: 2,
    },
    {
        image: logo.tnb_logo,
        backgroundColor: '#FCEED4',
        itemName: 'Electric Bill',
        paymentDate: '30/04',
        upcomingBills: 252.56,
        index: 3,
    },
    {
        image: logo.unifi_logo,
        backgroundColor: '#FCEED4',
        itemName: 'Unifi Wifi',
        paymentDate: '30/04',
        upcomingBills: 159.05,
        index: 4,
    },
]

export const mockData3 = [
    {
        image: logo.repayment_plan_summary_logo_1,
        itemName: 'Payoff',
        firstTitle: 'Next debt',
        firstContent: '5 yr 9 mo',
        secondTitle: 'All debts',
        secondContent: '5 yr 9 mo',
        index: 1,
    },
    {
        image: logo.repayment_plan_summary_logo_2,
        itemName: 'Interest',
        firstTitle: 'Next 30 days',
        firstContent: 'RM 0.00',
        secondTitle: 'Total',
        secondContent: 'RM 230.50',
        index: 2,
    },
    {
        image: logo.repayment_plan_summary_logo_3,
        itemName: 'Payments',
        firstTitle: 'Next 30 days',
        firstContent: 'RM 0.00',
        secondTitle: 'Total',
        secondContent: 'RM 477.70',
        index: 3,
    },
]

export const mockData4 = [
    {
        title: 'Debt Snowball',
        content1: 'Prioritize lowest balance first',
        content2: 'The most quick wins',
        content3: 'Time to first debt paid off:',
        content4: 'Time to all debt paid off:',
        content5: 'Interest saved:',
        index: 1,
    },
    {
        title: 'Debt Avalanche',
        content1: 'Prioritize lowest balance first',
        content2: 'The most quick wins',
        content3: 'Time to first debt paid off:',
        content4: 'Time to all debt paid off:',
        content5: 'Interest saved:',
        index: 2,
    },
]