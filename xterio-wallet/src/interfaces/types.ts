import type { SmartAccount } from '@particle-network/aa'
import type {
  MessageTypes,
  PrefixedHexString,
  SignTypedDataVersion,
  TypedDataV1,
  TypedMessage
} from '@particle-network/auth-core'
import type { Env } from 'xterio-auth'

export interface IXterioWalletContextProps {
  redirect_uri: string
  client_id: string
  client_secret: string
  env?: Env
}

export type PnUserInfoType = import('@particle-network/auth-core').UserInfo | undefined

export interface IPnWalletState {
  eoaAddress: string | null
  pnAAWalletAddress: string | undefined
  pnUserInfo: PnUserInfoType
  isLogin: boolean
  pnAA: SmartAccount | undefined
  disconnectPnEoA: () => Promise<void>
  connectPnEoA: (jwt?: string) => Promise<PnUserInfoType>
  connectPnAA: (
    _chainId?: number,
    _eoaAddress?: string
  ) => Promise<{ aaAddress?: string; eoaAddress?: string; name?: string; version?: string }>
  connectPnEoAAndAA: (jwt?: string, _chainId?: number) => Promise<void>
  getWalletIFrame: () => HTMLIFrameElement | null
  openPnWallet: () => void
  signMessage: (message: PrefixedHexString | string, uniq?: boolean) => Promise<string>
  signTypedData: <V extends SignTypedDataVersion, T extends MessageTypes>({
    data,
    version,
    uniq
  }: {
    data: V extends 'V1' ? TypedDataV1 : TypedMessage<T>
    version: V
    uniq?: boolean | undefined
  }) => Promise<string>
}

/**
 * 区分区块链网络的名称，平台前后端统一定义的枚举类型
 * 注意：请勿和ethers、web3等第三方库中的network定义混淆
 */
export enum NETWORK_NAME {
  ETHEREUM = 'ETHEREUM',
  BSC = 'BSC',
  OPBNB = 'OPBNB',
  ARBITRUM = 'ARBITRUM',
  POLYGON = 'POLYGON',
  XTERIO = 'XTERIO',
  XTERIO_ETH = 'XTERIO_ETH',
  BASE = 'BASE',

  GOERLI = 'GOERLI',
  SEPOLIA = 'SEPOLIA',
  BSC_TESTNET = 'BSC_TESTNET',
  OPBNB_TESTNET = 'OPBNB_TESTNET',
  XTERIO_TESTNET = 'XTERIO_TESTNET'
}
