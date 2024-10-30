"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { json } from "node:stream/consumers";
import { useState } from "react";

const AddFood = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [category, setCategory] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === "" || description === "" || category === "" || img === "") {
      setError(true);
      return;
    } else {
      setError(false);
    }

    try {
      const res = await fetch("http://localhost:3000/api/foods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price,
          category,
          isAvailable,
        }),
      });

      if (res.ok) {
        setName("");
        setDescription("");
        setPrice(0);
        setCategory("");
        setIsAvailable(false);

        router.push("/");
      } else {
        throw new Error("Failed to add food.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setPrice(newValue);
  };

  return (
    <div className="mx-auto w-80  max-w-[500px] bg-white">
      <form onSubmit={handleSubmit} className="flex flex-col text-black gap-4">
        <div className="mb-5">
          <Label>Food</Label>
          <Input
            className="py-6"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <Label>Description</Label>
          <Input
            className="py-6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <Label>Price</Label>
          <Input className="py-6" value={price} onChange={handleChange} />
        </div>
        <div className="mb-5">
          <Label>Category</Label>
          <Input
            className="py-6"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <Label>Img</Label>
          <Input
            className="py-6"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </div>

        <div className="px-2 w-1/3 flex flex-row items-center">
          <Label>isAvailable</Label>
          <Input
            type="checkbox"
            className=""
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
        </div>
        <div className="w-max-md flex items-center justify-center">
          <Button className="w-auto px-3.5 py-1.5" type="submit">
            Submit
          </Button>
        </div>

        <p>{error}</p>
      </form>
    </div>
  );
};

export default AddFood;
