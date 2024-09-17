import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoalRoute } from './routes/create-goal'
import { createGoalCompletionRoute } from './routes/create-goal-completion'
import { getWeekSummaryRoute } from './routes/get-week-summary'
import { getWeekPendingGoalsRoute } from './routes/get-week-pending-goals'
import { ChangeDesiredWeekFrequencyRoute } from './routes/change-desired-week-frequency'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, { origin: '*' })

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(createGoalCompletionRoute)
app.register(getWeekSummaryRoute)
app.register(getWeekPendingGoalsRoute)
app.register(ChangeDesiredWeekFrequencyRoute)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running!')
})
