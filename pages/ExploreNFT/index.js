import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import SeoHead from "../../components/SeoHead";
import useContract from "../../utils/useContract";
import Image from "next/image";

const ExploreNFT = () => {
  const contract = useContract();
  const [loading, setLoading] = useState(false);
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      setLoading(true);
      if (contract) {
        try {
          const totalProducts = await contract.totalProduct();
          const nftsArray = [];
          const baseIPFSUri =
            "ipfs://QmTZtj1NxYA896bEpUqmaPe42itmaxX1wnYACh2jZVkqqo/{id}.json";

          for (let i = 1; i <= totalProducts; i++) {
            const product = await contract.products(i);
            const uri = baseIPFSUri + i + ".json";
            nftsArray.push({
              id: product.id.toNumber(),
              namaMaterial: product.namaMaterial,
              beratMaterial: product.beratMaterial.toString(),
              hargaMaterial: product.hargaMaterial.toString(),
              owner: product.owner,
              purchased: product.purchased,
              imageURL: uri,
            });
          }
          setNFTs(nftsArray);
        } catch (error) {
          console.error("Error fetching NFTs:", error);
        }
      }
      setLoading(false);
    };

    fetchNFTs();
  }, [contract]);

  const handleBuyNFT = async (id) => {
    try {
      setLoading(true);
      await contract.buyNFT(id); // Memanggil fungsi buyNFT pada kontrak
      setNFTs((prevNFTs) =>
        prevNFTs.map((nft) =>
          nft.id === id ? { ...nft, purchased: true } : nft
        )
      );
    } catch (error) {
      console.error("Error buying NFT:", error);
    } finally {
      setLoading(false);
    }
  };

  const shortenOwnerAddress = (address) => {
    if (address) {
      return `${address.substring(0, 6)}...${address.substring(
        address.length - 4
      )}`;
    }
    return "";
  };

  return (
    <>
      <SeoHead title="Explore NFT | Bank Recycle Waste" />
      <Layout>
        <h1 className="mt-24 mb-8 text-3xl font-semibold">Daftar NFT</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {nfts.map((nft, index) => (
              <div key={index} className="border rounded-md p-4 mb-4">
                <h3>Nama Material: {nft.namaMaterial}</h3>
                <p>Berat Material: {nft.beratMaterial}</p>
                <p>Harga Material: {nft.hargaMaterial}</p>
                <p>Pemilik: {shortenOwnerAddress(nft.owner)}</p>
                <p>
                  Status Penjualan:{" "}
                  {nft.purchased ? "Tidak Tersedia" : "Tersedia"}
                </p>
                {nft.imageURL && (
                  <Image src={nft.imageURL} alt="NFT Image" className="mt-4" />
                )}
                {!nft.purchased && (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md"
                    disabled={loading}
                    onClick={() => handleBuyNFT(nft.id)}
                  >
                    {loading ? "Loading..." : "Beli"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </Layout>
    </>
  );
};

export default ExploreNFT;
