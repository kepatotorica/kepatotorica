import { Contribution, ContributionFrequency, contributionType as ContributionType } from "./Contribution";

const myCheck = 2603
const spouseCheck = 2697

export const fakeContributions: Contribution[] = [
    {
      name: "Pay 1", //"payPerMonthKepa",
      amount: myCheck,
      frequency: ContributionFrequency.Biweekly,
      type: ContributionType.CheckIncome,
    },
    {
      name: "Pay2", //"payPerMonthFitri",
      amount: spouseCheck,
      frequency: ContributionFrequency.Biweekly,
      type: ContributionType.CheckIncome,
    },
    { name: 'Mortgage 1', //6610
       amount: 3272,
      frequency: ContributionFrequency.Monthly,
      type: ContributionType.Housing,
     },
    {
      name: 'HOA 1', //6610
      amount: 430 * 2,
      frequency: ContributionFrequency.Annually,
      type: ContributionType.Housing,
    },
    {
      name: 'Mortgage 2', //Gekeler
      amount: 1038,
      frequency: ContributionFrequency.Monthly,
      type: ContributionType.Housing,
    },
    { name: 'HOA 2', //Gekeler
      amount: 334,
      frequency: ContributionFrequency.Monthly,
      type: ContributionType.Housing
    },
    {
      name: "Rental",
      amount: 1500,
      frequency: ContributionFrequency.Monthly,
      type: ContributionType.OtherIncome,
    },
    {
      name: 'Internet',
      amount: 65,
      frequency: ContributionFrequency.Monthly,
      type: ContributionType.Bill,
    },
    {
      name: 'Insurance',
      amount: 90,
      frequency: ContributionFrequency.Monthly,
      type: ContributionType.Bill,
    },
    {
      name: 'Misc Spending',
      amount: 250,
      frequency: ContributionFrequency.Monthly,
      type: ContributionType.Bill,
    },
    {
      name: 'General Investments',
      amount: 2000,
      frequency: ContributionFrequency.Monthly,
      type: ContributionType.PostTaxInvestment,
    },

    {
      name: 'Traditional IRA',
      amount: 14000, //7k each for roth ira backdoor
      frequency: ContributionFrequency.Annually,
      type: ContributionType.PostTaxInvestment,
    },
    {
      name: 'My 401k',
      amount: 807.92,
      frequency: ContributionFrequency.Biweekly,
      type: ContributionType.PreTaxInvestment,
    },
    {
      name: 'My HSA',
      amount: 155.7,
      frequency: ContributionFrequency.Biweekly,
      type: ContributionType.PreTaxInvestment,
    },
    {
      name: 'Spouse 401k',
      amount: 494.16,
      frequency: ContributionFrequency.Biweekly,
      type: ContributionType.PreTaxInvestment,
    },
    {
      name: 'Spouse HSA',
      amount: 122.91,
      frequency: ContributionFrequency.Biweekly,
      type: ContributionType.PreTaxInvestment,
    },
    {
      name: 'My ESPP',
      amount: myCheck * 0.1,
      frequency: ContributionFrequency.Biweekly,
      type: ContributionType.EmployeeStock,
    },
    {
      name: 'Spouse ESPP',
      amount: spouseCheck * 0.1,
      frequency: ContributionFrequency.Biweekly,
      type: ContributionType.EmployeeStock,
    },
    {
      name: 'My RSU',
      amount: (((45 + 55 + 45 + 51) * 1000 ) / 4) *.66 * .6, //30% drop in stock price, 30% to taxes
      frequency: ContributionFrequency.Annually,
      type: ContributionType.EmployeeStock,
    },
    {
      name: 'Spouse RSU',
      amount: (((40 + 45 + 40 + 31) * 1000) / 4) *.66 * .6, //30% drop in stock price, 30% to taxes
      frequency: ContributionFrequency.Annually,
      type: ContributionType.EmployeeStock,
    },
  ];
