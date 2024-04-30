import { Contract, ethers, parseEther } from "ethers"
import React from 'react'
import { useEffect } from "react"
import { useContext } from "react"
import { useState } from "react"
import { createContext } from "react"

const provider = new ethers.BrowserProvider(window.ethereum)

export const WalletContext = createContext()

export const useWalletContext = () => useContext(WalletContext)

const WalletProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [account, setAccount] = useState(null);
    const [address, setAddress] = useState(null);

    const connectWalletHandler = () => {
        if (window.ethereum) {
            provider.send("eth_requestAccounts", [])
                .then(async () => accountHandler(await provider.getSigner()))
                .catch((err) => setError(err.message))
        } else {
            setError("Please connect to a wallet!!!");
        }
    }

    const accountHandler = async (walletAccount) => {
        const walletAddress = await walletAccount.getAddress();
        setAddress(walletAddress);
        setAccount(walletAccount);
    }

    const getUserBalance = async (userAddress) => ethers.formatEther(
        await provider.getBalance(userAddress, "latest")
    )

    const getContract = () => {
        return new Contract(
            process.env.REACT_APP_CONTRACT_ADDR,
            JSON.parse(process.env.REACT_APP_CONTRACT_ABI),
            account,
        )
    }

    const createTransaction = async (amount) => {
        const balance = await getUserBalance(address)

        const contract = getContract()
        const valueToSend = ethers.parseUnits(amount.toString(), 'ether');
        const methodName = 'sendEther';

        const tx = await contract.connect(account)[methodName](valueToSend, {
            value: valueToSend,
        })
        await tx.wait()
        console.log(" New Transaction: ", tx)
    }

    useEffect(() => {
        connectWalletHandler()

        // Listen for changes in MetaMask accounts
        window.ethereum.on('accountsChanged', connectWalletHandler);

        // Cleanup function
        return () => {
            window.ethereum.removeListener('accountsChanged', connectWalletHandler);
        };
    }, [])

    return (
        <WalletContext.Provider value={{ account, address, error, getUserBalance, createTransaction }}>
            {children}
        </WalletContext.Provider>
    )
}

export default WalletProvider