"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResetPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(email)

    if (error) {
      setError(error.message);
    } else {
      setMessage("Check your email for the password reset link.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleReset} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
          </form>
          {message && <p className="text-green-600 mt-2">{message}</p>}
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
