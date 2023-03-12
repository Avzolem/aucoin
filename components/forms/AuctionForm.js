/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { Input, TextArea, ThumbImage } from "@/components/forms/fields";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const createCollectable = async () => {
  try {
    const provider = getProvider();
    const program = new Program(idl, programID, provider);
    const [collectable] = await PublicKey.findProgramAddressSync(
      [
        utils.bytes.utf8.encode("COLLECTABLE_DEMO"),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    );
    await program.rpc.create("collectable name", "collectable description", {
      accounts: {
        collectable,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
    });
    console.log(
      "Created a new collectable w/ address:",
      collectable.toString()
    );
  } catch (error) {
    console.error("Error creating collectable acount", error);
  }
};

const AuctionForm = ({ type = "new" }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const collectable = {
    name: "collectable name",
    description: "collectable description",
  };

  return (
    <form onSubmit={handleSubmit(createCollectable)}>
      <div className="inputcontainer">
        <Input
          label="Name"
          name="name"
          type="text"
          register={{
            ...register("name", {
              minLength: {
                value: 3,
                message: "The name must be at least 3 characters long",
              },
              maxLength: {
                value: 18,
                message: "The name must be less than 18 characters long",
              },
              required: {
                value: true,
                message: "Name is required",
              },
            }),
          }}
        />
        <TextArea
          label="Description"
          name="description"
          type="text"
          register={{
            ...register("description", {
              minLength: {
                value: 15,
                message: "The description must be at least 15 characters long",
              },
              maxLength: {
                value: 100,
                message: "The name must be less than 100 characters long",
              },
              required: {
                value: true,
                message: "Description is required",
              },
            }),
          }}
        />
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-buttonbg hover:bg-buttonhover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-buttonhover"
          disabled={loading}
        >
          {loading ? "Loading..." : type === "new" ? "Add" : "Update"}
        </button>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-yellow-600 hover:bg-buttonhover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-buttonhover"
          disabled={loading}
        >
          {loading ? "Cargando..." : type === "new" ? "Add" : "Actualizar"}
        </button>
      </div>
    </form>
  );
};

export default AuctionForm;
