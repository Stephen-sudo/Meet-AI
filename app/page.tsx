"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { data: session } = authClient.useSession();

  const onSubmit = () => {
    authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onSuccess: () => {
          window.alert("User created!");
        },
        onError: () => {
          window.alert("Something went wrong ");
        },
      }
    );
  };
  const onSignIn = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          window.alert("User created!");
        },
        onError: () => {
          window.alert("Something went wrong ");
        },
      }
    );
  };

  if (session) {
    return (
      <div className="p-4 text-2xl">
        <p>Welcome, {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign out</Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <div className="flex p-4 gap-y-4 flex-col ">
        <Input
          placeholder="Email"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          placeholder="Name"
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={onSubmit}>create Account</Button>
      </div>

      <div className="flex p-4 gap-y-4 flex-col ">
        <Input
          placeholder="Email"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={onSignIn}>Login</Button>
      </div>
    </div>
  );
}
