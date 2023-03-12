import MainLayout from "@/components/layouts/MainLayout";
import AuctionForm from "../components/forms/AuctionForm";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <MainLayout title="Subastas" description="página de subastas">
      <div className="content flex justify-center items-center w-full my-16">
        <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
          <AuctionForm />
        </div>
      </div>
    </MainLayout>
  );
}
