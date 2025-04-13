"use client";

import { updatePassword } from '@/app/reset-confirm/actions';
import { Link } from 'lucide-react';
import { useActionState } from 'react';

const Page = () => {
  const [state, formAction, isPending] = useActionState(updatePassword, {
    error: '',
    success: '',
  });

  const { error, success } = state;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-4">Reset Password</h1>
        <form action={formAction} className="space-y-4">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-medium">New Password</span>
            </div>
            <input
              name="password"
              type="password"
              className="space-y-4 input input-bordered w-full"
              required
              placeholder="Enter your new password"
            />
          </label>

          <button
            type="submit"
            className={`btn w-full ${isPending ? 'btn-disabled' : ''}`}
            disabled={isPending}
          >
            {isPending && <span className="loading loading-spinner mr-2"></span>}
            Update Password
          </button>

          {error && (
            <div role="alert" className="alert alert-error mt-2">
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div role="alert" className="alert alert-info mt-2">
              <span>{success}</span>
              <a
                href="/protected"
                className="ml-2 text-blue-600 hover:underline"
              >
                Home
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Page;