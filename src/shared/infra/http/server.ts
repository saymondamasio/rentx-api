import 'dotenv/config'
import 'reflect-metadata'
import { app } from './app'

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server running on port ${process.env.PORT || 3333}`)
})
