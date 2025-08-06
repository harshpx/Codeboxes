import { useAuthContext } from "@/context/AuthContextProvider";
import useDebounce from "@/hooks/useDebounce";
import { signupSchema } from "@/lib/validations";
import { checkEmailAvailability, checkUsernameAvailability, registerUser } from "@/services/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import ButtonWithLoader from "./ButtonWithLoader";
import { useStateContext } from "@/context/StateContextProvider";
import { Loader } from "lucide-react";

type SignupFormData = z.infer<typeof signupSchema>;

const SignupForm: FC = () => {
  const { setUser } = useAuthContext();
  const { loading, setLoading } = useStateContext();

  const [inputUsername, setInputUsername] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState("");

  const [inputEmail, setInputEmail] = useState("");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  const [responseMessage, setResponseMessage] = useState("");
  const [responseError, setResponseError] = useState(false);

  const debouncedUsername: string = useDebounce(inputUsername, 800);
  const debouncedEmail: string = useDebounce(inputEmail, 800);

  useEffect(() => {
    // check username availability
    (async () => {
      if (formController.formState.errors.username) return;
      if (!debouncedUsername) return;
      try {
        setIsCheckingUsername(true);
        const res = await checkUsernameAvailability(debouncedUsername);
        if (res.success) {
          if (res.response) {
            setUsernameMessage(`${debouncedUsername} is available`);
          } else {
            setUsernameMessage(`${debouncedUsername} is not available`);
          }
        } else {
          throw new Error();
        }
      } catch (error) {
        setUsernameMessage((error as Error).message || "Not able to check email, try again");
      } finally {
        setIsCheckingUsername(false);
      }
    })();
  }, [debouncedUsername]);

  useEffect(() => {
    // check email availability
    (async () => {
      if (formController.formState.errors.email) return;
      if (!debouncedEmail) return;
      try {
        setIsCheckingEmail(true);
        const res = await checkEmailAvailability(debouncedEmail);
        if (res.success) {
          if (res.response) {
            setEmailMessage(`${debouncedEmail} is available`);
          } else {
            setEmailMessage(`${debouncedEmail} is not available`);
          }
        } else {
          throw new Error();
        }
      } catch (error) {
        setEmailMessage((error as Error).message || "Not able to check email, try again");
      } finally {
        setIsCheckingEmail(false);
      }
    })();
  }, [debouncedEmail]);

  const formController = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: SignupFormData) => {
    if (usernameMessage && usernameMessage.toLowerCase().includes("not")) return;
    if (emailMessage && emailMessage.toLowerCase().includes("not")) return;

    if (formController.formState.errors.username) {
      setUsernameMessage(formController.formState.errors.username.toString());
      return;
    }
    if (formController.formState.errors.email) {
      setEmailMessage(formController.formState.errors.email.toString());
      return;
    }

    try {
      setLoading(true);
      const res = await registerUser(data.username, data.email, data.password);
      if (res.success) {
        setUser(res.response);
        toast.success("Signup successful!", {
          description: "Welcome aboard!",
          duration: 2000,
        });
        setResponseMessage("Signup successful!");
        setResponseError(false);
      } else {
        throw new Error(res.response || "Signup failed");
      }
    } catch (error) {
      toast.error((error as Error).message || "An error occurred during signup", {
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
            name="username"
            render={({ field }) => (
              <FormItem className="w-[200px]">
                <FormLabel
                  className={formController.formState.errors.username ? "text-red-600" : ""}
                >
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Username"
                    className="border-neutral-400 dark:border-neutral-600"
                    value={field.value}
                    onChange={e => {
                      field.onChange(e);
                      setInputUsername(e.target.value);
                      if (e.target.value) {
                        setUsernameMessage("");
                        setResponseMessage("");
                        setResponseError(false);
                      }
                    }}
                  />
                </FormControl>
                {isCheckingUsername && <Loader className="w-4 aspect-square animate-spin" />}

                {formController.formState.errors.username ? (
                  <FormMessage className="text-[12px] text-red-600" />
                ) : !isCheckingUsername && usernameMessage ? (
                  <p
                    className={`text-[12px] ${
                      usernameMessage.toLowerCase().includes("not")
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {usernameMessage}
                  </p>
                ) : null}
              </FormItem>
            )}
          />
          <FormField
            control={formController.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-[200px]">
                <FormLabel className={formController.formState.errors.email ? "text-red-600" : ""}>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Email"
                    className="border-neutral-400 dark:border-neutral-600"
                    value={field.value}
                    onChange={e => {
                      field.onChange(e);
                      setInputEmail(e.target.value);
                      if (e.target.value) {
                        setEmailMessage("");
                        setResponseMessage("");
                        setResponseError(false);
                      }
                    }}
                  />
                </FormControl>
                {isCheckingEmail && <Loader className="w-4 aspect-square animate-spin" />}
                {formController.formState.errors.email ? (
                  <FormMessage className="text-red-600 text-[12px]" />
                ) : !isCheckingEmail && emailMessage ? (
                  <p
                    className={`text-[12px] ${
                      emailMessage.toLowerCase().includes("not") ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {emailMessage}
                  </p>
                ) : null}
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
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600 text-[12px]" />
              </FormItem>
            )}
          />
          <FormField
            control={formController.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-[200px]">
                <FormLabel
                  className={formController.formState.errors.confirmPassword ? "text-red-600" : ""}
                >
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    className="border-neutral-400 dark:border-neutral-600"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
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
          Register
        </ButtonWithLoader>
      </form>
    </Form>
  );
};

export default SignupForm;
