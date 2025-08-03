"use client";
import { useAuthContext } from "@/context/AuthContextProvider";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations";
import { z } from "zod";
import { loginUser } from "@/services/user";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import ButtonWithLoader from "./ButtonWithLoader";
import { useStateContext } from "@/context/StateContextProvider";

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm: FC = () => {
  const { setUser } = useAuthContext();
  const { loading, setLoading } = useStateContext();
  const [responseMessage, setResponseMessage] = useState("");
  const [responseError, setResponseError] = useState(false);

  const formController = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      const res = await loginUser(data.identifier, data.password);
      if (res.success) {
        setUser(res.response);
        toast.success("Login successful!", {
          description: "Welcome back!",
          duration: 2000,
        });
        setResponseMessage("Login successful!");
        setResponseError(false);
      } else {
        throw new Error(res.response || "Login failed");
      }
    } catch (error) {
      toast.error((error as Error).message || "An error occurred during login", {
        description: "Please try again.",
        duration: 2000,
      });
      setResponseMessage((error as Error).message);
      setResponseError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...formController}>
      <form
        onSubmit={formController.handleSubmit(onSubmit)}
        className="text-left flex flex-col gap-2 items-center"
      >
        <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 items-start">
          <FormField
            control={formController.control}
            name="identifier"
            render={({ field }) => (
              <FormItem className="w-[200px]">
                <FormLabel
                  className={formController.formState.errors.identifier ? "text-red-600" : ""}
                >
                  Username or Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your username or email"
                    className="border-neutral-400 dark:border-neutral-600"
                    value={field.value}
                    onChange={e => {
                      field.onChange(e.target.value);
                      setResponseMessage("");
                      setResponseError(false);
                    }}
                  />
                </FormControl>
                <FormMessage className="text-[12px] text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={formController.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-[200px]">
                <FormLabel
                  className={formController.formState.errors.password ? "text-red-600" : ""}
                >
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="border-neutral-400 dark:border-neutral-600"
                    value={field.value}
                    width={400}
                    onChange={e => {
                      field.onChange(e.target.value);
                      setResponseMessage("");
                      setResponseError(false);
                    }}
                  />
                </FormControl>
                <FormMessage className="text-[12px] text-red-600" />
              </FormItem>
            )}
          />
        </div>
        {responseMessage && (
          <div
            className={`text-center text-sm ${responseError ? "text-red-600" : "text-green-600"}`}
          >
            {responseMessage}
          </div>
        )}
        <ButtonWithLoader
          type="submit"
          className="mt-4 w-1/2 sm:w-[150px] bg-gradient-to-r from-cyan-500 to-purple-500 hover:bg-gradient-to-l hover:from-cyan-500 hover:to-purple-500 text-white text-md"
          loading={loading}
        >
          Login
        </ButtonWithLoader>
      </form>
    </Form>
  );
};

export default LoginForm;
