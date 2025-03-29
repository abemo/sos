// TODO

// should handle forgot-password, sign-in, sign-up, and reset-password

{/* <SubmitButton pendingText="Signing In..." formAction={signInAction}>
  Sign in
</SubmitButton> */}

{/* <SubmitButton formAction={forgotPasswordAction}>
  Reset Password
</SubmitButton> */}

{/* <SubmitButton formAction={signUpAction} pendingText="Signing up...">
  Sign up
</SubmitButton> */}

export function SubmitButton({
  formAction,
  pendingText,
  children,
}: {
  formAction: (formData: FormData) => Promise<void>;
  pendingText?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 px-4 rounded"
      onClick={async (e) => {
        e.preventDefault();
        const formData = new FormData();
        await formAction(formData);
      }}
    >
      {pendingText || children}
    </button>
  );
}