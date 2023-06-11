import React, { createContext, useEffect, useState } from "react";
import Web3 from "web3";

let web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

export const Web3Context = createContext(null);

export const Web3Provider = ({ children }) => {
    const [account, setAccount] = useState("");

    useEffect(() => {
        const init = async () => {
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0]);
        };
        init();
    }, []);

    return (
        <Web3Context.Provider value={{ web3, account }}>
            {children}
        </Web3Context.Provider>
    );
};
