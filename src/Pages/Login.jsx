import { Button, Input } from "@heroui/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { schema } from "../Schema/SchemaLogin";
import { Link, useNavigate } from "react-router-dom";
import { sendLogin } from "../Services/authServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { TokenContext } from "../Context/TokenContext";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  const navigate = useNavigate();
  const {setIsLoggedIn}=useContext(TokenContext)


  async function signIn(userData) {
    setLoading(true);
    const response = await sendLogin(userData);
    if (response.message && response.token) {
      localStorage.setItem("token", response.token);
      setIsLoggedIn(response.token)
      navigate("/");
    } else {
      setApiError(response.error);
    }
    setLoading(false);
    console.log(response);
    
  }
  return (
    <>
      <div className=" bg-white rounded-3xl shadow-2xl py-10 px-6 min-w-md">
        <h1 className=" text-2xl mb-4 text-center">Login Now</h1>
        <form onSubmit={handleSubmit(signIn)} className=" flex flex-col gap-4">
          {/* {errors.name && <p {...errors.name?.message}></p>} */}

          <Input
            errorMessage={errors.email?.message}
            isInvalid={Boolean(errors.email)}
            variant="bordered"
            label="Email"
            {...register("email")}
            type="email"
          />

          <Input
            errorMessage={errors.password?.message}
            isInvalid={Boolean(errors.password)}
            variant="bordered"
            label="Password"
            {...register("password")}
            type="password"
          />

          <Button isLoading={loading} type="submit">
            Login
          </Button>
          <div>
            if you haven't account please{" "}
            <Link to={"/register"} className=" text-blue-500">
              sign up
            </Link>{" "}
          </div>
          {apiError && (
            <span className=" text-center text-red-600">{apiError}</span>
          )}
        </form>
      </div>
    </>
  );
}
