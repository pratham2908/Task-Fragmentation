import React from "react";
import { useState, useEffect } from "react";

const BurnPageStyled = styled.div``;
export const BurnPage = () => {
  const { openChainSelector, setOpenChainSelector } =
    useChainSelector();
  const { chains: receiveChains } = useWallet();
  const {
    setSuppliesChain,
    suppliesChain,
  } = useAppSupplies(true);
  const {walletChain} = useWallet();
  const [burnTransactions, setBurnTransactions] = useState<any[]>([]);
  const { toastMsg, toastSev } = useAppToast();
  const [approveTxHash, setApproveTxHash] = useState<string | null>(null);

  useEffect(() => {
    if (!walletChain) return;
    let isSubscribed = true;
    if (isSubscribed) setBurnTransactions([]);
    const isTestnet = isChainTestnet(walletChain?.id);
    let _chainObjects: any[] = [mainnet, avalanche, fantom];
    if (isTestnet) _chainObjects = [sepolia, avalancheFuji, fantomTestnet];
    Promise.all(ChainScanner.fetchAllTxPromises(isTestnet))
      .then((results: any) => {
        //console.log(results, isTestnet);
        if (isSubscribed) {
          let new_chain_results: any[] = [];
          results.forEach((results_a: any[], index: number) => {
            new_chain_results.push(
              results_a.map((tx: any) => ({
                ...tx,
                chain: _chainObjects[index],
              }))
            );
          });
          let res = new_chain_results.flat();
          console.log(res, isTestnet);
          res = ChainScanner.sortOnlyBurnTransactions(res);
          res = res.sort((a: any, b: any) => b.timeStamp - a.timeStamp);
          setBurnTransactions(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isSubscribed = false;
    };
  }, [walletChain]);

  const changeBurnTransactions = (data: unknown[]): void =>{
    setBurnTransactions(data);
  }

  return (
    <div className="App">
      <DashboardLayoutStyled changeBurnTransactions={changeBurnTransactions}/>
      <TransactionTableStyled  burnTransactions = {burnTransactions}/>
      <ChainSelector
        title={"Switch Token Chain"}
        openChainSelector={openChainSelector}
        setOpenChainSelector={setOpenChainSelector}
        chains={receiveChains}
        selectedChain={suppliesChain}
        setSelectedChain={setSuppliesChain}
      />
      <AppToast
        position={{ vertical: "bottom", horizontal: "center" }}
        message={toastMsg}
        severity={toastSev}
      />
    </div>
  );
};