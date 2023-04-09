/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @next/next/no-img-element */
import { observer } from "mobx-react";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import { authsService } from "../services";
import type { UserLogin } from "../../PocketBaseTypes";
import { useForm } from "react-hook-form";
import Pop from "../../utils/Pop";
import { FaArrowAltCircleLeft } from "react-icons/fa";

function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>();

  async function onSubmit(data: UserLogin) {
    try {
      // console.log(data);
      if (!data.email || !data.password) {
        return Pop.error("please provide an email and password");
      }
      const path = await authsService.login(data);
      await router.push(path)
    } catch (error) {
      Pop.error(error);
    }
  }

  return (
    <>
      <main className="  dark flex  min-h-screen w-full flex-col  items-center justify-center bg-gray-300 dark:bg-zinc-900">
        <div className="shadow-grey-900 container z-10  flex w-1/2   flex-col items-center justify-center  rounded-lg bg-gray-200 p-5 shadow-2xl">
          <h1 className="my-10 text-4xl font-bold ">Login</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-5"
          >
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
            <button type="submit" className=" btn-primary">Login</button>
          </form>
          
          <Link href={"/signup"} className=" mt-2 flex gap-2">
            <FaArrowAltCircleLeft className="text-2xl" />
            <div>go to signup</div>
          </Link>
        </div>
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
export default observer(Login);

/**
 *   {currentUser ? (
        <p>
          Signed in as {currentUser.username}
          <button onClick={signOut}>Sign Out</button>
        </p>
      ) : (
 */
