export const checkGroup = async (code: string) => {
  const res = await fetch("http://localhost:5000/api/groups/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Invalid group code");
  }

  return data;
};
