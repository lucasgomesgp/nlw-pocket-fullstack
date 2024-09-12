import { and, count, eq, gte, lte, sql } from 'drizzle-orm'
import { goalCompletions, goals } from '../db/schema'

import dayjs from 'dayjs'
import { db } from '../db'

interface CreateGoalCompletionRequest {
  goalId: string
}

export async function createGoalCompletion({
  goalId,
}: CreateGoalCompletionRequest) {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const goalsCompletitionCounts = db.$with('goal_completions_counts').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as('completionCount'),
      })
      .from(goalCompletions)
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek),
          eq(goalCompletions.goalId, goalId)
        )
      )
      .groupBy(goalCompletions.goalId)
  )

  const result = await db
    .with(goalsCompletitionCounts)
    .select({
      desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
      completionCount: sql /*sql*/`
        COALESCE(${goalsCompletitionCounts.completionCount},0)
      `.mapWith(Number),
    })
    .from(goals)
    .leftJoin(
      goalsCompletitionCounts,
      eq(goalsCompletitionCounts.goalId, goals.id)
    )
    .where(eq(goals.id, goalId))
    .limit(1)

  const { completionCount, desiredWeeklyFrequency } = result[0]
  if (completionCount >= desiredWeeklyFrequency) {
    throw new Error('Goal already completed this week!')
  }
  const insertResult = await db
    .insert(goalCompletions)
    .values({
      goalId,
    })
    .returning()
  const goalCompletion = result[0]
  return {
    goalCompletion,
  }
}