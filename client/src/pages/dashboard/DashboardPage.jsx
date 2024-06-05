import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ImgCard from "../../components/ImgCard";

import image1 from "../../assets/img1.jpg";
import image2 from "../../assets/img2.jpg";

export default function DashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <>
      <div className="h-screen flex flex-col bg-slate-100">
        <h1 className="px-4 pt-8 text-3xl md:text-4xl font-bold text-center mt-10 bg-gradient-to-r from-fuchsia-900 to-fuchsia-300 bg-clip-text text-transparent">
          Unleash the power of AI to create images
        </h1>
        <div className="flex items-start pt-12 md:pt-24 pb-10 justify-center flex-grow">
          <div className="w-full flex flex-wrap justify-center items-center gap-10">
            <ImgCard
              image={image1}
              link="/text-to-image"
              title="Text to Image"
              desc="Experience the power of AI as your words are transformed into vibrant visuals. Simply input your text, and watch as it springs to life in stunning imagery. Ideal for designers, writers, and anyone seeking creative inspiration."
            />
            <ImgCard
              image={image2}
              link="/image-to-image"
              title="Image to Image"
              desc="Witness ordinary images undergo extraordinary transformations with AI. From surreal landscapes to artistic masterpieces, explore endless possibilities with just a click. Perfect for photographers, artists, and anyone with an eye for innovation."
            />
          </div>
        </div>
      </div>
    </>
  );
}
