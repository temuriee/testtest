"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function GroupCreate() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newGroup: any) => {
      await fetch("http://localhost:5000/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGroup),
      });
    },

    onSuccess: () => {
      // 🔥 THIS IS THE IMPORTANT FIX
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });

  const createGroup = async () => {
    await fetch("http://localhost:5000/api/groups/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, code }),
    });

    mutation.mutate({ name: "JS", code: "JS-101" });
    alert("Group created");
  };

  return (
    <div>
      <h1>Create Group</h1>

      <input
        placeholder="Group name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Group code (JS-101)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button onClick={createGroup} className="border-2 rounded-full p-2">
        Create
      </button>
    </div>
  );
}
