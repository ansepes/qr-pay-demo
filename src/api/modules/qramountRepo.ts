import { repository } from '@/api'
import { ApiResult } from '@/basic/utils/repoUtil'
import { IApiResponse } from '@/basic/types'
import { IQRAmountValue } from '@/api/types'

const resouce = '/qramount'

class QRAmountRepository {
  @ApiResult
  async post(amount: IQRAmountValue): Promise<IApiResponse> {
    const payload = {
      yearMonth: amount.yearMonth,
      amount: amount.amount,
    }
    return await repository.post(`${resouce}/${encodeURIComponent(amount.userId)}`, payload)
  }
}

export const QRAmountRepo = new QRAmountRepository()
