import { NextResponse } from "next/server";
import { OpenAIRealtimeWebSocket } from "openai/realtime/websocket";

export async function GET() {
  return new Promise<NextResponse>((resolve) => {
    console.log("===== TESTING OPENAI REALTIME =====");

    const rt = new OpenAIRealtimeWebSocket({
      model: "gpt-realtime",
    });

    const timeout = setTimeout(() => {
      console.log("Realtime test timed out");

      rt.close();

      resolve(
        NextResponse.json(
          {
            success: false,
            error: "Realtime connection timed out",
          },
          { status: 500 },
        ),
      );
    }, 10000);

    rt.on("session.created", (event) => {
      console.log("REALTIME CONNECTION SUCCESS");
      console.dir(event, { depth: null });

      clearTimeout(timeout);
      rt.close();

      resolve(
        NextResponse.json({
          success: true,
          message: "OpenAI Realtime connection works",
        }),
      );
    });

    rt.on("error", (error) => {
      console.log("REALTIME CONNECTION FAILED");
      console.dir(error, { depth: null });

      clearTimeout(timeout);

      resolve(
        NextResponse.json(
          {
            success: false,
            error: String(error),
          },
          { status: 500 },
        ),
      );
    });
  });
}
