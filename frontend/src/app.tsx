import { CreateGoal } from './components/create-goal'
import { Dialog } from './components/ui/dialog'
import { EmptyGoals } from './components/empty-goals'
import { Summary } from './components/summary'
import { getSummary } from './http/get-summary'
import { useQuery } from '@tanstack/react-query'

export function App() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 seconds
  })
  return (
    <Dialog>
      {data?.total && data.total > 0 ? <Summary /> : <EmptyGoals />}
      <CreateGoal />
    </Dialog>
  )
}
