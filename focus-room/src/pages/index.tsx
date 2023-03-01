/* eslint-disable @next/next/no-img-element */
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  if (session) {
    return (
      <>
        <div>
          name:{session.user.name} <br />
          image:
          <img src={session.user.image} alt="" height={100} width={100} />
          <br />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          {loading ? (
            <>Loading ...</>
          ) : (
            <>
              Not signed in <br />
              <button onClick={() => signIn()}>Sign in</button>
            </>
          )}
        </div>
      </>
    );
  }
}
