#!/bin/bash

source .env

if [ -z "$GEMINI_API_KEY" ]; then
  echo "GEMINI_API_KEY not set"
  exit 1
fi

export GOOGLE_API_KEY="$GEMINI_API_KEY"

node -e '
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

const models = ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-3-pro-preview"];

async function testGeminiModel(model) {
  try {
    const response = await ai.models.generateContent({
      model: model,
      config: {
        systemInstruction: "Respond with \"ok\"",
        temperature: 0,
        maxOutputTokens: 5,
      },
      contents: "Hello world",
    });
    const result = !!response.text?.trim();
    console.log(model + ": valid");
  } catch (error) {
    let status = "invalid";
    if (error.status === 429) status = "rate limited";
    else if (error.status === 404) status = "not supported";
    console.log(model + ": " + status);
  }
}

async function testAll() {
  for (const model of models) {
    await testGeminiModel(model);
  }
}

testAll();
'

echo "Testing SambaNova..."
if [ -z "$SAMBANOVA_API_KEY" ]; then
  echo "sambanova: invalid (key not set)"
  exit 1
fi

response=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Bearer $SAMBANOVA_API_KEY" -H "Content-Type: application/json" -d '{"stream": true, "model": "gpt-oss-120b", "messages": [{"role": "system", "content": "You are a helpful assistant"}, {"role": "user", "content": "Hello"}]}' -X POST https://api.sambanova.ai/v1/chat/completions)

if [ "$response" -eq 200 ]; then
  echo "sambanova: valid"
elif [ "$response" -eq 429 ]; then
  echo "sambanova: rate limited"
else
  echo "sambanova: invalid"
fi