import { login, signup } from "./actions";
import { LoginForm } from "@/components/login-form";

// I would like this to be a pop up in the future, but for now it is a page.
export default function LoginPage() {
  return (

    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )


}

    /*
      Old login form, wanted to keep it for reference.
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </form>

    */