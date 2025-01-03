"use client"

import { useState } from 'react'
import { Spacer } from '@nextui-org/react'

import { InsurancePlan } from './InsurancePlan'
import InsurancePlanList from './InsurancePlanList'
import AddInsurancePlan from './AddInsurancePlan'
import ComparisonGraph from './ComparisonGraph'

export default function InsuranceCalculator() {
  const [visits, setVisits] = useState<number>(1)
  const [plans, setPlans] = useState<InsurancePlan[]>([
    {
      name: "High Deductible",
      pricePerMonth: 24.26,
      deductible: 3500,
      maxOutOfPocket: 5000,
      coinsurance: 10,
      companyHsaContribution: 700,
      copayPerVisit: 0,
    },
    {
      name: "High Deductible 2",
      pricePerMonth: 37.53,
      deductible: 2500,
      maxOutOfPocket: 5000,
      coinsurance: 20,
      companyHsaContribution: 350,
      copayPerVisit: 0,
    },
    {
      name: "Traditional PPO",
      pricePerMonth: 72.34,
      deductible: 1000,
      maxOutOfPocket: 3000,
      coinsurance: 25,
      companyHsaContribution: 0,
      copayPerVisit: 30,
    },
  ])

  const addPlan = (plan: InsurancePlan) => {
    setPlans([...plans, plan])
  }

  const removePlan = (index: number) => {
    setPlans(plans.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className='text-2xl p-10 text-center'>
        A very simple calculator to see how much you might pay with insurance plans.
      </div>

      <AddInsurancePlan onAdd={addPlan} />
      <InsurancePlanList className="text-orange-400" plans={plans} onRemove={removePlan} />
      <ComparisonGraph plans={plans} visits={visits} />
      <Spacer y={96} />
    </div>
  )
}