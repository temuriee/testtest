"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { checkGroup } from "@/lib/api";

export default function Home() {
  const router = useRouter();
  const [groupCode, setGroupCode] = useState("");

  const mutation = useMutation({
    mutationFn: checkGroup,

    onSuccess: () => {
      localStorage.setItem("groupCode", groupCode);
      router.push("/profile");
    },

    onError: (err: any) => {
      alert(err.message);
    },
  });

  const joinGroup = () => {
    if (!groupCode) return;

    mutation.mutate(groupCode);
  };

  return (
    <div>
      <h1>Enter Group Code</h1>

      <input
        placeholder="JS-101"
        value={groupCode}
        onChange={(e) => setGroupCode(e.target.value)}
      />

      <button onClick={joinGroup} disabled={mutation.isPending}>
        {mutation.isPending ? "Checking..." : "Join"}
      </button>
    </div>
  );
}
