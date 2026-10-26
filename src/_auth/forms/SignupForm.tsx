
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { useForm } from "react-hook-form"
import { SignupValidation } from "../../lib/validation";
import z from "zod";
import Loader from "../../components/shared/Loader";
import { toast } from "sonner"; 
import { useCreateUserAccount, useSignInAccount } from "../../lib/react-query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext"
import { ASSETS } from "../../constants";

const SignupForm = () => {
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: createUserAccountMutation, isPending: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount } = useSignInAccount();


// 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
  try {
    const newUser = await createUserAccountMutation(values);

    console.log("NEW USER:", newUser);

    if (!newUser) {
      toast("Sign up failed. Please try again.");
      return;
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    console.log("SESSION:", session);

    if (!session) {
      toast("Sign in failed. Please try again.");
      return;
    }

    const isLoggedIn = await checkAuthUser();

    console.log("IS LOGGED IN:", isLoggedIn);

    if (isLoggedIn) {
      form.reset();
      navigate('/');
    } else {
      toast("Sign in failed. Please try again.");
    }

  } catch (error) {
    console.error("SIGNUP MUTATION ERROR:", error);
  }
}

  return (
    <Form {...form}>

      <div className="sm-w-420 flex-center flex-col ">
        <img src={ASSETS.logo} alt="logo" className="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">To use The Circle, please log in or sign up.</p>

    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type="text" className="shad-input" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text" className="shad-input" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" className="shad-input" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" className="shad-input" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" className="shad-button_primary">
        { isCreatingAccount ? (
          <div className="flex-center gap-2">
            <Loader /> Loading...
          </div>
        ): "Sign up"}
      </Button>
      <p className="text-small text-light-2 text-center mt-2">
        Already have an account?
        <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
      </p>
    </form>
    </div>
  </Form>
  )
}

export default SignupForm