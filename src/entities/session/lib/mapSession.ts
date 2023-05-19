import { verifyAccessToken } from '@shared/lib';
import { type SessionDto } from '../api/types'
import { type Session } from '../model/types'

export async function mapSession(dto: SessionDto): Promise<Session> {

  const jwt = await verifyAccessToken(dto.token)
  const userId = (jwt["id"] as string) ?? "нет ID"

  console.log("Проверка", userId);

  return {
    userId,
    token: dto.token,
    expire: dto.expire,
  }
}
