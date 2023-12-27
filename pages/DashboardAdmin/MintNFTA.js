import ButtonPrimary from "../../components/misc/ButtonPrimary";
import { useState, useEffect } from "react";
import useContract from "../../utils/useContract";
import useContractU from "../../utils/useContractU";

const MintNFT = () => {
  const contract = useContract();
  const contractU = useContractU();
  const [materials, setMaterials] = useState([]);
  const [namaMaterial, setNamaMaterial] = useState("");
  const [beratMaterial, setBeratMaterial] = useState();
  const [hargaMaterial, setHargaMaterial] = useState();
  const [transactionHash, setTransactionHash] = useState("");
  const [nftCreated, setNftCreated] = useState(false);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [receiverAddress, setReceiverAddress] = useState("");
  const [tokenId, setTokenId] = useState();
  const [showReceivedAddressAlert, setShowReceivedAddressAlert] =
    useState(false);
  const [transactionInfo, setTransactionInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const contractAddress = "0x9F9a89001Cb03C78dafef6755904C8c50E6C92F1"; // Ganti dengan alamat kontrak Bank Recycle yang sudah di-deploy

  const handleInsertData = (material) => {
    setNamaMaterial(material.materialName);
    setBeratMaterial(material.weight);
    setHargaMaterial(material.price);
    setReceiverAddress(material.userAddress);
  };

  const fetchMaterials = async () => {
    setLoading(true);
    if (contractU) {
      try {
        const count = await contractU.materialsCount(); // Mendapatkan jumlah material
        const materialsArray = [];
        for (let i = 0; i < count; i++) {
          const material = await contractU.getMaterial(i); // Mendapatkan data material berdasarkan ID
          materialsArray.push({
            id: i,
            fullName: material[0],
            city: material[1],
            email: material[2],
            materialName: material[3],
            weight: material[4].toString(), // Ubah BigNumber ke string jika diperlukan
            price: material[5].toString(), // Ubah BigNumber ke string jika diperlukan
            userAddress: material[6],
          });
        }
        setMaterials(materialsArray);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    }
    setLoading(false);
  };

  const handleMintNFT = async () => {
    setLoading(true);
    if (contract) {
      try {
        const tx = await contract.createProduct(
          namaMaterial,
          beratMaterial,
          hargaMaterial
        );
        setTransactionHash(tx.hash);
        setNftCreated(true);
        setError("");

        // Ambil ID token yang baru dibuat dan simpan ke state
        const receipt = await tx.wait();
        const event = receipt.events.find(
          (event) => event.event === "ProductCreated"
        );
        const newTokenId = event.args.id.toNumber();
        setTokenId(newTokenId);
        setSuccessMessage("NFT Berhasil Dibuat!");
      } catch (error) {
        console.error("Error:", error);
        setError("Gagal membuat NFT. Silakan coba lagi.");
      }
    }
    setLoading(false);
  };

  const handleTransferNFT = async () => {
    setLoading(true);
    if (contract && tokenId && receiverAddress) {
      try {
        const tx = await contract.transferToken(receiverAddress, tokenId);
        setError("");

        // Mendapatkan hash dari transaksi yang baru saja terjadi
        const transactionHash = tx.hash;

        // Mendapatkan alamat penerima
        const receipt = await tx.wait();
        const event = receipt.events.find(
          (event) => event.event === "TokenTransferred"
        );
        const receiver = event.args.to;

        // Menyetel transactionHash dan alamat penerima ke state
        setTransactionHash(transactionHash);
        setTransactionInfo({ transactionHash, receiver });
        setShowReceivedAddressAlert(true); // Menampilkan informasi alamat penerima
        setSuccessMessage("NFT Telah Dikirim ke Address tujuan!");
      } catch (error) {
        console.error("Error:", error);
        setError("Gagal mengirim NFT. Silakan coba lagi.");
      }
    } else {
      setError("Harap masukkan address tujuan dan pilih ID token.");
    }
    setLoading(false);
  };

  useEffect(() => {
    async function fetchTokenId() {
      if (contract && nftCreated) {
        const filter = contract.filters.ProductCreated(
          null,
          null,
          null,
          null,
          null,
          null
        );
        const events = await contract.queryFilter(filter);
        const latestEvent = events[events.length - 1];
        if (latestEvent && latestEvent.args) {
          const newTokenId = latestEvent.args.id.toNumber();
          setTokenId(newTokenId);
        }
      }
    }
    fetchTokenId();
  }, [contract, nftCreated]);

  // useEffect untuk melihat perubahan pada TransactionHash, error, atau nftCreated
  useEffect(() => {
    if (transactionHash || error || nftCreated) {
      setShowAlert(true);
    }
  }, [transactionHash, error, nftCreated]);

  const handleDismiss = () => {
    setShowAlert(false);
    setNamaMaterial("");
    setBeratMaterial("");
    setHargaMaterial("");
  };

  return (
    <>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <h1>Buat NFT</h1>
        <br />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleMintNFT();
          }}
        >
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nama Material
          </label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
              </svg>
            </div>
            <input
              type="text"
              value={namaMaterial}
              onChange={(e) => setNamaMaterial(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="Biji Plastik"
            />
          </div>

          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Berat Material
          </label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 26 26"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2 19h16m-8 0V5m0 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4 8l-2.493 5.649A1 1 0 0 0 2.443 15h3.114a1.001 1.001 0 0 0 .936-1.351L4 8Zm0 0V6m12 2-2.493 5.649A1 1 0 0 0 14.443 15h3.114a1.001 1.001 0 0 0 .936-1.351L16 8Zm0 0V6m-4-2.8c3.073.661 3.467 2.8 6 2.8M2 6c3.359 0 3.192-2.115 6.012-2.793"
                />
              </svg>
            </div>
            <input
              type="number"
              value={beratMaterial}
              onChange={(e) => setBeratMaterial(e.target.valueAsNumber)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="500 Kg (Isi angka saja)"
            />
          </div>

          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Harga Material
          </label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 26 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                />
              </svg>
            </div>
            <input
              type="number"
              value={hargaMaterial}
              onChange={(e) => setHargaMaterial(e.target.valueAsNumber)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="Rp 10.000.000 (Isi angka saja tanpa titik)"
            />
          </div>

          <ButtonPrimary type="submit">Buat NFT</ButtonPrimary>
        </form>

        {/* Informasi ketika ada request mint NFT */}
        <div>
          <label
            for="last_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Antrian Pengajuan NFT
          </label>

          <div>
            <button
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={fetchMaterials}
            >
              Get Data
            </button>
            {loading ? (
              <p></p>
            ) : (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Address
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Nama Material
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Berat
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Harga
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map((material, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0
                            ? "even:bg-gray-50 even:dark:bg-gray-800"
                            : "odd:bg-white odd:dark:bg-gray-900"
                        } border-b dark:border-gray-700`}
                      >
                        <td
                          className="px-6 py-4 cursor-pointer"
                          onClick={() => handleInsertData(material)}
                        >
                          {material.id}
                        </td>
                        <td
                          className="px-6 py-4 cursor-pointer"
                          onClick={() => handleInsertData(material)}
                        >
                          {material.userAddress}
                        </td>
                        <td
                          className="px-6 py-4 cursor-pointer"
                          onClick={() => handleInsertData(material)}
                        >
                          {material.materialName}
                        </td>
                        <td
                          className="px-6 py-4 cursor-pointer"
                          onClick={() => handleInsertData(material)}
                        >
                          {material.weight}
                        </td>
                        <td
                          className="px-6 py-4 cursor-pointer"
                          onClick={() => handleInsertData(material)}
                        >
                          {material.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="mb-2">Kirim NFT</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTransferNFT();
            }}
          >
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Token ID Tujuan
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 21 21"
                  fill="none"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
                  />
                </svg>
              </div>
              <input
                type="number"
                value={tokenId}
                readOnly
                onChange={(e) => setTokenId(e.target.valueAsNumber)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Otomatis terisi ketika sukses membuat NFT"
              />
            </div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Address Tujuan
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={receiverAddress}
                onChange={(e) => setReceiverAddress(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="0x123"
              />
            </div>
            <ButtonPrimary type="submit" onClick={handleTransferNFT}>
              Kirim NFT
            </ButtonPrimary>
          </form>
        </div>
        {showAlert && !loading && (
          <div
            id="alert-additional-content-3"
            className="p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
            role="alert"
          >
            <div className="flex items-center">
              <svg
                className="flex-shrink-0 w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <h3 className="text-lg font-medium">Informasi Status NFT</h3>
            </div>
            <div className="mt-2 mb-4 text-sm">
              {error && <p style={{ color: "red" }}>{error}</p>}
              {successMessage && (
                <div>
                  <p
                    className="flex items-center font-semibold"
                    style={{ marginBottom: ".3rem" }}
                  >
                    {successMessage}
                    <svg
                      className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                      style={{ marginLeft: ".3rem" }}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                  </p>
                  {transactionHash && (
                    <p style={{ marginBottom: ".3rem" }}>
                      Transaction Hash: {transactionHash}
                    </p>
                  )}
                  <p style={{ marginBottom: ".3rem" }}>
                    ID Token NFT: {tokenId}
                  </p>
                  <p style={{ marginBottom: ".3rem" }}>
                    Nama Material: {namaMaterial}
                  </p>
                  <p style={{ marginBottom: ".3rem" }}>
                    Berat Material: {beratMaterial}
                  </p>
                  <p style={{ marginBottom: ".3rem" }}>
                    Harga Material: {hargaMaterial}
                  </p>
                  {showReceivedAddressAlert && (
                    <p style={{ marginBottom: ".3rem" }}>
                      Received Address: {transactionInfo.receiver}
                    </p>
                  )}
                </div>
              )}
              {loading && (
                <div className="flex items-center justify-center">
                  <div class="px-3 py-1 text-xs font-medium leading-none text-center text-green-800 bg-green-200 rounded-full animate-pulse dark:bg-green-900 dark:text-green-200">
                    Tunggu Sebentar...
                  </div>
                </div>
              )}
            </div>
            <div className="flex">
              {!error ? (
                <>
                  <a
                    href={`https://mumbai.polygonscan.com/tx/${transactionHash}`}
                    target="_blank"
                    type="button"
                    className="text-white bg-green-800 hover:bg-green-900 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700"
                  >
                    <svg
                      className="me-2 h-3 w-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 14"
                    >
                      <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                    </svg>
                    View Blockchain Explorer
                  </a>
                  <a
                    href={`https://testnets.opensea.io/assets/mumbai/${contractAddress}/${tokenId}`}
                    target="_blank"
                    type="button"
                    className="text-white bg-green-800 hover:bg-green-900 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700"
                  >
                    <svg
                      className="me-2 h-3 w-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 14"
                    >
                      <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                    </svg>
                    View Opensea
                  </a>
                </>
              ) : null}

              <button
                type="button"
                className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white"
                onClick={handleDismiss}
                aria-label="Close"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {loading && (
          <div className="flex items-center justify-center">
            <div class="px-3 py-1 text-xs font-medium leading-none text-center text-green-800 bg-green-200 rounded-full animate-pulse dark:bg-green-900 dark:text-green-200">
              Tunggu Sebentar...
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MintNFT;
