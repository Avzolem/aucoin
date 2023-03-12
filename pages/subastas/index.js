import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
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
