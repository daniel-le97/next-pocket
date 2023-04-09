/* eslint-disable @typescript-eslint/no-misused-promises */

import { observer } from "mobx-react";
import { useRef, useState } from "react";
import { pb } from "../../utils/pocketBase";
import { AppState } from "../../AppState";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import type {
  UsersRecord,
  UsersResponse,
} from "../../PocketBaseTypes/pocketbase-types";
import { Collections } from "../../PocketBaseTypes/pocketbase-types";
import { getRedirectOrPath } from "../../utils/Redirect";
import { membersService } from "@/services/MembersService";
import { authsService } from "../services";
import { UserLogin } from "../../PocketBaseTypes";
import { useForm } from "react-hook-form";
import Pop from "../../utils/Pop";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setError,
    formState: { errors },
  } = useForm<UserLogin>();
  const password = useRef({});
  password.current = watch("password", "");
   const router = useRouter();
  // const onSubmit: SubmitHandler<UserLogin> = (data) => console.log(data);
  async function onSubmit(data: UserLogin) {
    try {
      if (data.password !== data.passwordConfirm) {
        return Pop.error("Passwords do not match");
      }
      data.avatarUrl = `https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${data.username}`;
      const path = await authsService.signUp(data);
      await router.push(path);
    } catch (error) {
      Pop.error(error);
    }
  }

  return (
    <>
      <main className="  dark flex  min-h-screen w-full flex-col  items-center justify-center bg-gray-300 dark:bg-zinc-900">
        <div className="shadow-grey-900 container z-10  flex w-1/2   flex-col items-center justify-center  rounded-lg bg-gray-200 p-5 shadow-2xl">
          <h1 className="my-10 text-4xl font-bold ">Create a new Account</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-5"
          >
            {/* register your input into the hook by invoking the "register" function */}
            <input
              {...register("username", { required: true })}
              type="text"
              placeholder={"username"}
              className="login-input"
            />
            {errors.username && <span>This field is required</span>}
            <input
              {...register("email", { required: true })}
              placeholder={"email"}
              type="email"
              className="login-input"
            />
            {errors.email && <span>This field is required</span>}
            <input
              {...register("password", { required: true, minLength: 8 })}
              type="password"
              name="password"
              placeholder={"password"}
              className="login-input"
            />
            {errors.password && <span>This field is required</span>}
            <input
              {...register("passwordConfirm", {
                required: true,
                minLength: 8,
                validate: (value) =>
                  value === password.current || "The passwords do not match",
              })}
              className="login-input"
              type="password"
              name="passwordConfirm"
              placeholder={"confirm password"}
            />
            {errors.passwordConfirm && <span>This field is required</span>}

            <button type="submit" className=" btn-primary">
              Sign Up
            </button>
          </form>
          <Link href="/login" className="mt-2 flex gap-2">
            <FaArrowAltCircleRight className="text-2xl" />
            <div>go to signup</div>
          </Link>
        </div>
        {/* <div className="container flex items-center justify-center">
          <User user={AppState.user as UsersResponse} />
        </div> */}

        <div className="shape-blob"></div>
        <div className="shape-blob one"></div>
        <div className="shape-blob two"></div>
      </main>
    </>
  );
}

// const User = ({ user }: { user: UsersResponse }) => {
//   if (AppState.user != null) {
//     return (
//       <div className="container mt-5  flex w-1/2 flex-col items-center justify-center rounded-lg bg-slate-300 p-3">
//         <h1 className="my-3 font-bold">Welcome!</h1>
//         <h2>{user.username}</h2>
//         <img
//           className="w-1/4 rounded-full"
//           src={user.avatarUrl}
//           alt={user.username}
//         />
//         <p>Email: {user.email}</p>
//         <p>UserName: {user.username}</p>
//         <Link href="/AccountPage">Visit Account Page </Link>
//       </div>
//     );
//   } else return <div></div>;
// };
export default observer(SignUp);
