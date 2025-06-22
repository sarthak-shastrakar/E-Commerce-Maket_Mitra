// const axios = require("axios");

// const CLARIFAI_API_KEY = "185500483e884588bc2b6527a39a70e9"; // 🔐 Replace with your key
// const CLARIFAI_MODEL_ID = "general-image-recognition"; // Built-in model

// async function getImageTagsFromImage(imageUrl) {
//   try {
//     const response = await axios.post(
//       "https://api.clarifai.com/v2/models/" + CLARIFAI_MODEL_ID + "/outputs",
//       {
//         inputs: [
//           {
//             data: {
//               image: {
//                 url: imageUrl
//               }
//             }
//           }
//         ]
//       },
//       {
//         headers: {
//           "Authorization": `Key ${CLARIFAI_API_KEY}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     const concepts = response.data.outputs[0].data.concepts;
//     const tags = concepts.map(concept => concept.name);
//     return tags;
//   } catch (err) {
//     console.error("Clarifai error:", err.response?.data || err.message);
//     return [];
//   }
// }

const axios = require("axios");

// ✅ Use environment variable for safety
const CLARIFAI_API_KEY = "64ced974da184cfea219536db168a4f1"; 
const CLARIFAI_MODEL_ID = "general-image-recognition";

async function getImageTagsFromImage(imageUrl) {
  try {
    const response = await axios.post(
      `https://api.clarifai.com/v2/models/${CLARIFAI_MODEL_ID}/outputs`,
      {
        inputs: [
          {
            data: {
              image: {
                url: imageUrl
              }
            }
          }
        ]
      },
      {
        headers: {
          Authorization: `Key ${CLARIFAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const concepts = response.data.outputs[0].data.concepts;
    return concepts.map(c => c.name);
  } catch (error) {
    console.error("Clarifai API Error:", error.response?.data || error.message);
    return []; // Return empty list if there's an error
  }
}

module.exports = getImageTagsFromImage;
