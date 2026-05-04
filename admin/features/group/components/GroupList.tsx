"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Groups() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/groups");
      return res.json();
    },
  });

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

  const createGroup = () => {
    mutation.mutate({});
  };

  return (
    <div className="flex flex-col  max-w-50">
      {data?.data?.map((g: any) => (
        <div className="" key={g._id}>
          {g.name} | {g.code}
        </div>
      ))}
    </div>
  );
}
