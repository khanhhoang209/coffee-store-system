import argon2 from 'argon2'
import { argonConfig } from '../configs/argon/argon.config'

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, argonConfig)
}

export async function verifyPassword(
  hashedPassword: string,
  password: string
): Promise<boolean> {
  return argon2.verify(hashedPassword, password)
}
