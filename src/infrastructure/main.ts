import * as process from 'node:process'
import { server } from './server'

export const run = (): void => {
  const port = process.env.PORT || 3000
  const loglevel = process.env.LOG_LEVEL || 'info'

  server(loglevel).listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
}
