import { useBoolean } from 'ahooks'
import { observer } from 'mobx-react-lite'
import { SvgIcon } from 'src/components/ui'
import { useEffect, useState } from 'react'
import { OKXUniversalProvider } from '@okxconnect/universal-provider'
import { formatEther } from 'ethers/lib/utils'
import { useOkx } from 'src/contexts/okx'

const Okx = observer(() => {
  const {
    okxGetAddress,
    okxGetChainId,
    okxConnect,
    okxDisconnect,
    okxSetDefaultChainToXterBNB,
    okxSetDefaultChainToXterBNBTest,
    okxSendTransaction,
    okxAddXterBNBChain,
    okxAddXterBNBChainTest,
    okxGetBalance // 假设存在这个方法
  } = useOkx()

  const [chainId, setChainId] = useState<string>()
  const [address, setAddress] = useState<string>()
  const [balance, setBalance] = useState<string>()

  const handleGetAddress = async () => {
    const address = await okxGetAddress()
    alert(address)
    setAddress(address)
  }

  const handleGetChainId = async () => {
    const chainId = await okxGetChainId()
    alert(chainId)
    setChainId(chainId)
  }

  const handleConnect = async () => {
    await okxConnect()
    handleGetAddress()
    handleGetChainId()
  }

  const handleConnectAndAddXterBNBChain = async () => {
    await okxConnect()
    // setTimeout(() => {
    //   alert('5s timeout')
    // }, 5000)
    // await okxAddXterBNBChain()
  }

  const handleDisconnect = async () => {
    await okxDisconnect()
    setAddress(undefined)
    setChainId(undefined)
    setBalance(undefined)
  }

  const handleSetDefaultChainToXterBNB = async () => {
    await okxSetDefaultChainToXterBNB()
  }

  const handleSetDefaultChainToXterBNBTest = async () => {
    await okxSetDefaultChainToXterBNBTest()
  }

  const handleSendTransaction = async () => {
    // await okxSendTransaction()
  }

  const handleAddXterBNBChain = async () => {
    await okxAddXterBNBChain()
  }

  const handleAddXterBNBChainTest = async () => {
    await okxAddXterBNBChainTest()
  }

  const handleFetchBalance = async () => {
    if (address) {
      const currentBalance = await okxGetBalance(address) // 需要实现这个方法
      alert(formatEther(BigInt(currentBalance as string).toString()))
      setBalance(formatEther(BigInt(currentBalance as string).toString())) // 格式化余额
    }
  }

  return (
    <div>
      <div>
        <h3>链ID: {chainId}</h3>
        <h3>地址: {address}</h3>
        <h3>余额: {balance}</h3>
      </div>
      <div className="mt-4 cursor-pointer" onClick={handleConnectAndAddXterBNBChain}>
        <h3>连接钱包并添加 XterBNB 链</h3>
      </div>
      <div className="mt-4 cursor-pointer" onClick={handleConnect}>
        <h3>连接钱包</h3>
      </div>
      <div className="mt-4 cursor-pointer" onClick={handleGetAddress}>
        <h3>获取地址</h3>
      </div>
      <div className="mt-4 cursor-pointer" onClick={handleGetChainId}>
        <h3>获取链ID</h3>
      </div>
      <div className="mt-4 cursor-pointer" onClick={handleDisconnect}>
        <h3>断开连接</h3>
      </div>
      <div className="mt-4 cursor-pointer" onClick={handleSetDefaultChainToXterBNB}>
        <h3>设置默认链为 XterBNB</h3>
      </div>
      <div className="mt-4 cursor-pointer" onClick={handleSetDefaultChainToXterBNBTest}>
        <h3>设置默认链为 XterBNB 测试</h3>
      </div>
      <div className="mt-4 cursor-pointer" onClick={handleSendTransaction}>
        <h3>发送交易</h3>
      </div>
      <div className="mt-4 cursor-pointer" onClick={handleAddXterBNBChain}>
        <h3>添加 XterBNB 链</h3>
      </div>
      <div className="mt-4 cursor-pointer" onClick={handleAddXterBNBChainTest}>
        <h3>添加 XterBNB 测试链</h3>
      </div>
      <div className="mt-4 cursor-pointer" onClick={handleFetchBalance}>
        <h3>获取余额</h3>
      </div>
    </div>
  )
})

export default Okx
