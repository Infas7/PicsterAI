import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function TextToImagePage() {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!prompt) {
      setError("Please provide a prompt");
      return;
    }
    setImageData(null);
    setError("");
    setLoading(true);

    const headers = {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch("http://localhost:3000/image/generate", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ prompt }),
    });

    const jsonData = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(jsonData.error);
    }

    if (response.ok) {
      setLoading(false);
      setImageData(jsonData.api_data.image);
      setPrompt("");
    }
  };

  const handleDownload = () => {
    if (imageData) {
      const linkSource = `data:image/png;base64,${imageData}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.download = "generated-image.png";
      downloadLink.click();
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-300">
      <div className="w-3/4 max-w-2xl border bg-gray-600 border-gray-500 rounded-lg shadow-md p-5 flex-col items-center justify-center gap-5">
        <h1 className="text-2xl font-semibold text-center text-white mb-4">
          Generate From Text
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
        {error && (
          <div className="bg-red-500 text-white border rounded-md border-gray-400 font-semibold text-center py-1 my-3">
            {error}
          </div>
        )}
        <div className="w-full flex items-center justify-center mt-4">
          <button
            onClick={handleClick}
            disabled={loading}
            className="w-full font-bold rounded-lg text-sm px-5 py-2 text-white text-center bg-fuchsia-600 hover:bg-fuchsia-700 flex items-center justify-center disabled:opacity-60 "
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

        {imageData && (
          <div className="flex-col justify-center items-center w-full mt-5">
            <img
              src={`data:image/png;base64,${imageData}`}
              className="h-[450px] w-full"
              alt="generated-image"
            />
            <div className="flex justify-end items-center mt-4">
              <button
                onClick={handleDownload}
                className="font-bold rounded-lg text-sm px-5 py-2 text-white text-center bg-red-600 hover:bg-red-700 focus:ring-red-800"
              >
                Download
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
