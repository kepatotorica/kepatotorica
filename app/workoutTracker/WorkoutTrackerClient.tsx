"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { postSet, getWorkoutData } from "./Requests"
import { usePocketBase } from "../state/usePocketBase"
import { button, Link, Spinner } from "@nextui-org/react"
import type { BaseAuthStore } from 'pocketbase'
import { Workout } from "./Workout"

export default function WorkoutTrackerClient() {
  const pb = usePocketBase()
  const workoutNames = ["Pushups", "Pullups", "Squats"]
  const workoutDataDefault = undefined as Workout[] | undefined
  const [workoutData, setWorkoutData] = useState<Workout[] | undefined>(workoutDataDefault)

  const [authStore, setAuthStore] = useState<BaseAuthStore | undefined>()

  const getAuth = async () => pb && pb.authStore.isValid && pb.authStore.record && setAuthStore(pb.authStore)

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  // initialize `active` from the `active` search param if present
  const paramActive = searchParams?.get('active')
  const initialActive = paramActive && workoutNames.includes(paramActive) ? paramActive : workoutNames[0]
  const [active, setActive] = useState<string>(initialActive)
  const [input, setInput] = useState<string>("10")
  const [totalReps, setTotalReps] = useState<number>(0)
  const [todaysReps, setTodaysReps] = useState<number>(0)
  const [yearReps, setYearReps] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const waitForAuthValid = async (timeout = 5000) => {
      if (!pb) return false
      if (pb.authStore && pb.authStore.isValid) return true

      // Poll until authStore.isValid or timeout
      return new Promise<boolean>((resolve) => {
        const start = Date.now()
        const iv = setInterval(() => {
          if (pb.authStore && pb.authStore.isValid) {
            clearInterval(iv)
            resolve(true)
          } else if (Date.now() - start > timeout) {
            clearInterval(iv)
            resolve(false)
          }
        }, 100)
      })
    }

    let mounted = true

    const load = async () => {
      try {
        await waitForAuthValid(3000)
        debugger;
        const data = await getWorkoutData(pb as any)
        setWorkoutData(data)
        if (!mounted) return
      } catch (err) {
        console.error('Error loading workout data:', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

  if (pb) load()

  // populate authStore similar to RetirementCalculatorPage
  if (pb) getAuth()

    return () => {
      mounted = false
    }
  }, [pb])

  useEffect(() => {
    const param = searchParams?.get('active')
    if (param && workoutNames.includes(param) && param !== active) {
      setActive(param)
    }
  }, [searchParams])


  useEffect(() => {
    if (workoutData) {
      const activeWorkout = workoutData.find(w => w.name === active)
      setTotalReps(activeWorkout ? activeWorkout.totalRepsDone : 0)
      setTodaysReps(activeWorkout ? activeWorkout.repsToday : 0)
      setYearReps(activeWorkout ? activeWorkout?.repsThisYear : 0)
    }
}, [active, workoutData]);

  const handleAdd = async () => {
    const repsNumber = Number(input)
    if (Number.isNaN(repsNumber) || repsNumber <= 0) return

    try {
      await postSet(pb as any, { name: active, reps: repsNumber })
      // update UI total on success; keep input as-is so user can quickly add again
      setTodaysReps((s) => s + repsNumber)
    } catch (err) {
      console.error("Error posting reps:", err)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8">
      {authStore && authStore.record ?
      <div className="w-full max-w-2xl">
        {/* Tabs */}
        <div className="flex space-x-2 mb-8 items-center justify-center">
          {workoutNames.map((workout) => (
            <button
              key={workout}
              onClick={() => {
                setActive(workout)
                try {
                  const params = new URLSearchParams(searchParams?.toString() || '')
                  params.set('active', workout)
                  const newUrl = `${pathname}?${params.toString()}`
                  // update URL without triggering a navigation/reload
                  if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
                    window.history.replaceState({}, '', newUrl)
                  } else {
                    router.replace(newUrl)
                  }
                } catch (e) {
                  // fallback: do nothing
                }
              }}
              className={`px-4 py-2 rounded-md ${workout === active ? 'bg-blue-600 text-white' : 'text-white'}`}
            >
              {workout}
            </button>
          ))}
        </div>

        {loading ? <Spinner className="flex flex-col items-center justify-center "/> :
          <div className="flex flex-col items-center justify-center py-16">
            <div className="flex flex-col sm:flex-row items-center sm:space-x-8 space-y-2 sm:space-y-0">
              <div className="flex flex-col items-center">
                <div className="text-xs text-gray-500">Total</div>
                <div className="text-xs font-extrabold">{totalReps}</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xs text-gray-500">Year</div>
                <div className="text-xs font-extrabold">{yearReps}</div>
              </div>
            </div>
            <div className="text-sm text-gray-500 pt-4">Today</div>
            <div className="text-7xl font-extrabold pb-8">{todaysReps}</div>

            <div className="flex items-center space-x-2">
                <input
                  aria-label="reps-input"
                  type="number"
                  value={input}
                  onChange={(e) => setInput(e.target.value.replace(/[^0-9]/g, ''))}
                  className="no-spin px-4 py-3 rounded-md w-40 text-center text-2xl font-semibold"
                />
              <button
                onClick={handleAdd}
                className="px-4 py-2 text-white rounded-md"
              >
                Add reps
              </button>
            </div>
          </div>
        }
      </div>
      :
        <Link
          className={button({
            variant: "shadow",
            // radius: "full",
            color: "primary",
          })}
          href={"/account?route=workoutTracker"}
        >
          Please log in to track your workouts.
        </Link>
      }
    </div>
  )
}
