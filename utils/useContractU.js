// Menggunakan contract address Material Contract

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import MaterialContract from "../artifacts/contracts/MaterialContract.sol/MaterialContract.json";

const useContractU = () => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initializeContract = async () => {
      try {
        if (
          typeof window !== "undefined" &&
          typeof window.ethereum !== "undefined"
        ) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contractAddress = "0x9B9Cc0507FD1bb2B83eB8D58D1d1A6f469EC7894"; // Ganti dengan address contract Material Contract yang sudah di-deploy
          const abi = MaterialContract.abi; 

          const instance = new ethers.Contract(contractAddress, abi, signer);
          setContract(instance);
        }
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };

    initializeContract();
  }, []);

  return contract;
};

export default useContractU;