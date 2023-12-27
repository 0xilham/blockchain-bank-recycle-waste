// Menggunakan contract address Bank Recycle

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import BankRecycleArtifact from "../artifacts/contracts/BankRecycle.sol/BankRecycle.json";

const useContract = () => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = "0x9F9a89001Cb03C78dafef6755904C8c50E6C92F1"; // Ganti dengan address contract Bank Recycle yang sudah di-deploy

      const instance = new ethers.Contract(
        contractAddress,
        BankRecycleArtifact.abi,
        signer
      );
      setContract(instance);
    }
  }, []);

  return contract;
};

export default useContract;
