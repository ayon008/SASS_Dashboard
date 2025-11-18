import { auth, signOut } from "@/app/auth";
import { Button } from "@/components/ui/button";
import React from "react";

const page = async () => {
  const session = await auth();
  console.log("session", session);
  return (
    <html>
      <body>
        <div>{JSON.stringify(session)}</div>
        <div>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit">Sign Out</Button>
          </form>
        </div>
      </body>
    </html>
  );
};

export default page;
