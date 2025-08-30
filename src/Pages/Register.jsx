import { Button, Input, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { sendRegister } from "../Services/authServices";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { schema } from "../Schema/SchemaRegister";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const navigate = useNavigate();
  async function signUp(userdata) {
    console.log(userdata);
    setLoading(true);
    const response = await sendRegister(userdata);
    if (response.message) {
      navigate("/login");
    } else {
      setApiError(response.error);
    }
    setLoading(false);
    console.log(response);
  }

  return (
    <>
      <div className=" bg-white rounded-3xl shadow-2xl py-10 px-6 min-w-md">
        <h1 className=" text-2xl mb-4 text-center">Register Now</h1>
        <form onSubmit={handleSubmit(signUp)} className=" flex flex-col gap-4">
          <Input
            errorMessage={errors.name?.message}
            isInvalid={Boolean(errors.name)}
            variant="bordered"
            label="Name"
            {...register("name")}
            type="text"
          />
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

          <Input
            errorMessage={errors.rePassword?.message}
            isInvalid={Boolean(errors.rePassword)}
            variant="bordered"
            label="RePassword"
            {...register("rePassword")}
            type="password"
          />

          <div className="flex gap-4">
            <Input
              errorMessage={errors.dateOfBirth?.message}
              isInvalid={Boolean(errors.dateOfBirth)}
              variant="bordered"
              label="DateOfBirth"
              {...register("dateOfBirth")}
              type="date"
            />
            <Select
              errorMessage={errors.gender?.message}
              isInvalid={Boolean(errors.gender)}
              variant="bordered"
              {...register("gender")}
              label="Select your gender"
            >
              <SelectItem key={"male"}>Male</SelectItem>
              <SelectItem key={"female"}>Female</SelectItem>
            </Select>
          </div>
          <Button isLoading={loading} type="submit">
            Register
          </Button>
          <div>
            if you have account please{" "}
            <Link to={"/login"} className=" text-blue-500">
              log in
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
