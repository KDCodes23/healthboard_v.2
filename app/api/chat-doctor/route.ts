import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const { message, emotion, intent } = await req.json();
    const lowerMessage = message.toLowerCase();

    // Check if the user is asking for links or references
    if (lowerMessage.includes("link") || lowerMessage.includes("reference")) {
      const curatedLinks = `
Here are some reputable resources:
• Mayo Clinic: https://www.mayoclinic.org
• CDC: https://www.cdc.gov
• MedlinePlus: https://medlineplus.gov
• WebMD: https://www.webmd.com
      `;
      return NextResponse.json({ message: curatedLinks });
    }

    // Validate required environment variables
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { message: "Missing OpenAI API key in environment variables." },
        { status: 500 }
      );
    }

    // Create a system message that incorporates emotion and intent if provided
    let systemContent = "You are a helpful medical assistant.";
    if (emotion || intent) {
      systemContent += " The user appears to be";
      if (emotion) systemContent += ` feeling ${emotion}`;
      if (emotion && intent) systemContent += " and";
      if (intent) systemContent += ` looking to ${intent}`;
      systemContent += ".";
    }

    // Prepare the request to OpenAI API with correct format
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemContent },
          { role: "user", content: message },
        ],
        temperature: 0.7,
      }),
    });

    // Handle non-200 responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Error response from OpenAI:", errorData);
      return NextResponse.json(
        { 
          message: "Error from OpenAI API", 
          details: errorData.error?.message || "Unknown error" 
        },
        { status: response.status }
      );
    }

    // Parse response
    const json = await response.json();

    // Validate response structure
    if (!json.choices || json.choices.length === 0) {
      console.error("Unexpected response structure:", json);
      return NextResponse.json(
        { message: "Invalid response format from OpenAI API" },
        { status: 500 }
      );
    }

    // Extract AI reply from the response
    const aiReply = json.choices[0].message?.content || "";

    return NextResponse.json({ message: aiReply });
  } catch (error) {
    console.error("Error in /api/chat-doctor:", error);
    return NextResponse.json(
      { 
        message: "Error processing request",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
