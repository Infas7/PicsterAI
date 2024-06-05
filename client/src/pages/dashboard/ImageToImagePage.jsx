import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function ImageToImagePage() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFromApi, setImageData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();

  const handleImageChange = (e) => {
    setImageUrl(null);
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };

  const handleClick = async () => {
    if (!prompt && !image) {
      setError("Please provide a prompt and upload an image");
      return;
    }
    if (!prompt) {
      setError("Please provide a prompt");
      return;
    }
    if (!image) {
      setError("Please upload an image");
      return;
    }
    setImageData(null);
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("image", image);

    const response = await fetch(import.meta.env.VITE_API_URL + "image/edit", {
      method: "POST",
      headers: { Authorization: `Bearer ${user.token}` },
      body: formData,
    });

    const jsonData = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(jsonData.error);
    }

    if (response.ok) {
      setLoading(false);
      setImageData(jsonData.api_data.output[0]);
    }

    setPrompt("");
  };

  const handleDownload = () => {
    if (imageFromApi) {
      let element = document.createElement("a");
      let file = new Blob([imageFromApi], { type: "image/*" });
      element.href = URL.createObjectURL(file);
      element.download = "edited-image.png";
      console.log(element);
      element.click();
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-300 ">
      <div className="w-3/4 md:w-1/2 max-w-5xl overflow-scroll border bg-gray-600 border-gray-500 rounded-lg shadow-md p-5 flex-col items-center justify-center my-[15%] md:mt-[5%] md:mb-0">
        <h1 className="text-2xl font-semibold text-center text-white mb-4">
          Generate From Image
        </h1>
        <div className="">
          <textarea
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe here what you want to generate..."
            rows="4"
            className="w-full p-3 text-md rounded-md border bg-neutral-200 placeholder-gray-600"
          />
        </div>
        <div className="w-full flex justify-center items-center my-4">
          <input
            class=" w-full text-md text-white border border-gray-500 p-1 rounded-md cursor-pointer bg-gray-800  focus:outline-none"
            type="file"
            onChange={handleImageChange}
          />
        </div>
        {error && (
          <div className="bg-red-500 text-white border rounded-md border-gray-400 font-semibold text-center py-1 my-3">
            {error}
          </div>
        )}
        <div className="w-full flex items-center justify-center mt-4">
          <button
            onClick={handleClick}
            disabled={loading}
            className="w-full md:w-1/6 font-bold rounded-lg text-sm px-5 py-2 text-white text-center bg-fuchsia-600 hover:bg-fuchsia-700 flex items-center justify-center disabled:opacity-60 "
          >
            {!loading ? (
              <span>Generate</span>
            ) : (
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-loader-circle animate-spin"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              </span>
            )}
          </button>
        </div>
        <div className="flex justify-center items-center gap-8 flex-wrap md:flex-nowrap">
          {imageUrl && (
            <div className="flex justify-center items-center w-full mt-5">
              <img
                src={imageUrl}
                className="h-[450px] w-full"
                alt="uploaded-image"
              />
            </div>
          )}

          {imageFromApi && (
            <div className="flex-col justify-center items-center w-full mt-5">
              <img
                src={imageFromApi}
                className="h-[450px] w-full"
                alt="generated-image"
              />
            </div>
          )}
        </div>
        {imageFromApi && (
          <div className="flex justify-end items-center mt-4">
            <button
              onClick={handleDownload}
              className="font-bold rounded-lg text-sm px-5 py-2 text-white text-center bg-red-600 hover:bg-red-700 focus:ring-red-800"
            >
              Download
            </button>
          </div>
        )}
      </div>
    </div>
    // <div className="w-full h-screen  bg-slate-300 pt-10">
    //   <h1 className="text-4xl font-extrabold text-center">
    //     Edit Image using an image
    //   </h1>
    //   <div className="w-full h-1/5 flex justify-center items-center">
    //     <div className="flex items-center justify-center w-1/2">
    //       <input type="file" onChange={handleImageChange} />
    //     </div>
    //   </div>

    //   <div className="flex-col items-center justify-center">
    //     <div className="flex justify-center items-center">
    //       <textarea
    //         type="text"
    //         id="prompt"
    //         value={prompt}
    //         onChange={(e) => setPrompt(e.target.value)}
    //         placeholder="Describe what you want to generate here..."
    //         rows="4"
    //         className="w-1/3 p-3 mx-20 text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
    //       />
    //     </div>
    //     <div className="flex items-center justify-center mt-4">
    //       <button
    //         onClick={handleClick}
    //         disabled={loading}
    //         className="font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center bg-fuchsia-600 hover:bg-fuchsia-700"
    //       >
    //         Generate
    //       </button>
    //     </div>
    //   </div>

    //   <div className="w-full h-1/2 flex justify-center items-center">
    //     <div className="w-1/3 h-3/4  mx-5">
    //       {imageUrl && (
    //         <img
    //           src={imageUrl}
    //           className="h-[450px] w-full"
    //           alt="uploaded-image"
    //         />
    //       )}
    //     </div>
    //     <div className="w-1/3 h-3/4 mx-5">
    // {imageFromApi && (
    //   <div className="flex-col justify-center items-center">
    //     <img
    //       src={imageFromApi}
    //       className="h-[450px] w-full"
    //       alt="generated-image"
    //     />
    //     <div className="flex justify-center items-center mt-3">
    //       <button
    //         onClick={handleDownload}
    //         className="font-medium rounded-lg text-sm px-5 py-2.5 text-white text-center bg-red-600 hover:bg-red-700 focus:ring-red-800"
    //       >
    //         Download
    //       </button>
    //     </div>
    //   </div>
    // )}

    //       {loading && (
    //         <div
    //           className="flex h-full items-center justify-center"
    //           role="status"
    //         >
    //           <svg
    //             aria-hidden="true"
    //             className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
    //             viewBox="0 0 100 101"
    //             fill="none"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <path
    //               d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
    //               fill="currentColor"
    //             />
    //             <path
    //               d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
    //               fill="currentFill"
    //             />
    //           </svg>
    //           <span className="sr-only">Loading...</span>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
}
