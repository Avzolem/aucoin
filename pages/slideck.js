import MainLayout from "@/components/layouts/MainLayout";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export default function Slideck() {
  return (
    <div>
      <MainLayout className="relative">
        <div className="bg-gradient-to-r from-gray-100 via-gray-500 to-gray-400">
          <div className="mx-auto max-w-2xl justify-center py-16 px-4 text-center sm:py-20 ">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              <span> This is how it works</span>
              <span className="  bg-gradient-to-r  from-yellow-500 via-gray-200 to-orange-500 bg-clip-text text-transparent xl:inline">
                {" "}
                Aucoin
              </span>
            </h2>
            <br />
            <span className="text-2xl font-bold tracking-tight text-white  ">
              We try to make it as easy as possible for you to bid for your
              collectible items.
            </span>
            <div className="mt-8 flex justify-center">
              <div class="w-full">
                <img
                  src="/images/boletines.png"
                  class="w-[40rem] "
                  alt="auctions"
                />
              </div>
            </div>

            <br />
            <br />
            <span className="text-2xl font-bold tracking-tight text-white  ">
              Here is a video that explains how it works
            </span>

            <br />
            <br />

            <LiteYouTubeEmbed
              aspectHeight={9}
              aspectWidth={16}
              id="pPi1e-1nsNI"
              title="Aucoin - How it works"
            />

            <br />
            <br />
            <span className="justify-center text-2xl font-bold text-white  ">
              Our Dev Team 🌭
            </span>
            <div className="mt-8 grid grid-cols-2 justify-center">
              <div className="mt-8 flex-col justify-center px-5">
                <div class="w-full">
                  <img src="/images/ramon.jpeg" class="w-[20rem] " />
                  <span className="justify-center text-2xl font-bold text-white  ">
                    Ramon Najera
                  </span>
                </div>
              </div>

              <div className="mt-8 flex-col justify-center px-5">
                <div class="w-full">
                  <img src="/images/andres.png" class="w-[20rem] " />
                  <span className="justify-center text-2xl font-bold text-white  ">
                    Andres Aguilar
                  </span>
                </div>
              </div>

              <div className="mt-8 flex-col justify-center px-5">
                <div class="w-full">
                  <img src="/images/bart.jpeg" class="w-[20rem] " />
                  <span className="justify-center text-2xl font-bold text-white  ">
                    Bart Lopez
                  </span>
                </div>
              </div>
              <div className="mt-8 flex-col justify-center px-5">
                <div class="w-full">
                  <img src="/images/jona.jpeg" class="w-[20rem] " />
                  <span className="justify-center text-2xl font-bold text-white  ">
                    Jonathan Meixueiro
                  </span>
                </div>
              </div>
            </div>
            <br />
            <br />
            <h2 className="text-base font-semibold leading-7 text-yellow-400">
              Powered by
            </h2>
            <div className="relative mx-auto flex justify-center overflow-hidden ">
              {" "}
              <img
                src="https://solana.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdark-horizontal.e4df684f.svg&w=256&q=75"
                className=" w-[15rem]  "
              />
            </div>
            <br />
            <span className="justify-center text-xl text-white">
              With all the power of the Solana blockchain to create a user
              experience matchless.
            </span>

            <br />
            <br />
            <h2 className="text-base font-semibold leading-7 text-yellow-400">
              Developed by HackDogs
            </h2>
            <br />
            <div className="relative mx-auto flex justify-center overflow-hidden ">
              {" "}
              <img src="/images/dogo.png" className=" w-[10rem]  " />
            </div>

            <br />
            <br />

            <h1 className="text-white-900 text-4xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              <span className=" text-white">Get an </span>{" "}
              <span className=" bg-gradient-to-r  from-yellow-500 via-gray-200  to-orange-500 bg-clip-text text-transparent ">
                Auction{" "}
              </span>
              <span className=" text-white ">for the items you </span>{" "}
              <span className=" text-yellow-500">collect. </span>{" "}
            </h1>

            <br />
          </div>
        </div>
      </MainLayout>
    </div>
  );
}
