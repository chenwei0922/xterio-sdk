import { useEffect, useState, useCallback } from "react";
import { OKXUniversalProvider } from "@okxconnect/universal-provider";
import { formatEther } from "ethers/lib/utils";
import { Transaction } from "ethers/lib/ethers";

export interface IOkx {
  okxConnect: () => Promise<string | undefined>;
  okxDisconnect(): Promise<void>;
  okxSetDefaultChainToXterBNB: () => void;
  okxSetDefaultChainToXterBNBTest: () => void;
  okxSwitchChain: (chainId: string) => Promise<void>;
  okxAddXterBNBChain: () => Promise<void>;
  okxAddXterBNBChainTest: () => Promise<void>;
  okxGetAddress: () => Promise<string | undefined>;
  okxGetChainId: () => Promise<string | undefined>;
  okxGetBalance: (address: string) => Promise<string | undefined>;
  okxSendTransaction: (tx: Partial<Transaction>, isXterBNBTest?: boolean, chain155?: string) => Promise<string | undefined>;
}

export const useOkx = (): IOkx => {
  const [okxProvider, setOkxProvider] = useState<OKXUniversalProvider>();

  const DEFAULT_CHAIN = "eip155:1";
  const XTERBNB_CHAIN = "eip155:112358";
  const XTERBNB_CHAIN_TEST = "eip155:1637450";

  useEffect(() => {
    const initProvider = async () => {
      const provider = await OKXUniversalProvider.init({
        dappMetaData: {
          name: "xter",
          icon: "https://resources.xter.io/ft/aod/roar.png",
        },
      });
      setOkxProvider(provider);
    };
    initProvider();
  }, []);

  const okxConnect = useCallback(async () => {
    console.log('okxConnect start');
    if (okxProvider) {
      const session = await okxProvider.connect({
        namespaces: {
          eip155: {
            chains: ["eip155:1"],
            rpcMap: {
              // Ethereum Mainnet
              1: "https://ethereum-rpc.publicnode.com",
            },
            defaultChain: "1",
          },
        },
        optionalNamespaces: {
          eip155: {
            chains: ["eip155:112358", "eip155:1637450"],
            rpcMap: {
              // Xterio Chain (BNB)
              112358: "https://xterio-bnb.alt.technology",
              // Xterio Testnet (BNB)
              1637450: 'https://xterio-testnet.alt.technology/'
            },
            defaultChain: "112358",
          },
        },
        sessionConfig: {
          redirect: "tg://resolve",
        },
      });
      console.log('session ==', JSON.stringify(session))
      // alert(JSON.stringify(session));
      return JSON.stringify(session);
    } else {
      alert('okxProvider not init');
    }
    console.log('okxConnect end');
  }, [okxProvider]);

  const okxSetDefaultChainToXterBNB = useCallback(() => {
    console.log('okxSetDefaultChainToXterBNB start');
    if (okxProvider) {
      okxProvider.setDefaultChain(
        "eip155:112358",
        "https://xterio-bnb.alt.technology"
      );
    }
    // alert(okxProvider?.client.session?.namespaces)
    console.log('okxSetDefaultChainToXterBNB end');


  }, [okxProvider]);

  const okxSetDefaultChainToXterBNBTest = useCallback(() => {
    console.log('okxSetDefaultChainToXterBNBTest start');
    if (okxProvider) {
      okxProvider.setDefaultChain(
        "eip155:1637450",
        "https://xterio-testnet.alt.technology/"
      );
    }
    console.log('okxSetDefaultChainToXterBNBTest end');
  }, [okxProvider]);

  const okxSwitchChain = useCallback(async (chainId: string) => {
    console.log('okxSwitchChain start');
    if (okxProvider) {
      const data = {
        method: "wallet_switchEthereumChain",
        params: { chainId },
      };
      const switchResult = await okxProvider.request(
        data,
        DEFAULT_CHAIN
      );
    }
    console.log('okxSwitchChain end');
  }, [okxProvider]);

  const okxAddXterBNBChain = useCallback(async () => {
    alert('okxAddXterBNBChain start')
    console.log('okxAddXterBNBChain start');
    if (okxProvider) {
      const data = {
        method: "wallet_addEthereumChain",
        params: {
          blockExplorerUrls: ["https://bnb.xterscan.io"],
          chainId: "0x1B6E6", // 112358
          chainName: "Xter BNB",
          nativeCurrency: { name: "XTER BNB", symbol: "XBNB", decimals: 18 },
          rpcUrls: ["https://xterio-bnb.alt.technology"],
        },
      };
      const res = await okxProvider.request(
        data,
        DEFAULT_CHAIN
      );
      alert(res);
    }
    console.log('okxAddXterBNBChain end');
  }, [okxProvider]);

  const okxAddXterBNBChainTest = useCallback(async () => {
    console.log('okxAddXterBNBChainTest start');
    if (okxProvider) {
      const data = {
        method: "wallet_addEthereumChain",
        params: {
          blockExplorerUrls: ["https://testnet.xterscan.io"],
          chainId: "0x1B6E6", //1637450
          chainName: "Xterio Testnet",
          nativeCurrency: { name: "Test BNB", symbol: "tBNB", decimals: 18 },
          rpcUrls: ["https://xterio-testnet.alt.technology/"],
        },
      };
      const res = await okxProvider.request(
        data,
        DEFAULT_CHAIN
      );
      alert(res);
    }
    console.log('okxAddXterBNBChainTest end');
  }, [okxProvider]);

  const okxGetAddress = useCallback(async () => {
    console.log('okxGetAddress start');
    if (okxProvider) {
      const ethRequestAccountsResult = await okxProvider.request({
        method: "eth_requestAccounts",
      });
      console.log('okxGetAddress end');
      return ethRequestAccountsResult as string
    }
    console.log('okxGetAddress end');
  }, [okxProvider]);

  const okxGetChainId = useCallback(async () => {
    console.log('okxGetChainId start');
    if (okxProvider) {
      const chainIdResult = await okxProvider.request({
        method: "eth_chainId",
      });
      console.log('okxGetChainId end');
      return chainIdResult as string
    }
    console.log('okxGetChainId end');
  }, [okxProvider]);

  const okxGetBalance = useCallback(async (address: string) => {
    console.log('okxGetBalance start');
    if (okxProvider) {
      const data = {
        method: "eth_getBalance",
        params: [address, "latest"],
      };
      const getBalanceResult = await okxProvider.request(data);
      // alert(formatEther(BigInt(getBalanceResult as string).toString()));
      console.log('okxGetBalance end');
      return getBalanceResult as string
    }
    console.log('okxGetBalance end');
  }, [okxProvider]);

  const okxDisconnect = useCallback(async () => {
    console.log('okxDisconnect start');
    if (okxProvider) {
      await okxProvider.disconnect();
    }
    console.log('okxDisconnect end');
  }, [okxProvider]);

  const okxSendTransaction = useCallback(async (
    tx: Partial<Transaction>,
    isXterBNBTest?: boolean,
    chain155?: string,  // in 'eip155:chainid' format
  ) => {
    console.log('okxSendTransaction start');
    if (okxProvider) {
      const data = {
        method: "eth_sendTransaction",
        params: [tx],
      };
      const sendTransactionResult = await okxProvider.request(
        data,
        isXterBNBTest ? XTERBNB_CHAIN_TEST : chain155 ?? XTERBNB_CHAIN
      );
      console.log('okxSendTransaction end');
      return sendTransactionResult as string;
    }
    console.log('okxSendTransaction end');
  }, [okxProvider]);

  return {
    okxConnect,
    okxDisconnect,
    okxSetDefaultChainToXterBNB,
    okxSetDefaultChainToXterBNBTest,
    okxSwitchChain,
    okxAddXterBNBChain,
    okxAddXterBNBChainTest,
    okxGetAddress,
    okxGetChainId,
    okxGetBalance,
    okxSendTransaction
  };
};