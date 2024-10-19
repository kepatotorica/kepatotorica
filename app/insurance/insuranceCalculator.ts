import { InsurancePlan } from "./InsurancePlan";

export function calculateInsuranceCost(
  plan: InsurancePlan,
  numberOfVisits: number,
  expectedAnnualMedicalExpenses: number
): number {
  const annualPremium = plan.pricePerMonth * 12;
  let deductibleCost = Math.min(plan.deductible, expectedAnnualMedicalExpenses);

  let postDeductibleExpenses = expectedAnnualMedicalExpenses - plan.deductible;

  let coinsuranceCost = postDeductibleExpenses > 0 ? postDeductibleExpenses * plan.coinsurance: 0

  let totalOutOfPocketCost = Math.min(plan.maxOutOfPocket, deductibleCost + coinsuranceCost);

  let totalCopays = numberOfVisits * plan.copayPerVisit;

  let finalOutOfPocketCost = totalOutOfPocketCost + totalCopays - plan.companyHsaContribution;

  const totalAnnualCost = annualPremium + finalOutOfPocketCost;

  return totalAnnualCost;
}