import { NextRequest, NextResponse } from "next/server";
import { streamVideo } from "@/lib/stream-video";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const meetingId = searchParams.get("meetingId");
    const agentUserId = searchParams.get("agentUserId");

    if (!meetingId || !agentUserId) {
      return NextResponse.json(
        { error: "Missing meetingId or agentUserId" },
        { status: 400 },
      );
    }

    console.log("====================================");
    console.log("TESTING STREAM AI AGENT");
    console.log("Meeting ID:", meetingId);
    console.log("Agent User ID:", agentUserId);
    console.log("====================================");

    const call = await streamVideo.video.call(
      "default",
      meetingId,
    );

    console.log("Call object created");
    console.log("connecting OpenAI....");
    const realtimeClient =
      await streamVideo.video.connectOpenAi({
        call,
        openAiApiKey: process.env.OPENAI_API_KEY!,
        agentUserId: agentUserId,
        model: "gpt-4o-realtime-preview",
      });

    console.log("OpenAI connected successfully");

    realtimeClient.updateSession({
      instructions: "You are a helpful AI assistant",
    });

    console.log("Session updated with instructions");

    return NextResponse.json({
      success: true,
      message: "OpenAI connected successfully",
      meetingId,
      agentUserId,
    });
  } catch (error) {
    console.log("=====================================");
    console.error("STREAM AI AGENT FAILED");
    console.log("=====================================");

    console.dir(error, { depth: null, showHidden: true });

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 },
    );
  }
}
