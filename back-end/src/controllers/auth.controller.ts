import { Request, Response } from 'express'
import { register, login } from '../services/auth.service'
import ROLE_NAME from '../constants/roles.constant'

const handleRegister = async (req: Request, res: Response) => {
  const serviceResponse = await register(req.body, ROLE_NAME.USER)
  return res.status(201).json(serviceResponse)
}

const handleLogin = async (req: Request, res: Response) => {
  const serviceResponse = await login(req.body)
  return res.status(200).json(serviceResponse)
}

export { handleRegister, handleLogin }
