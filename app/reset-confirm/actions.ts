'use server'

import { createClient } from '@/utils/supabase/server'

export const sendResetPasswordEmail = async (prev: any, formData: any) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.resetPasswordForEmail(
    formData.get("email") as string
  );

  if (error) {
    console.error("Error sending reset password email:", error.message);
    return {
      success: '',
      error: error.message,
    };
  }

  return {
    success: 'Please check your email for the reset password link.',
    error: '',
  };
}

export const updatePassword = async (prev: any, formData: any) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.updateUser({
    password: formData.get("password") as string,
  });

  if (error) {
    console.error("Error updating password:", error.message);
    return {
      success: '',
      error: error.message,
    };
  }
  return {
    success: 'Password updated successfully.',
    error: '',
  };
};