import argon2 from 'argon2'
import dotenv from 'dotenv'

dotenv.config({ quiet: true })

const argonConfig = {
  type: parseInt(process.env.ARGON_TYPE as string, 10) as argon2.Options['type'],
  timeCost: parseInt(process.env.ARGON_TIME_COST as string, 10),
  memoryCost: parseInt(process.env.ARGON_MEMORY_COST as string, 10),
  parallelism: parseInt(process.env.ARGON_PARALLELISM as string, 10),
  hashLength: parseInt(process.env.ARGON_HASH_LENGTH as string, 10)
}

export { argonConfig }
