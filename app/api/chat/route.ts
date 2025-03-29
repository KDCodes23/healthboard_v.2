import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message:
      "Hello from GET! Send a POST request with a 'message' field to interact with the AI.",
  });
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "No message provided." },
        { status: 400 }
      );
    }

    const perplexityKey = process.env.PERPLEXITY_API;
    if (!perplexityKey) {
      return NextResponse.json({ error: "Server Error." }, { status: 500 });
    }

    // Updated prePrompt instructing the AI to be a general consultant for health needs
    const prePrompt =
      "You are a general consultant for health needs and must not digress from it.";

    const payload = {
      model: "sonar",
      messages: [
        {
          role: "system",
          content: prePrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 8192,
      temperature: 0.7,
      top_p: 0.35,
      top_k: 10,
      search_domain_filter: null,
      return_images: false,
      return_related_questions: false,
      search_recency_filter: "month",
      presence_penalty: 0,
      frequency_penalty: 1,
      response_format: null,
    };

    const response = await fetch(
      "https://api.perplexity.ai/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${perplexityKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Error calling Perplexity API." },
        { status: response.status }
      );
    }

    const result = await response.json();
    const perplexityResponse =
      result.choices && result.choices[0]?.message?.content;
    if (!perplexityResponse) {
      return NextResponse.json(
        { error: "Invalid response from Perplexity API." },
        { status: 500 }
      );
    }

    // Clean up the response in case it is wrapped in markdown code blocks
    let cleaned = perplexityResponse.trim();
    if (cleaned.startsWith("```")) {
      const firstNewlineIndex = cleaned.indexOf("\n");
      if (firstNewlineIndex !== -1) {
        cleaned = cleaned.slice(firstNewlineIndex + 1);
      }
      if (cleaned.endsWith("```")) {
        cleaned = cleaned.slice(0, -3).trim();
      }
    }

    let parsedResponse;
    console.log("Cleaned response:", cleaned);
    // Only attempt to parse if the response appears to be JSON
    if (
      (cleaned.startsWith("{") && cleaned.endsWith("}")) ||
      (cleaned.startsWith("[") && cleaned.endsWith("]"))
    ) {
      try {
        parsedResponse = JSON.parse(cleaned);
      } catch (error) {
        console.error("Error parsing response JSON:", error);
        parsedResponse = cleaned;
      }
    } else {
      parsedResponse = cleaned;
    }

    return NextResponse.json({ response: parsedResponse }, { status: 200 });
  } catch (error) {
    console.error("Perplexity API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
