import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "OpenAI-Organization": process.env.OPENAI_ORG_ID || "",
        "X-Project-ID": process.env.OPENAI_PROJECT_ID || "",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful medical assistant." },
          { role: "user", content: message },
        ],
      }),
    })

    const json = await response.json()

    // Check if the response was successful
    if (!response.ok) {
      console.error("Error response from OpenAI:", json)
      throw new Error("OpenAI API error: " + (json.error?.message || "Unknown error"))
    }

    // Validate that choices exist in the response
    if (!json.choices || json.choices.length === 0) {
      console.error("Unexpected response structure:", json)
      throw new Error("No choices returned from OpenAI API.")
    }

    const aiReply = json.choices[0].message?.content || ""
    return NextResponse.json({ message: aiReply })
  } catch (error) {
    console.error("OpenAI API error:", error)
    return NextResponse.json(
      { message: "Error fetching AI response" },
      { status: 500 }
    )
  }
}
