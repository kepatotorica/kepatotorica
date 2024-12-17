'use client'
import { button } from "@nextui-org/theme";
import { useEffect, useState } from "react";
import { Link, Spacer } from "@nextui-org/react";
import { useAtom } from "jotai";

import { sessionAtom } from "../atoms/sessionAtom";

import { Contribution } from "./Contribution";
import ContributionTable from "./ContributionTable";
import ContributionEditor from "./ContributionEditor";
import { fakeContributions } from "./FakeContributions";
import { ContributionSummary } from "./ContributionSummary";



export default function RetirementCalculatorPage() {
  const [session, setSession] = useAtom(sessionAtom); //TODOASDF this doesn't seem to work (might just be live reload), it sometimes invalidates. Supabase may have a more elegant way to share this state.

  const [contributions, setContributions] = useState<Contribution[]>([])

  useEffect(() => {
    if (session?.user.email === "kepatoto@gmail.com") {
      const ourContributions = fakeContributions
        .map(contribution => {
          return {
            ...contribution,
            amount: Math.round(contribution.amount)
          }
        })

      setContributions(ourContributions)
    }
  }, [session])

  const addContribution = (contribution: Contribution) => setContributions(prevContributions => [...prevContributions, contribution]);
  const removePlan = (index: number) => setContributions(contributions.filter((_, i) => i !== index));

  return <>
    <div className="pb-8 text-center justify-center">
      {session ?
        <span className="text-3xl"> Info Saved for:{" "}
          <span className={"text-orange-400"}>{session?.user.email}</span>
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
  </>;
}
