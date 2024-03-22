import React from "react";
import BurnButtonBar from "./BurnButtonBar";
import BurnStatsContainer from "./BurnStatsContainer";

const DashboardLayoutStyled = (props) =>{
    return (
        <div className="top_conatiner burnpage"style={{ alignItems: "flex-start" }}>
          <div className="info_box filled">
            <h1 className="title">App TOKEN BURN</h1>
            <p className="description medium"></p>
            <BurnButtonBar changeBurnTransactions={props.changeBurnTransactions} />
          </div>
          <BurnStatsContainer/>
        </div>
    )
}

export default DashboardLayoutStyled;