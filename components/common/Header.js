/* eslint-disable @next/next/no-img-element */
import { Fragment, useState } from "react";
import Link from "next/link";
import { Popover, Transition, Menu } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import classNames from "@/utils/classNames";
import { useEffect } from "react";
import { Router, useRouter } from "next/router";
import Image from "next/image";

//HEADER SETUP
const logoUrl = "/logo.png";
const navigation = {
  categories: [],
  pages: [
    { name: "Subastas", href: "/subastas" },
    { name: "Subasta con nosotros", href: "/contact" },
    { name: "Candy Machine", href: "/candymachine" },
  ],
};
let phantom;

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [publicKey, setPublicKey] = useState(null);

  useEffect(() => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;
      let key = window.localStorage.getItem("publicKey");
      if (key) {
        let firstFour = key?.substring(0, 4);
        let lastFour = key?.substring(key?.length - 4);
        key = firstFour + "..." + lastFour;
        setPublicKey(key);
      }

      if (provider?.isPhantom) {
        console.log(provider);
        phantom = provider;
      }
    }
  }, []);

  const connectWallet = async () => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;
      if (provider?.isPhantom) {
        phantom = provider;
        try {
          const { solana } = window;

          if (solana.isPhantom) {
            console.log("Phantom wallet is installed");
            const response = await phantom.connect();
            console.log(response.publicKey.toString());
            //loginWithPhantom();
            router.push("/auth/signin");
          } else {
            console.log("Phantom wallet is not installed");
            window.open("https://phantom.app/", "_blank");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Phantom wallet is not installed");
      }
    } else {
      window.open("https://phantom.app/", "_blank");
    }
  };

  const signOutWallet = () => {
    console.log("sign out");
    window.localStorage.removeItem("publicKey");
    window.localStorage.removeItem("signature");
    router.reload(window.location.pathname);
  };

  return (
    <Popover className="relative bg-white">
      <div
        className="absolute inset-0 shadow z-20 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-20">
        {/* DESKTOP */}
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">
          <div>
            <Link href="/" className="flex">

              <img
                className="h-8 w-auto sm:h-10"
                src={logoUrl}
                alt="aucoin logo"
              />

            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
            <Popover.Group as="nav" className="flex space-x-10">
              {navigation.pages.map((page) => (
                (<Link
                  key={page.name}
                  href={page.href}
                  className="text-base font-medium text-gray-500 hover:text-gray-900">

                  {page.name}

                </Link>)
              ))}
            </Popover.Group>
            {/* HEADER DEKTOP RIGHT SECTION BUTTONS */}
            <div className="flex items-center md:ml-12">
              {publicKey ? (
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-offset-2  focus:ring-white">
                      <span className="sr-only">Open user menu</span>

                      <Image
                        className="rounded-full px-1 py-2"
                        width={32}
                        height={32}
                        src="/images/phantom.png"
                        alt=""
                      />
                      <div className="text-white px-1 py-2">{publicKey}</div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/user/profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}>
                            
                              Mi Cuenta
                            
                          </Link>
                        )}
                      </Menu.Item>
                      {true && (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/admin/dashboard"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}>
                              
                                Admin Dashboard
                              
                            </Link>
                          )}
                        </Menu.Item>
                      )}

                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                            )}
                            onClick={() => signOutWallet()}
                          >
                            Salir
                          </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <button
                  onClick={() => {
                    connectWallet();
                  }}
                >
                  <a>Conectar cartera </a>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5 sm:pb-8">
              <div className="flex items-center justify-between">
                <div>
                  <Link href="/">

                    {" "}
                    <img className="h-8 w-auto" src={logoUrl} alt="logo" />

                  </Link>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-6 px-5">
              <div className="grid grid-cols-2 gap-4">
                {navigation.pages.map((page) => (
                  (<Link
                    key={page.name}
                    href={page.href}
                    className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">

                    {page.name}

                  </Link>)
                ))}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Header;
