import { calculateInsuranceCost } from "./insuranceCalculator";
import { InsurancePlan } from "./InsurancePlan";


describe('calculateInsuranceCost', () => {
  const plan: InsurancePlan = {
    name: "High Deductible",
    pricePerMonth: 24.26,
    deductible: 3500,
    maxOutOfPocket: 5000,
    coinsurance: 10,
    companyHsaContribution: 700,
    copayPerVisit: 0,
  };

  test('should calculate total annual cost correctly for basic valid input', () => {
    const totalCost = calculateInsuranceCost(plan, 5, plan.maxOutOfPocket * 100);

    expect(totalCost).toBe(plan.maxOutOfPocket + plan.pricePerMonth * 12 - plan.companyHsaContribution + 5 * plan.copayPerVisit);
  });

  test('should handle case where medical expenses equal deductible and max out of pocket', () => {
    const totalCost = calculateInsuranceCost(plan, 0, plan.deductible);

    expect(totalCost).toBe(plan.deductible + plan.pricePerMonth * 12 - plan.companyHsaContribution);
  });

  test('should return annual premium minus HSA when there are no visits', () => {
    const totalCost = calculateInsuranceCost(plan, 0, 0);

    expect(totalCost).toBe(plan.pricePerMonth * 12 - plan.companyHsaContribution);
  });

  test('should return zero if all plan costs are zero', () => {
    const zeroPlan: InsurancePlan = {
      name: 'Zero Plan',
      pricePerMonth: 0,
      deductible: 0,
      maxOutOfPocket: 0,
      coinsurance: 0,
      companyHsaContribution: 0,
      copayPerVisit: 0,
    };
    const totalCost = calculateInsuranceCost(zeroPlan, 0, 0);

    expect(totalCost).toBe(0);
  });

  test('should cap total cost at max out-of-pocket - HSA + number of visits + pricePerMonth * 12', () => {
    const totalCost = calculateInsuranceCost(plan, 5, 10000000);

    expect(totalCost).toBe(plan.maxOutOfPocket - plan.companyHsaContribution + plan.copayPerVisit * 5 + plan.pricePerMonth * 12);
  });
});
