"use client";

import { useSession, signIn } from "next-auth/react";

const CreateMeetLink = () => {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;
  console.log(accessToken);

  const createMeetLink = async () => {
    if (!session) {
      alert("You need to be logged in");
      return;
    }

    if (!accessToken) {
      signIn("google");
      return;
    }

    const response = await fetch("/api/createMeet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <h1>Create Google Meet Link</h1>
      <button onClick={createMeetLink}>Create Google Meet Link</button>
    </>
  );
};

export default CreateMeetLink;