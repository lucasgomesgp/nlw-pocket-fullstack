import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { desiredWeeklyFrequency } from '../../functions/change-desired-week-frequency'
import { z } from 'zod'

export const ChangeDesiredWeekFrequencyRoute: FastifyPluginAsyncZod =
  async app => {
    app.delete(
      '/goals',
      {
        schema: {
          body: z.object({
            goalId: z.string(),
          }),
        },
      },
      async request => {
        const { goalId } = request.body
        const data = await desiredWeeklyFrequency({ goalId })
        return data
      }
    )
  }
