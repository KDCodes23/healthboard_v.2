import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const { message, emotion, intent } = await req.json();

    // Validate required environment variables
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("Missing OpenAI API key in environment variables.");
    }

    // Prepare the request to OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful medical assistant." },
          { role: "user", content: message },
        ],
        user_context: {
          emotion, // Optional field for emotion detection
          intent,  // Optional field for intent detection
        },
        temperature: 0.7, // Adjust temperature for response creativity
      }),
    });

    const json = await response.json();

    // Handle errors from OpenAI API
    if (!response.ok) {
      console.error("Error response from OpenAI:", json);
      throw new Error(
        `OpenAI API error: ${json.error?.message || "Unknown error"}`
      );
    }

    // Validate response structure
    if (!json.choices || json.choices.length === 0) {
      console.error("Unexpected response structure:", json);
      throw new Error("No choices returned from OpenAI API.");
    }

    // Extract AI reply from the response
    const aiReply = json.choices[0].message?.content || "";

    return NextResponse.json({ message: aiReply });
  } catch (error) {
    console.error("Error in /api/chat-patient:", error);
    return NextResponse.json(
      { message: "Error fetching AI response" },
      { status: 500 }
    );
  }
}
