import PocketBase from 'pocketbase'
import { Workout } from './Workout'

export interface SetModel {
    name: string
    reps: number
    created?: string | Date
}

// Helper: compare local date (year, month, day)
const isSameLocalDay = (a: Date, b: Date) => {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export const getWorkoutData = async (pb: PocketBase): Promise<Workout[]> => {
    if (pb.authStore.isValid) {
        try {
            // PocketBase returns records with created as ISO strings; use any to be resilient.
            const sets = await pb.collection('set').getFullList() as any[]

            const normalized: Array<{ name: string; reps: number; created: Date }> = sets.map((s) => ({
                name: String(s.name || '').trim(),
                reps: Number(s.reps) || 0,
                created: s.created ? new Date(s.created) : new Date(),
            }))

            const today = new Date()
            const currentYear = today.getFullYear()

            // Group by workout name and aggregate totals
            const byName = new Map<string, { name: string; latestCreated: Date; totalRepsDone: number; repsThisYear: number; repsToday: number }>()

            for (const item of normalized) {
                if (!item.name) continue

                const existing = byName.get(item.name)
                if (!existing) {
                    byName.set(item.name, {
                        name: item.name,
                        latestCreated: item.created,
                        totalRepsDone: item.reps,
                        repsThisYear: item.created.getFullYear() === currentYear ? item.reps : 0,
                        repsToday: isSameLocalDay(item.created, today) ? item.reps : 0,
                    })
                } else {
                    existing.totalRepsDone += item.reps
                    if (item.created.getFullYear() === currentYear) existing.repsThisYear += item.reps
                    if (isSameLocalDay(item.created, today)) existing.repsToday += item.reps
                    if (item.created > existing.latestCreated) existing.latestCreated = item.created
                }
            }

            // Convert to Workout[] shape
            const workouts: Workout[] = Array.from(byName.values()).map((v) => ({
                created: v.latestCreated,
                name: v.name,
                totalRepsDone: v.totalRepsDone,
                repsThisYear: v.repsThisYear,
                repsToday: v.repsToday,
            }))

            return workouts
        } catch (error) {
            console.error('Error fetching rep data:', error)
            return []
        }
    }
    return []
}

export const postSet = async (pb: PocketBase, set: SetModel): Promise<void> => {
    if (pb.authStore.isValid && pb.authStore.record) {
        try {
            const data = {
                ...set,
                "userId": pb.authStore.record.id,
            }
            
            const loggedSet = await pb.collection('set').create(data)
        } catch (error) {
            console.error("Error inserting set:", error)
        }
    } else {
        window.alert("You must be logged in to post set.")
    }
}