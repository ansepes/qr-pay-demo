import { repository } from '@/api'
import { ApiResult } from '@/basic/utils/repoUtil'
import { IApiResponse } from '@/basic/types'
import { ISearchQRUserCriteria } from '@/api/types'

const resouce = '/qrusers'

class QRUsersRepository {
  @ApiResult
  async get({ userId, yearMonth }: ISearchQRUserCriteria): Promise<IApiResponse> {
    return await repository.get(
      `${resouce}/${encodeURIComponent(userId)}?yearMonth=${encodeURIComponent(yearMonth)}`
    )
  }
}

export const QRUsersRepo = new QRUsersRepository()
