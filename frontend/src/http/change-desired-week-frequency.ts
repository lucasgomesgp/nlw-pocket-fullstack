export async function changeDesiredWeekFrequency(goalId: string) {
  await fetch('http://localhost:3333/goals', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ goalId }),
  })
}
