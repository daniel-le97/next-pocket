/* eslint-disable @typescript-eslint/no-misused-promises */

import { observer } from "mobx-react";
import { useRef } from "react";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import { authsService } from "../services";
import type { UserLogin } from "../../PocketBaseTypes";
import { useForm } from "react-hook-form";
import Pop from "../../utils/Pop";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserLogin>();
  const password = useRef({});
  password.current = watch("password", "");
  const router = useRouter();
  // const onSubmit: SubmitHandler<UserLogin> = (data) => console.log(data);
  async function onSubmit(data: UserLogin) {
    try {
      // console.log(data);

      if (data.password !== data.passwordConfirm) {
        return Pop.error("Passwords do not match");
      }
      data.avatarUrl = `https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${data.username}`;
      // console.log(data);
      // data.emailVisibility=true

      const path = await authsService.signUp(data);
      await router.push(path);
    } catch (error) {
      Pop.error(error);
    }
  }

  return (
    <>
      <main className="  dark flex  min-h-screen w-full flex-col  items-center justify-center bg-gray-300 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="z-50 flex flex-col gap-y-5"
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
        <Link
          href="/login"
          className="mt-3  flex    items-center justify-center gap-2 text-base "
        >
          <FaArrowAltCircleLeft />
          <div>Go to Login</div>
        </Link>

        

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
