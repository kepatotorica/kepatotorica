import WorkoutTrackerClient from './WorkoutTrackerClient'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <WorkoutTrackerClient />
    </Suspense>
  )
}
