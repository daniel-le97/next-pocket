import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import {  pb } from "../../utils/pocketBase";
import { AppState } from "../../AppState";
import Link from "next/link.js";
import { useRouter } from "next/router.js";

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const router = useRouter();
  
  async function login() {
    const user = await pb
      .collection("users")
      .authWithPassword(username, password);
    console.log(user);
    AppState.user = user.record;
    AppState.user.token = user.token;
    console.log(AppState.user);
        router.push("/");
  }

  async function signUp() {
    try {
      const data = {
        username,
        password,
        email,
        avatarUrl: "https://api.dicebear.com/5.x/bottts-neutral/svg",
        passwordConfirm: password,
        name: "hi mom!",
      };
      const createdUser = await pb.collection("users").create(data);
      await login();
      // await loginWithGithub();
    } catch (err) {
      console.error(err);
    }
  }

  function signOut() {
    pb.authStore.clear();
  }

  return (
    <>
      <div className="shadow-grey-900  container mt-96  flex w-1/2   flex-col items-center justify-center  rounded-lg bg-gray-200 p-5 shadow-2xl">
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
        <User user={AppState.user} />
      </div>
    </>
  );
}


const User = ({ user }) => {
  if (AppState.user != null) {
    return (
      <div className="container mt-5  flex w-1/2 flex-col items-center justify-center rounded-lg bg-slate-300 p-3">
        <h1 className="my-3 font-bold">Welcome!</h1>
        <h2>{user.name}</h2>
        <img
          className="w-1/4 rounded-full"
          src={user.avatarUrl}
          alt={user.name}
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
