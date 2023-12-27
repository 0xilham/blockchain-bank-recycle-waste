import { useState, useEffect } from "react";
import useContractU from "../../utils/useContractU";
import ButtonPrimary from "../../components/misc/ButtonPrimary";

const CreateNFT = () => {
  const contractU = useContractU();
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [materialName, setMaterialName] = useState("");
  const [weight, setWeight] = useState();
  const [price, setPrice] = useState();

  const [error, setError] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [addMaterial, setAddMaterial] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [tokenId, setTokenId] = useState();

  const handleAddMaterial = async () => {
    setLoading(true);
    if (contractU) {
      try {
        const tx = await contractU.addMaterial(
          fullName,
          city,
          email,
          materialName,
          parseInt(weight), // Ubah string ke integer jika sesuai dengan logika kontrak
          parseInt(price) // Ubah string ke integer jika sesuai dengan logika kontrak
        );
        setTransactionHash(tx.hash);
        setAddMaterial(true);
        setError("");

        const receipt = await tx.wait();
        const event = receipt.events.find(
          (event) => event.event === "MaterialAdded"
        );
        // Jika Anda menggunakan event.args.id.toNumber(), pastikan kontrak Solidity Anda mengembalikan event args id sebagai BigNumber
        const newTokenId = event.args.id.toNumber();
        setTokenId(newTokenId);
        setSuccessMessage("Data Berhasil Dibuat!");
      } catch (error) {
        console.error("Error:", error);
        setError("Gagal membuat Data. Silakan coba lagi.");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (transactionHash || error || addMaterial) {
      setShowAlert(true);
    }
  }, [transactionHash, error, addMaterial]);

  const handleDismiss = () => {
    setShowAlert(false);
    setFullName("");
    setCity("");
    setEmail("");
    setMaterialName("");
    setWeight("");
    setPrice("");
  };

  useEffect(() => {
    async function fetchTokenId() {
      if (contractU && addMaterial) {
        const filter = contractU.filters.MaterialAdded(null, null);

        const events = await contractU.queryFilter(filter);
        const latestEvent = events[events.length - 1];
        if (latestEvent && latestEvent.args) {
          const tokenId = latestEvent.args.id.toNumber();
          setTokenId(tokenId);
        }
      }
    }
    fetchTokenId();
  }, [contractU, addMaterial]);

  return (
    <>
      <div>
        <h1 style={{ marginBottom: ".3rem" }}>Ajukan & Buat NFT</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddMaterial();
          }}
          style={{ marginBottom: ".5rem" }}
        >
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nama Lengkap
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
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="Satoshi Nakamoto"
            />
          </div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Kota
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
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="Kota Cirebon"
            />
          </div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            E-mail
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="user@mail.com"
            />
          </div>
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
              value={materialName}
              onChange={(e) => setMaterialName(e.target.value)}
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
              value={weight}
              onChange={(e) => setWeight(e.target.valueAsNumber)}
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
              value={price}
              onChange={(e) => setPrice(e.target.valueAsNumber)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="Rp 10.000.000 (Isi angka saja tanpa titik)"
            />
          </div>

          <ButtonPrimary type="submit">Buat NFT</ButtonPrimary>
        </form>
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
              <h3 className="text-lg font-medium">Informasi Pengajuan NFT</h3>
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
                    Nama Material: {materialName}
                  </p>
                  <p style={{ marginBottom: ".3rem" }}>
                    Berat Material: {weight}
                  </p>
                  <p style={{ marginBottom: ".3rem" }}>
                    Harga Material: {price}
                  </p>
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
                    className="text-white bg-green-800 hover:bg-green-900 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 "
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
                </>
              ) : null}

              <button
                type="button"
                className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800"
                onClick={handleDismiss}
                aria-label="Close"
              >
                Dismiss
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

export default CreateNFT;
