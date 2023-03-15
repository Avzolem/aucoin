import MainLayout from "@/components/layouts/MainLayout";
import classNames from "@/utils/classNames";
import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { createTicket } from "../_app";
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
//"img_url",
// "eventname",
// "eventdescription",
const programID = new PublicKey(idl.metadata.address);
const network = clusterApiUrl("devnet");
const opts = {
  preflightCommitment: "finalized",
};
const { SystemProgram } = web3;

const CreateEvent = () => {
  const [agreed, setAgreed] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new AnchorProvider(
      connection,
      window.solana,
      opts.preflightCommitment
    );
    return provider;
  };

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

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  // SUBMIT FUNCTION
  const onSubmit = async (data) => {
    setGlobalError("");
    if (!agreed) {
      setGlobalError("You must agree to the terms and conditions");
      return;
    }
    //DO WHATEVER YOU WANT HERE
    setSubmitLoading(true);

    const createCollectable = async () => {
      try {
        const provider = getProvider();
        const program = new Program(idl, programID, provider);
        const [ticket] = await PublicKey.findProgramAddressSync(
          [
            utils.bytes.utf8.encode("TICKET_DEMO"),
            provider.wallet.publicKey.toBuffer(),
          ],
          program.programId
        );
        await program.rpc.create(
          data.img_url,
          data.eventname,
          data.eventdescription,
          new BN(data.price * web3.LAMPORTS_PER_SOL), //* web3.LAMPORTS_PER_SOL
          {
            accounts: {
              ticket,
              user: provider.wallet.publicKey,
              systemProgram: SystemProgram.programId,
            },
          }
        );
        console.log("Created a new ticket w/ address:", ticket.toString());
        setTimeout(() => {
          window.location.href = "/createvent/success";
        }, 2000);
        toast.success("Event Created Successfully");
      } catch (error) {
        console.error("Error creating ticket acount", error);
        toast.error("Something went wrong");
      }
    };

    try {
      //save data to props
      const dataToSend = { ...data };
      console.log("Data to send => ", dataToSend);

      createCollectable();
    } catch (error) {
      toast.error("Something went wrong");
    }

    setSubmitLoading(false);
  };

  return (
    <div>
      <MainLayout className="relative">
        <div className="overflow-hidden py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
          <div className="relative mx-auto max-w-xl">
            <svg
              className="absolute left-full translate-x-1/2 transform"
              width={404}
              height={404}
              fill="none"
              viewBox="0 0 404 404"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="85737c0e-0916-41d7-917f-596dc7edfa27"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-purple-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={404}
                fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
              />
            </svg>
            <svg
              className="absolute right-full bottom-0 -translate-x-1/2 transform"
              width={404}
              height={404}
              fill="none"
              viewBox="0 0 404 404"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="85737c0e-0916-41d7-917f-596dc7edfa27"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-purple-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={404}
                fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
              />
            </svg>
            <div className="text-center text-3xl font-extrabold  sm:text-4xl">
              <span className="tracking-tight text-gray-400 ">
                Create a new{" "}
              </span>
              <span className=" bg-yellow-500 from-emerald-500  via-yellow-500 to--500 bg-clip-text text-transparent">
                Auction{" "}
              </span>
              <span className="tracking-tight text-gray-400 ">Auction</span>
              <p className="mt-4 text-lg leading-6 text-white">
                Fill out the form below to create a new event
              </p>
            </div>
            <div className="mt-12">
              {/* AQUI EMPIEZA EL FORMULARIO */}

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
              >
                {/* Nombre del Evento  */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="eventname"
                    className="block text-sm font-medium text-yellow-500"
                  >
                    Item Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="eventname"
                      id="eventname"
                      autoComplete="organization"
                      className="block w-full rounded-md border-yellow-500 py-3 px-4 shadow-sm focus:border-yellow-700 focus:ring-gray-200"
                      {...register("eventname", {
                        required: {
                          value: true,
                          message: "Event Name is required",
                        },
                      })}
                    />
                    {errors.eventname && (
                      <div className="mt-3 text-sm text-red-600">
                        {errors.eventname.message}
                      </div>
                    )}
                  </div>
                </div>
                {/* Url de la img  */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="img_url"
                    className="block text-sm font-medium text-yellow-500"
                  >
                    Image Url of the item
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="img_url"
                      id="img_url"
                      autoComplete="organization"
                      className="block w-full rounded-md border-yellow-500 py-3 px-4 shadow-sm focus:border-yellow-700 focus:ring-gray-200"
                      {...register("img_url", {
                        required: {
                          value: true,
                          message: "Image Url is required",
                        },
                      })}
                    />
                    {errors.img_url && (
                      <div className="mt-3 text-sm text-red-600">
                        {errors.img_url.message}
                      </div>
                    )}
                  </div>
                </div>
                {/* Precio */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-yellow-500"
                  >
                    Price in SOL (Per bid)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="price"
                      id="price"
                      step="0.0000001"
                      autoComplete="organization"
                      className="block w-full rounded-md border-yellow-500 py-3 px-4 shadow-sm focus:border-yellow-700 focus:ring-gray-200"
                      {...register("price", {
                        required: {
                          value: true,
                          message: "Price is required",
                        },
                      })}
                    />
                    {errors.price && (
                      <div className="mt-3 text-sm text-red-600">
                        {errors.price.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Descripcion del Item  */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="Description"
                    className="block text-sm font-medium text-yellow-500"
                  >
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="eventdescription"
                      name="eventescription"
                      rows={4}
                      className="block w-full rounded-md border-yellow-500 py-3 px-4 shadow-sm focus:border-yellow-700 focus:ring-gray-200"
                      defaultValue={""}
                      {...register("eventdescription", {
                        required: {
                          value: true,
                          message: "Description is required",
                        },
                        min: {
                          value: 20,
                          message: "Minimum 20 characters",
                        },
                        max: {
                          value: 280,
                          message: "Maximum 280 characters",
                        },
                      })}
                    />
                    {errors.description && (
                      <div className="mt-3 text-sm text-red-600">
                        {errors.eventdescription.message}
                      </div>
                    )}
                  </div>
                </div>
                {/* SWITCH */}
                <div className="sm:col-span-2">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Switch
                        checked={agreed}
                        onChange={setAgreed}
                        className={classNames(
                          agreed ? "bg-yellow-600" : "bg-gray-200",
                          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                        )}
                      >
                        <span className="sr-only">
                          Privacy Policy Agreement
                        </span>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            agreed ? "translate-x-5" : "translate-x-0",
                            "inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                          )}
                        />
                      </Switch>
                    </div>
                    {/* POLITICS AND Cookies */}
                    <div className="ml-3">
                      <p className="text-base text-gray-500">
                        By selecting this, you agree to our{" "}
                        <a
                          href="#"
                          className="font-medium text-yellow-500 underline"
                        >
                          Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          className="font-medium text-yellow-500 underline"
                        >
                          Cookies Policy
                        </a>
                        .
                      </p>
                      {globalError && (
                        <div className="mt-3 text-sm text-red-600">
                          {globalError}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* BOTON  */}
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-yellow-500 via-yellow-700 to-gray-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    disabled={submitLoading}
                  >
                    {submitLoading ? (
                      <div>
                        <LoadingCircle />
                      </div>
                    ) : (
                      "Create Event!"
                    )}
                  </button>
                  <input type="hidden" name="_captcha" value="false"></input>
                </div>
              </form>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
};

export default CreateEvent;
