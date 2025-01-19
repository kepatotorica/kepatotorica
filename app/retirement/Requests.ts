import PocketBase from 'pocketbase'
import { Contribution } from './Contribution'


interface ContributionModel {
    name: string
    amount: number
    frequency: string
    type: string
    id: string
    userId: string
    updated: Date
}

export const getContributions = async (pb: PocketBase): Promise<Contribution[]> => {
    if (pb.authStore.isValid) {
        try {
            const dbContributions = await pb.collection('contributions').getFullList() as ContributionModel[]

            return dbContributions.map((dbContribution) => ({
                    id: dbContribution.id,
                    name: dbContribution.name,
                    amount: dbContribution.amount,
                    frequency: dbContribution.frequency,
                    type: dbContribution.type,
            }) as Contribution)
        } catch (error) {
            return []
        }
    }
    return []
}

export const postContribution = async (pb: PocketBase, contribution: Contribution): Promise<Contribution | void> => {
    if (pb.authStore.isValid && pb.authStore.record) {
        try {
            const data = {
                ...contribution,
                "userId": pb.authStore.record.id,
            }

            const createdContribution = await pb.collection('contributions').create(data)
            return {
                id: createdContribution.id,
                name: createdContribution.name,
                amount: createdContribution.amount,
                frequency: createdContribution.frequency,
                type: createdContribution.type,
            }
        } catch (error) {
        }
    }
}

export const deleteContribution = async (pb: PocketBase, contribution: Contribution): Promise<void> => {
    try {
    await pb.collection('contributions').delete(contribution.id)
    }
    catch (error) { }
}
