import { z } from 'zod'

export const loginFormSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(6, { message: 'Password must be atleast 6 characters' }),
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>
