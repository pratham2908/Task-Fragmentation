import React from "react";
import { useState, useEffect } from "react";

const TransactionTableStyled = (props) =>{
  const [coinData, setCoinData] = useState<any>({});
  useEffect(() => {
    CoinGeckoApi.fetchCoinData()
      .then((data: any) => {
        //console.log("coin stats", data);
        setCoinData(data?.market_data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
    return (
        <>
        <div className="header">
          <p className="header_label">Burn Transactions</p>
        </div>
        
        <BurnTxTable data={props.burnTransactions} priceUSD={coinData?.current_price?.usd}/>
        </>
    )
}

export default TransactionTableStyled;