import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    console.log("Testing API");
    console.log(
      "OPenAI key exists:",
      !!process.env.OPENAI_API_KEY,
    );

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: "Connection Successful!",
    });

    console.log("OpenAI response:", response.output_text);
    return NextResponse.json({
      success: true,
      response: response.output_text,
    });
  } catch (error) {
    console.error("OPENAI TEST FAILED:");
    console.dir(error, { depth: null, showHidden: true });

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 },
    );
  }
}
