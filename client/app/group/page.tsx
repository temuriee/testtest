"use client";

import { socket } from "@/lib/socket";
import { useState } from "react";

export default function Profile() {
  const [status, setStatus] = useState("idle");

  const requestHelp = () => {
    const groupCode = localStorage.getItem("groupCode");
    const student = JSON.parse(localStorage.getItem("student") || "{}");

    socket.emit("help_requested", {
      groupCode,
      student,
    });

    setStatus("waiting");
  };

  return (
    <div>
      <h1>Profile</h1>

      <button onClick={requestHelp} disabled={status === "waiting"}>
        {status === "waiting" ? "Waiting for mentor..." : "Ask for Help"}
      </button>
    </div>
  );
}
