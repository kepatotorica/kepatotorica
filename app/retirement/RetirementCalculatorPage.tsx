'use client'
import { button } from "@nextui-org/theme"
import { useEffect, useState } from "react"
import { Link, Spacer } from "@nextui-org/react"

import { usePocketBase } from "../state/usePocketBase"

import { Contribution } from "./Contribution"
import ContributionTable from "./ContributionTable"
import ContributionEditor from "./ContributionEditor"
import { fakeContributions } from "./FakeContributions"
import { ContributionSummary } from "./ContributionSummary"


export default function RetirementCalculatorPage() {
  const pb = usePocketBase()

  const [contributions, setContributions] = useState<Contribution[]>([])

  useEffect(() => {
    if (pb.authStore?.record?.email === "kepatoto@gmail.com") {
      const ourContributions = fakeContributions
        .map(contribution => {
          return {
            ...contribution,
            amount: Math.round(contribution.amount)
          }
        })

      setContributions(ourContributions)
    }
  }, [pb.authStore])

  const addContribution = (contribution: Contribution) => setContributions(prevContributions => [...prevContributions, contribution])
  const removePlan = (index: number) => setContributions(contributions.filter((_, i) => i !== index))

  return <>
    <div className="pb-8 text-center justify-center">
      {pb.authStore && pb.authStore.record ?
        <span className="text-3xl"> Info Saved for:{" "}
          <span className={"text-orange-400"}>{pb.authStore.record.email}</span>
        </span>
        :
        <Link
          className={button({
            variant: "shadow",
            // radius: "full",
            color: "primary",
          })}
          href={"/account"}
        >
          To save your progress try logging in through the account tab!
        </Link>
      }
    </div>
    <ContributionEditor onAdd={addContribution} />
    <ContributionTable
      className="text-orange-400"
      contributions={contributions} onRemove={removePlan}
    />
    <ContributionSummary contributions={contributions} />
    <Spacer y={96} />
  </>
}
