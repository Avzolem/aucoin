import MainLayout from "@/components/layouts/MainLayout";

export default function Candymachine() {
    return (
        <MainLayout>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8 justify-center">
                    <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                        <span className="block"> Candy Machine NFT </span>

                        <span className="block">
                            Arte digital de Monedas Creadas con Inteligencia
                            Artificial
                        </span>
                    </h2>

                    <div className="mt-8 flex justify-center">
                        <div class="w-96 carousel rounded-box justify-center">
                            <div class="carousel-item w-full">
                                <img
                                    src="/images/1-coin.png"
                                    class="w-full"
                                    alt="Tailwind CSS Carousel component"
                                />
                            </div>
                            <div class="carousel-item w-full">
                                <img
                                    src="/images/2-coin.png"
                                    class="w-full"
                                    alt="Tailwind CSS Carousel component"
                                />
                            </div>
                            <div class="carousel-item w-full">
                                <img
                                    src="/images/3-coin.png"
                                    class="w-full"
                                    alt="Tailwind CSS Carousel component"
                                />
                            </div>
                            <div class="carousel-item w-full">
                                <img
                                    src="/images/4-coin.png"
                                    class="w-full"
                                    alt="Tailwind CSS Carousel component"
                                />
                            </div>
                            <div class="carousel-item w-full">
                                <img
                                    src="/images/5-coin.png"
                                    class="w-full"
                                    alt="Tailwind CSS Carousel component"
                                />
                            </div>
                            <div class="carousel-item w-full">
                                <img
                                    src="/images/6-coin.png"
                                    class="w-full"
                                    alt="Tailwind CSS Carousel component"
                                />
                            </div>
                            <div class="carousel-item w-full">
                                <img
                                    src="/images/7-coin.png"
                                    class="w-full"
                                    alt="Tailwind CSS Carousel component"
                                />
                            </div>
                            <div class="carousel-item w-full">
                                <img
                                    src="/images/8-coin.png"
                                    class="w-full"
                                    alt="Tailwind CSS Carousel component"
                                />
                            </div>
                            <div class="carousel-item w-full">
                                <img
                                    src="/images/9-coin.png"
                                    class="w-full"
                                    alt="Tailwind CSS Carousel component"
                                />
                            </div>
                        </div>
                    </div>

                    <p className="mt-4 text-lg leading-6 text-gray-700">
                        Te gusta colecciónar monedas? Te gusta la tecnología de
                        blockchain?
                        <br />
                        Utilizamos inteligencia artifical de generacion de
                        imagenes para crear arte digital de monedas, a travez de
                        Dall-E y Stable Diffusion.
                        <br />
                        Con este Candy Machine tienes la oportunidad de obtener
                        un NFT de una moneda digital, que puedes guardar en tu
                        wallet de Solana.
                        <br />
                        Estas monedas digitales son conmemorativas y de valor
                        coleccionista, esta unica ocasion tendremos a la venta
                        16 monedas digitales especiales del Hackathon Etherfuse
                        2022, cada una con un valor de 0.5 SOL. (aproximadamente
                        7.25 USD)
                    </p>
                    <a
                        href="https://candy-machine-aucoin.vercel.app"
                        className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-yellow-500 px-5 py-3 text-base font-medium text-white hover:bg-yellow-700 sm:w-auto"
                    >
                        Compra la tuya ahora! :D
                    </a>
                </div>
            </div>
        </MainLayout>
    );
}
