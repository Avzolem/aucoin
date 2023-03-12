import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";
import Image from "next/image";
import Countdown from "@/components/common/Countdown";
import BidHistory from "../../components/common/BidHistory";
import LoadingCircle from "@/components/common/LoadingCircle";
import { useEffect, useState } from "react";
import {
  Connection,
  SystemProgram,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  Transaction,
} from "@solana/web3.js";
import axios from "axios";

let publicKey = null;
let phantom = null;

export default function Home() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [bids, setBids] = useState(undefined);

  useEffect(() => {
    async function getBids() {
      setIsInitialLoading(true);
      try {
        const { data } = await axios.get(`/api/auctions`);
        setBids(data.bids);
        setFetchError(false);
        console.log(data.bids);
      } catch (err) {
        console.log("err =>", err);
        setFetchError(true);
        console.log("ya valió mami");
      }
      setIsInitialLoading(false);
    }

    getBids();
  }, []);

  const [bid, setBid] = useState(0);

  useEffect(() => {
    publicKey = localStorage.getItem("publicKey");
    console.log("publicKey", publicKey);
    getProvider();
    axios.post("/api/auctions", { bidder: publicKey, amount: bid });
  }, []);

  const getProvider = async () => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        const response = await provider.connect();
        return provider;
      }
    }
  };

  //Send bid
  const sendBid = async (e) => {
    e.preventDefault();
    const provider = await getProvider();

    console.log(publicKey);
    const connection = new Connection(clusterApiUrl("devnet"));
    let blockhashObj = await connection.getLatestBlockhash();

    const TransactionInstruction = SystemProgram.transfer({
      fromPubkey: new PublicKey(publicKey),
      toPubkey: new PublicKey("GoeCHuxBNm8Z9Mk18ri3oUXddjXvYvQWeay3KJTDNtSi"),
      lamports: bid * LAMPORTS_PER_SOL,
    });

    const transaction = new Transaction({
      recentBlockhash: blockhashObj.blockhash,
      blockhashObj: blockhashObj,
      feePayer: new PublicKey(publicKey),
    }).add(TransactionInstruction);

    provider.signTransaction(transaction).then((signed) => {
      connection.sendRawTransaction(signed.serialize());
    });
  };

  return (
    <MainLayout title="Subastas" description="página de subastas">
      <div className="content flex justify-center items-center w-full my-16">
        <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <Link href="/subastas/moneditakawaiiunicorn" passHref legacyBehavior>
              <div className="thumbitem  cursor-pointer mx-4 mb-4  shadow-md">
                <div className="photocontainer">
                  <Image
                    src="/images/monedita-kawaii-unicorn.png"
                    alt=""
                    width={512}
                    height={512}
                    className="object-cover"
                  />
                </div>
                <div className="textcontainer pb-4 px-2">
                  <p className="flex w-24 bg-green-500  text-white px-2 rounded-md gont-bold text-sm mt-2">
                    En subasta
                  </p>
                  <h2 className="title text-lg font-bold my-2">
                    Monedita kawaii unicorn!{" "}
                  </h2>
                  <p className="capitalize text-happy-pink-600 font-bold text-sm mb-4">
                    13/11/2022
                  </p>
                  <Countdown date="2022-11-13" />
                  <input
                    type="text"
                    className="w-full border-2 border-gray-300 p-2 my-2 rounded-md"
                    placeholder="Oferta"
                    value={bid}
                    onChange={(e) => setBid(e.target.value)}
                  />
                  <div className="rounded-md shadow">
                    <div
                      onClick={(e) => {
                        sendBid(e);
                      }}
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-yellow-600 px-8 py-3 text-base font-medium text-white hover:bg-yellow-700 md:py-4 md:px-10 md:text-lg"
                    >
                      Pujar
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mt-2">
                      <span className="font-bold">Precio de salida:</span> 0.01
                      SOL
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mt-2">
                      <span className="font-bold">Precio actual:</span> 0.01 SOL
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            {/* <BidHistory /> */}
            <div className="flex flex-col px-4">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  {isInitialLoading ? (
                    <div className="py-24">
                      <LoadingCircle color="#000000" />
                    </div>
                  ) : fetchError ? (
                    <div className="py-24 text-center">
                      <p className="text-lg text-red-500">
                        Hubo un error al cargar las subastas 😢
                      </p>
                    </div>
                  ) : bids && bids.length > 0 ? (
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Comprador
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Monto
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Fecha
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {bids.map((bid) => (
                            <tr key={bid.bidder}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {bid.bidder}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {bid.amount}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {bid.timestamp}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="py-24 text-center">
                      <p className="text-lg text-gray-500">
                        No se encontraron subastas
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
