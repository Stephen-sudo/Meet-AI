import {
  StreamTheme,
  useCall,
} from "@stream-io/video-react-sdk";
import { useState } from "react";
import { CallLobby } from "./call-lobby";
import { CallActive } from "./call-active";
import { CallEnded } from "./call-ended";

interface Props {
  meetingName: string;
}

export const CallUI = ({ meetingName }: Props) => {
  const call = useCall();
  const [show, setShow] = useState<
    "lobby" | "call" | "ended"
  >("lobby");

  const handleJoin = async () => {
    if (!call) return;

    console.log("====== JOIN BUTTON ======");
    console.log("handleJoin called");
    console.log(
      "Calling state BEFORE:",
      call.state.callingState,
    );

    try {
      console.log(
        "call state before join:",
        call.state.callingState,
      );
      await call.join();

      console.log("call.join SUCCESS");
      console.log(
        "Calling state AFTER:",
        call.state.callingState,
      );

      setShow("call");
    } catch (error) {
      console.error("CALL JOIN FAILED:");
      console.error(error);
    }
  };
  const handleLeave = async () => {
    if (!call) return;
    call.endCall();
    setShow("ended");
  };

  return (
    <StreamTheme className="h-full">
      {show === "lobby" && (
        <CallLobby onJoin={handleJoin} />
      )}
      {show === "call" && (
        <CallActive
          onLeave={handleLeave}
          meetingName={meetingName}
        />
      )}
      {show === "ended" && <CallEnded />}
    </StreamTheme>
  );
};
