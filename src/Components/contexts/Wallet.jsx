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
    const [isConnected, setIsConnected] = useState(false);

    const connectWalletHandler = () => {
        setIsConnected(false)
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
        setIsConnected(true)
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

    const createTransaction = async (id, amount) => {
        const balance = await getUserBalance(address)

        if (amount <= balance) {
            const contract = getContract()
            const valueToSend = ethers.parseUnits(amount.toString(), 'ether');
            const methodName = 'subscribe';

            const tx = await contract.connect(account)[methodName](id, {
                value: valueToSend,
            })
            await tx.wait()
            console.log(" New Transaction: ", tx)
        } else {
            alert("Insufficient balance for transaction")
            throw new Error("Insufficient balance for transaction")
        }
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
        <WalletContext.Provider value={{ isConnected, account, address, error, getUserBalance, createTransaction }}>
            {children}
        </WalletContext.Provider>
    )
}

export default WalletProvider