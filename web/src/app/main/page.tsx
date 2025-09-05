import Profile from "@/components/teste";
import { auth0 } from "@/lib/auth0";

export default async function Page() {
  const session = await auth0.getAccessToken();
  console.log("session", session);

  return (
    <div>
      <h1>Home Page</h1>
      <Profile />
      <a href="/auth/logout">Logout</a>
    </div>
  );
}
