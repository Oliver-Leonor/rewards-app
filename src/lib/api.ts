import type { ApiResponse } from "@/types/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  const json: ApiResponse<T> = await res.json();

  if (!json.ok) {
    throw new Error(json.error);
  }

  return json.data;
}

// ── Users ──

import type { User, Reward, Transaction, Redemption, DashboardStats } from "@/types/api";

export const api = {
  // Users
  getUser: (id: string) => request<User>(`/users/${id}`),

  // Rewards catalog
  getRewards: () => request<Reward[]>("/rewards"),
  getReward: (id: string) => request<Reward>(`/rewards/${id}`),

  // Earn points (purchase simulation)
  earnPoints: (userId: string, points: number, description: string) =>
    request<{ transaction: Transaction; newBalance: number }>("/events/purchase", {
      method: "POST",
      body: JSON.stringify({ userId, points, description }),
    }),

  // Redeem reward
  redeemReward: (rewardId: string, userId: string) =>
    request<{ transaction: Transaction; redemption: Redemption; message: string }>(
      `/rewards/${rewardId}/redeem`,
      { method: "POST", body: JSON.stringify({ userId }) }
    ),

  // User history
  getTransactions: (userId: string) =>
    request<Transaction[]>(`/users/${userId}/transactions`),
  getRedemptions: (userId: string) =>
    request<Redemption[]>(`/users/${userId}/redemptions`),

  // Admin
  getDashboardStats: () => request<DashboardStats>("/admin/dashboard"),
};
