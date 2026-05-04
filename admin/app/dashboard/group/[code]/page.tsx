"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { useParams } from "next/navigation";

export default function AdminGroupPage() {
  const params = useParams();

  const [students, setStudents] = useState<any[]>([]);
  const [helpQueue, setHelpQueue] = useState<any[]>([]); // 🔥 NEW
  const code = Array.isArray(params.code) ? params.code[0] : params.code;
  useEffect(() => {
    if (!code) return;

    // admin joins room
    socket.emit("join_group", {
      groupCode: code,
      student: { role: "admin" },
    });

    // 🟢 student join
    socket.on("student_joined", (data) => {
      setStudents((prev) => [...prev, data]);
    });

    // 🔴 student leave
    socket.on("student_disconnected", (data) => {
      setStudents((prev) => prev.filter((s) => s.socketId !== data.socketId));
    });

    // 🔥 HELP REQUEST LISTENER (ეს გაკლდა)
    socket.on("help_requested", (data) => {
      setHelpQueue((prev) => [...prev, data]);
    });

    socket.emit("join_group", {
      groupCode: code,
      student: { role: "admin" },
    });

    return () => {
      socket.off("student_joined");
      socket.off("student_disconnected");
      socket.off("help_requested"); // 🔥 cleanup
    };
  }, [code]);

  // 🔥 connect button logic
  const startHelp = (h: any) => {
    socket.emit("help_started", {
      socketId: h.socketId,
    });

    // remove from queue locally
    setHelpQueue((prev) => prev.filter((item) => item.socketId !== h.socketId));
  };

  return (
    <div>
      <h1>Live Group: {code}</h1>

      {/* 🟢 STUDENTS */}
      <h2>Students</h2>
      {students.map((s) => (
        <div key={s.socketId}>
          <p>👤 {s.student?.fullName || "Unknown"}</p>
          <p>🆔 {s.student?.rustDeskId}</p>
        </div>
      ))}

      {/* 🔥 HELP QUEUE */}
      <h2>Help Requests</h2>
      {helpQueue.length === 0 && <p>No requests</p>}

      {helpQueue.map((h) => (
        <div key={h.socketId}>
          <p>🆘 {h.student.fullName}</p>

          <button onClick={() => startHelp(h)}>Connect</button>
        </div>
      ))}
    </div>
  );
}
