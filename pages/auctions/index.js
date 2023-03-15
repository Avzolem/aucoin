import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import classNames from "@/utils/classNames";
import { Switch } from "@headlessui/react";
import { useForm } from "react-hook-form";
import LoadingCircle from "@/components/common/LoadingCircle";
import toast from "react-hot-toast";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import {
  Program,
  AnchorProvider,
  web3,
  utils,
  BN,
} from "@project-serum/anchor";
import idl from "../../pages/idl.json";

const programID = new PublicKey(idl.metadata.address);
const network = clusterApiUrl("devnet");
const opts = {
  preflightCommitment: "finalized",
};
const { SystemProgram } = web3;

export default function Home() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [events, setEvents] = useState(null);
  const [collectable, setCollectable] = useState(null);

  useEffect(() => {
    getCollectable();
    const onLoad = async () => {
      setWalletAddress(null);
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new AnchorProvider(
      connection,
      window.solana,
      opts.preflightCommitment
    );
    return provider;
  };

  //Check if wallet is connected (thank you captain obvious)
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");
          const response = await solana.connect({
            onlyIfTrusted: true,
          });
          console.log(
            "Connected with public key:",
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Solana objet not found!");

        setWalletAddress(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //get the auctions from blockchain
  const getCollectable = async () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = getProvider();
    const program = new Program(idl, programID, provider);
    Promise.all(
      (await connection.getProgramAccounts(programID)).map(
        async (collectable) => ({
          ...(await program.account.collectable.fetch(collectable.pubkey)),
          pubkey: collectable.pubkey,
        })
      )
    ).then((collectable) => setCollectable(collectable));
  };

  return (
    <MainLayout title="Subastas" description="página de subastas">
      <div className="flex items-center justify-center py-10">
        {!walletAddress ? (
          <>
            {/* Aqui va el getTickets del Ramon, que tiene que ejecutarse en usestate                                 */}
            <Link href="auctions/createauction">
              <button className="  rounded-md bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700">
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                    />
                  </svg>
                  <span>Create Auction</span>
                </div>
              </button>
            </Link>
          </>
        ) : (
          <div>
            <h1 className="font-bold text-white">
              Please connect your wallet to create Auctions
            </h1>
          </div>
        )}
      </div>
      <div className="content flex justify-center items-center w-full my-16">
        <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <Link
              href="/subastas/moneditakawaiiunicorn"
              passHref
              legacyBehavior
            >
              {/* a button to ad an auction */}

              <div className="thumbitem  cursor-pointer mx-4 mb-4  shadow-md">
                <div className="photocontainer">
                  <Image
                    src="/images/monedita-kawaii-unicorn.png"
                    alt=""
                    width={240}
                    height={240}
                    className="object-cover"
                  />
                </div>
                <div className="textcontainer pb-4 px-2">
                  <h2 className="title text-lg font-bold my-2">
                    Monedita kawaii unicorn!{" "}
                  </h2>
                  <p className="capitalize text-happy-pink-600 font-bold text-sm mb-4">
                    12/12/2022
                  </p>
                  <button className="bg-green-600 text-white px-2 rounded-md cursor-pointer">
                    En subasta
                  </button>
                </div>
              </div>
            </Link>
          </div>
          <div className="rounded-md shadow">
            <Link href="/subastas/monedalaton" passHref legacyBehavior>
              <div className="thumbitem  cursor-pointer mx-4 mb-4  shadow-md">
                <div className="photocontainer">
                  <Image
                    src="/images/moneda-laton.jpeg"
                    alt=""
                    width={240}
                    height={240}
                    className="object-cover"
                  />
                </div>
                <div className="textcontainer pb-4 px-2">
                  <h2 className="title text-lg font-bold my-2">
                    Moneda latón $100 pesos{" "}
                  </h2>
                  <p className="capitalize text-happy-pink-600 font-bold text-sm mb-4">
                    12/12/2022
                  </p>
                  <button className="bg-red-400 text-white px-2 rounded-md cursor-pointer">
                    Finalizada
                  </button>
                </div>
              </div>
            </Link>
          </div>
          <div className="rounded-md shadow">
            <Link href="/subastas/monedadollar" passHref legacyBehavior>
              <div className="thumbitem  cursor-pointer mx-4 mb-4  shadow-md">
                <div className="photocontainer">
                  <Image
                    src="/images/one-dollar.jpeg"
                    alt=""
                    width={240}
                    height={240}
                    className="object-cover"
                  />
                </div>
                <div className="textcontainer pb-4 px-2">
                  <h2 className="title text-lg font-bold my-2">
                    Moneda de un dollar 1851{" "}
                  </h2>
                  <p className="capitalize text-happy-pink-600 font-bold text-sm mb-4">
                    12/12/2022
                  </p>
                  <button className="bg-red-400 text-white px-2 rounded-md cursor-pointer">
                    Finalizada
                  </button>
                </div>
              </div>
            </Link>
          </div>
          <div className="rounded-md shadow">
            <Link href="/subastas/monedaolimpiadas" passHref legacyBehavior>
              <div className="thumbitem  cursor-pointer mx-4 mb-4  shadow-md">
                <div className="photocontainer">
                  <Image
                    src="/images/olimpiada.jpeg"
                    alt=""
                    width={240}
                    height={240}
                    className="object-cover"
                  />
                </div>
                <div className="textcontainer pb-4 px-2">
                  <h2 className="title text-lg font-bold my-2">
                    Moneda Olimpiadas 1968{" "}
                  </h2>
                  <p className="capitalize text-happy-pink-600 font-bold text-sm mb-4">
                    12/12/2022
                  </p>
                  <button className="bg-red-400 text-white px-2 rounded-md cursor-pointer">
                    Finalizada
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
