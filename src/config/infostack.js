
// node --version # Should be >= 18
// npm install @google/generative-ai

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = "AIzaSyAaMV9taILoAt_m86O4oZ99rvZ0rhHS-iI";

async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
    ],
  });
 
  
  const result = await chat.sendMessage(prompt);
  const response = result.response;
  console.log(response.text());
  return response.text();
}
async function runChatWithRetry(prompt, retries = 3, backoff = 1000) {
  try {
    const response = await runChat(prompt); // Replace with your function that makes API calls
    return response;
  } catch (error) {
    if (error.response && error.response.status === 429 && retries > 0) {
      await new Promise(resolve => setTimeout(resolve, backoff));
      return runChatWithRetry(prompt, retries - 1, backoff * 2);
    }
    throw error;
  }
}

export default runChat;