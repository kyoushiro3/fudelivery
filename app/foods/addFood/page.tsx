"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddFood = () => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [category, setCategory] = useState<string>("");
  const [img, setImg] = useState<File | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [imgPreview, setImgPreview] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImg(file);

      //this here it will convert the string to image using the filereader
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (name === "" || description === "" || category === "" || price === undefined) {
      setError("Please fill in all required fields.");
      return;
    } else {
      setError(""); 
    }
  
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString()); 
    formData.append("category", category);
    if (img) {
      formData.append("img", img); 
    }
    formData.append("isAvailable", isAvailable ? "true" : "false"); 
  
    try {
      const res = await fetch("http://localhost:3000/api/foods", {
        method: "POST",
        body: formData, //here i used form data instead of headers json/application/json beacuse this is a from with text and image
      });
  
      if (res.ok) {
        setName("");
        setDescription("");
        setPrice(undefined); 
        setCategory("");
        setImg(null);
        setIsAvailable(false);
        
        router.push("/"); 
      } else {
        throw new Error("Failed to add food.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while adding the food item.");
    }
  };
  
  //we getting errors in the price number when u put string in input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      setPrice(newValue); 
    } else {
      setPrice(undefined); 
    }
  };

  return (
    <div className="mx-auto w-80 max-w-[500px] bg-white">
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
          <Input
            className="py-6"
            type="number"
            value={price !== undefined ? price : ""}
            onChange={handleChange} 
          />
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
            type="file" accept="image/*" onChange={handleImageChange} required
          />
        </div>
        {imgPreview && (
          <Image
            src={imgPreview}
            alt="Selected preview"
            className="mt-4 w-full h-auto rounded-md"
            width={300}
            height={300}
          />
        )}

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

        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        
      </form>
    </div>
  );
};

export default AddFood;
