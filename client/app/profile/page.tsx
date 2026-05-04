"use client";

import { socket } from "@/lib/socket";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function Profile() {
  const [name, setName] = useState("");
  const [rustdeskId, setRustdeskId] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");

  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("student");

    if (saved) {
      const data = JSON.parse(saved);
      setName(data.name);
      setRustdeskId(data.rustdeskId);
      setPassword(data.password);
    }
  }, []);

  useEffect(() => {
    const groupCode = localStorage.getItem("groupCode");
    const student = JSON.parse(localStorage.getItem("student") || "{}");

    socket.emit("join_group", {
      groupCode,
      student,
    });
  }, []);

  const save = () => {
    const data = { name, rustdeskId, password };

    localStorage.setItem("student", JSON.stringify(data));

    router.push("/group");
  };

  return (
    <div>
      <h1>Profile</h1>

      <input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="RustDesk ID"
        value={rustdeskId}
        onChange={(e) => setRustdeskId(e.target.value)}
      />

      <input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={save}>Save</button>
    </div>
  );
}
