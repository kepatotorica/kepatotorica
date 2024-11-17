'use client'

import { useState } from "react";
import { Spacer } from "@nextui-org/react";

import { Contribution } from "./Contribution";
import ContributionTable from "./ContributionTable";
import ContributionEditor from "./ContributionEditor";
import { fakeContributions } from "./FakeContributions";
import { ContributionsMonthlySummary } from "./ContributionsMonthlySummary";

export default function RetirementCalculatorPage() {
  const [contributions, setContributions] = useState<Contribution[]>(fakeContributions)

  const addContribution = (contribution: Contribution) => setContributions(prevContributions => [...prevContributions, contribution]);
  const removePlan = (index: number) => setContributions(contributions.filter((_, i) => i !== index));

  return <>
    <ContributionEditor onAdd={addContribution} />
    <ContributionTable
      className="text-orange-400"
      contributions={contributions} onRemove={removePlan}
    />
    <ContributionsMonthlySummary contributions={contributions} />
    <Spacer y={96} />
  </>;
}
