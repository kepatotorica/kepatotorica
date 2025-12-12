'use client'
import { button } from "@nextui-org/theme"
import { useEffect, useState } from "react"
import { Link, Spacer } from "@nextui-org/react"

import PocketBase, { BaseAuthStore } from "pocketbase"

import { Contribution } from "./Contribution"
import ContributionTable from "./ContributionTable"
import ContributionEditor from "./ContributionEditor"
import { ContributionSummary } from "./ContributionSummary"
import { deleteContribution, getContributions, postContribution } from "./Requests"
const pb = new PocketBase('https://kepatotorica.pockethost.io/')

export default function RetirementCalculatorPage() {
  const [authStore, setAuthStore] = useState<BaseAuthStore>()
  const [contributions, setContributions] = useState<Contribution[]>([])
  const getAuth = async () => pb.authStore.isValid && pb.authStore.record && setAuthStore(pb.authStore)

  const buildContributions = async () => {
    setContributions(await getContributions(pb))
  }

  useEffect(() => {
    getAuth()
  }, [])

  useEffect(() => {
    buildContributions()
  }, [authStore])

  const addContribution = async (contribution: Contribution) => {
    const contributionWithId = await postContribution(pb, contribution)
    if (contributionWithId) {
      setContributions(prevContributions => [...prevContributions, contributionWithId])
    }
  }

  const removeContribution = async (index: number) => {
    await deleteContribution(pb, contributions[index])
    setContributions(contributions.filter((_, i) => i !== index))
  }

  return <>
    <div className="pb-8 text-center justify-center">
      {authStore && authStore.record ?
        <span className="text-3xl"> Info Saved for:{" "}
          <span className={"text-orange-400"}>{authStore.record.email}</span>
        </span>
        :
        <Link
          className={button({
            variant: "shadow",
            // radius: "full",
            color: "primary",
          })}
          href={"/account?route=retirement"}
        >
          To save your progress try logging in through the account tab!
        </Link>
      }
    </div>
    <ContributionEditor onAdd={addContribution} />
    <ContributionTable
      className="text-orange-400"
      contributions={contributions} onRemove={removeContribution}
    />
    <ContributionSummary contributions={contributions} />
    <Spacer y={96} />
  </>
}
