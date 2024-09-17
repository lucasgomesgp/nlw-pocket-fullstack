import { db } from '../db'
import { eq } from 'drizzle-orm'
import { goalCompletions } from '../db/schema'

interface ChangeDesiredWeekFrequencyRequest {
  goalId: string
}

export async function desiredWeeklyFrequency({
  goalId,
}: ChangeDesiredWeekFrequencyRequest) {
  await db.delete(goalCompletions).where(eq(goalCompletions.id, goalId))

  return { message: 'Frequency updated' }
}
