import type { AdminDto } from '../api/types'
import type { Admin } from '../model/types'

export function mapUser(dto: AdminDto): Admin {
  return {
    user_id: dto.user_id,
    name: dto.name,
  }
}
