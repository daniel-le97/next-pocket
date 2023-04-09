/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm, SubmitHandler } from "react-hook-form";
import type { UserLogin } from "../../PocketBaseTypes";
import Pop from "../../utils/Pop";
import { authsService } from "../services";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<UserLogin>();
  // const onSubmit: SubmitHandler<UserLogin> = (data) => console.log(data);
  async function onSubmit(data: UserLogin) {
    try {
      if (data.password !== data.passwordConfirm) {
        return Pop.error("Passwords do not match");
      }
      await authsService.signUp(data);
    } catch (error) {
      Pop.error(error);
    }
  }
  watch(["password", 'passwordConfirm']); // watch input value by passing the name of it
  
  // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input
        {...register("username", { required: true })}
        placeholder={"username"}
      />
      {errors.username && <span>This field is required</span>}
      <input {...register("email", { required: true })} placeholder={"email"} />
      {errors.email && <span>This field is required</span>}
      <input
        {...register("password", { required: true })}
        placeholder={"password"}
      />
      {errors.password && <span>This field is required</span>}
      <input
        {...register("passwordConfirm", { required: true})}
        onChange={(e) => console.log(e.target.value)}
        placeholder={"confirm password"}
      />
      {errors.passwordConfirm && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
