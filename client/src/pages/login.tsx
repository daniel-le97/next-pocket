/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @next/next/no-img-element */
import { observer } from "mobx-react";
import { useState } from "react";
import { pb } from "../../utils/pocketBase";
import { AppState } from "../../AppState";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import type { UsersResponse } from "../../PocketBaseTypes/pocketbase-types";
import { Collections } from "../../PocketBaseTypes/pocketbase-types";
import { getRedirectOrPath } from "../../utils/Redirect";
import { membersService } from "@/services/MembersService";

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  //  useEffect(() => {
  //   const loggedInUser = pb.authStore.model
  //   if () {

  //   }
  //  })

  async function login() {
  try {
      const user = await pb
        .collection("users")
        .authWithPassword(username, password);
      console.log(user);
      AppState.user = user.record;
      AppState.user.token = user.token;
      console.log(AppState.user);
      await membersService.getUserServers(user.record.id);
      const path = getRedirectOrPath();
      router.push(path);
  } catch (error) {
    console.error(error)
  }
  }

  async function signUp(): Promise<void> {
    try {
      const data = {
        username,
        password,
        email,
        avatarUrl: `https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${username}`,
        passwordConfirm: password,
      };
      const createdUser = await pb.collection("users").create(data);
      const statusData = {
        user: createdUser.id,
        isOnline: true,
      };
      await pb
        .collection(Collections.UsersStatus)
        .create(statusData);
      await login();
      // await loginWithGithub();
    } catch (err) {
      console.error(err);
    }
  }

  // function signOut() {
  //   pb.authStore.clear();
  // }

  // useEffect(() => {

  // }, []);

  return (
    <>
      <main className="  dark flex  min-h-screen w-full flex-col  items-center justify-center bg-gray-300 dark:bg-zinc-900">
        <div className="shadow-grey-900  container  flex w-1/2   flex-col items-center justify-center  rounded-lg bg-gray-200 p-5 shadow-2xl">
          <h1 className="my-10 text-4xl font-bold ">Login</h1>
          <form
            className="flex flex-col gap-y-5"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              placeholder="Username"
              type="text"
              value={username}
              className="login-input"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Email"
              type="text"
              value={email}
              className="login-input"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              placeholder="Password"
              type="password"
              value={password}
              className="login-input"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signUp}>Sign Up</button>
            <button onClick={login}>Login</button>
          </form>
        </div>
        <div className="container flex items-center justify-center">
          <User user={AppState.user as UsersResponse} />
        </div>

        <div className="shape-blob"></div>
        <div className="shape-blob one"></div>
        <div className="shape-blob two"></div>
      </main>
    </>
  );
}

const User = ({ user } : {user: UsersResponse}) => {
  if (AppState.user != null) {
    return (
      <div className="container mt-5  flex w-1/2 flex-col items-center justify-center rounded-lg bg-slate-300 p-3">
        <h1 className="my-3 font-bold">Welcome!</h1>
        <h2>{user.username}</h2>
        <img
          className="w-1/4 rounded-full"
          src={user.avatarUrl}
          alt={user.username}
        />
        <p>Email: {user.email}</p>
        <p>UserName: {user.username}</p>
        <Link href="/AccountPage">Visit Account Page </Link>
      </div>
    );
  } else return <div></div>;
};
export default observer(Login);

/**
 *   {currentUser ? (
        <p>
          Signed in as {currentUser.username}
          <button onClick={signOut}>Sign Out</button>
        </p>
      ) : (
 */
