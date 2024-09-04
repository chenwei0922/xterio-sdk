import { getPackageVersion, log } from 'src/common/utils'
import { XterioAuthService, type AxiosInstance } from 'xterio-auth'

interface IBindPNWalletBody {
  address: string
  pn_uuid: string
  pn_token: string
  owner_address: string
  wallet_name: string
  wallet_version: string
}

export class XterioWalletService extends XterioAuthService {
  static request(needLogin?: boolean): AxiosInstance {
    return super.request(needLogin, { sdkVersion: getPackageVersion() })
  }
  static async bindAAWallet({
    address,
    pn_uuid,
    pn_token,
    owner_address,
    wallet_name,
    wallet_version
  }: IBindPNWalletBody): Promise<{ error: boolean }> {
    log('bind aa wallet')
    const res = await this.request(true)
      .post<{ error: boolean }>(`/account/v1/wallet/aa`, {
        address,
        pn_uuid,
        pn_token,
        owner_address,
        wallet_version,
        wallet_name
      })
      .then((res: { data: any }) => {
        log('bind aa wallet success.')
        return { ...res.data, error: false }
      })
      .catch(() => {
        log('bind aa wallet failed.')
        return { error: true }
      })

    return res
  }
}
