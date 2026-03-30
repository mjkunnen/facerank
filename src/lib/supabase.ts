import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://qfbcxljxskebkyuvprqw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmYmN4bGp4c2tlYmt5dXZwcnF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NDc5NDIsImV4cCI6MjA5MDQyMzk0Mn0.ih3jjjvYHpPo6_JO7W2vmO0vHskU9HG122FGa6_-5sQ"
);

export function generateReferralCode(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function createUser(email: string) {
  const referral_code = generateReferralCode();
  const { data, error } = await supabase
    .from("users")
    .insert({ email, referral_code })
    .select()
    .single();
  if (error?.code === "23505") {
    // Email already exists, fetch existing user
    const { data: existing } = await supabase
      .from("users")
      .select()
      .eq("email", email)
      .single();
    return existing;
  }
  if (error) throw error;
  return data;
}

export async function getUserByReferralCode(code: string) {
  const { data } = await supabase
    .from("users")
    .select()
    .eq("referral_code", code)
    .single();
  return data;
}

export async function getUserByEmail(email: string) {
  const { data } = await supabase
    .from("users")
    .select()
    .eq("email", email)
    .single();
  return data;
}

export async function trackReferral(referrerId: string, referredUserId: string) {
  await supabase
    .from("referrals")
    .insert({ referrer_id: referrerId, referred_user_id: referredUserId, completed: true });
}

export async function getCompletedReferralCount(userId: string): Promise<number> {
  const { count } = await supabase
    .from("referrals")
    .select("*", { count: "exact", head: true })
    .eq("referrer_id", userId)
    .eq("completed", true);
  return count || 0;
}

export async function unlockUser(userId: string) {
  await supabase
    .from("users")
    .update({ unlocked: true })
    .eq("id", userId);
}

export async function checkAndUnlock(userId: string): Promise<boolean> {
  const count = await getCompletedReferralCount(userId);
  if (count >= 3) {
    await unlockUser(userId);
    return true;
  }
  return false;
}
