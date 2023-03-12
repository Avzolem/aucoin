import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";
import Image from "next/image";
import Countdown from "@/components/common/Countdown";
import BidHistory from "../../components/common/BidHistory";
import { useEffect, useState } from "react";
import {
  Connection,
  SystemProgram,
  PublicKey,
  VersionedTransaction,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  clusterApiUrl,
  TransactionMessage,
  Transaction,
  Keypair,
  recentBlockhash,
  signAndSendTransaction,
} from "@solana/web3.js";

let publicKey = null;
let phantom = null;

export default function Home() {
  const [bid, setBid] = useState(0);

  useEffect(() => {
    publicKey = localStorage.getItem("publicKey");
    getProvider();
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
  const sendBid = async () => {
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
            <Link href="#" passHref legacyBehavior>
              <div className="thumbitem  cursor-pointer mx-4 mb-4  shadow-md">
                <div className="photocontainer">
                  <Image
                    src="/images/moneda-laton.jpeg"
                    alt=""
                    width={512}
                    height={512}
                    className="object-cover"
                  />
                </div>
                <div className="textcontainer pb-4 px-2">
                  <p className="flex w-24 bg-red-500  text-white px-2 rounded-md gont-bold text-sm mt-2">
                    Finalizada
                  </p>
                  <h2 className="title text-lg font-bold my-2">
                    Moneda latón $100 pesos{" "}
                  </h2>
                  <p className="capitalize text-happy-pink-600 font-bold text-sm mb-4">
                    13/11/2022
                  </p>

                  <div className="rounded-md shadow">
                    <button
                      disabled="true"
                      id="Button"
                      type="button"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 px-8 py-3 text-base font-medium text-gray-400  md:py-4 md:px-10 md:text-lg"
                    >
                      Pujar
                    </button>
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
            <BidHistory />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
