"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function HomeView() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  if (!session) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex flex-col gap-y-4 p-4">
      <p>Logged in as {session.user.name}</p>
      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/sign-in");
              },
            },
          })
        }
      >
        Log Out
      </Button>
    </div>
  );
}
