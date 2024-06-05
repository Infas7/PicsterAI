import fs from "fs";
import client from "../utils/monster_api.cjs";
import { uploadImage } from "../utils/cloudinaryUtil.js";

export const generateImage = async (req, res) => {
  const { prompt } = req.body;

  const url = "https://api.getimg.ai/v1/stable-diffusion-xl/text-to-image";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.GET_IMG_API_KEY}`,
    },
    body: JSON.stringify({ prompt: prompt }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return res.status(200).json({ api_data: data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const editImageUsingImage = async (req, res) => {
  const { prompt } = req.body;
  const imageStream = fs.readFileSync(req.file.path);

  const uploadResult = await uploadImage(imageStream, "temp_img");

  const model = "img2img";
  const input = {
    prompt: prompt,
    init_image_url: uploadResult.secure_url,
  };

  client
    .get_response(model, input)
    .then((result) => {
      client
        .wait_and_get_result(result.process_id)
        .then((result) => {
          // Handle the generated content result
          fs.unlinkSync(req.file.path);
          return res.status(200).json({ api_data: result });
        })
        .catch((error) => {
          fs.unlinkSync(req.file.path);
          return res.status(500).json({ error: error.message });
        });
    })
    .catch((error) => {
      fs.unlinkSync(req.file.path);
      return res.status(500).json({ error: error.message });
    });
};
