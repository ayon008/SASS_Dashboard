import { auth, signOut } from "@/app/auth";
import { Button } from "@/components/ui/button";

const page = async () => {
  const session = await auth();
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
