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
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { AppState } from "~/AppState";
import { useEffect } from "react";

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
      Pop.success(`Welcome back ${AppState.user?.username}!`)
      await router.push(path);
    } catch (error) {
      Pop.error(error);
    }
  }

useEffect(()=>{
  
})

  return (
    <>
      <main className="  dark flex  min-h-screen w-full flex-col  items-center justify-center bg-gray-300 ">
       
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-5 z-50"
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
            <button type="submit" className=" btn-primary">
              Login
            </button>
          </form>

          <Link href={"/signup"} className="  mt-3 flex gap-2 text-base justify-center items-center">
            <div>Not a member? Sign up now </div>

            <FaArrowAltCircleRight />
          </Link>
        
        <div className="shape-blob"></div>
        <div className="shape-blob one"></div>
        <div className="shape-blob two"></div>
      </main>
    </>
  );
}

export default observer(Login);
