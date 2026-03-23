"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import { useUserStore } from "./store";

export function useUser() {
  const userId = useUserStore((s) => s.userId);
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => api.getUser(userId),
  });
}

export function useRewards() {
  return useQuery({
    queryKey: ["rewards"],
    queryFn: api.getRewards,
  });
}

export function useTransactions() {
  const userId = useUserStore((s) => s.userId);
  return useQuery({
    queryKey: ["transactions", userId],
    queryFn: () => api.getTransactions(userId),
  });
}

export function useRedemptions() {
  const userId = useUserStore((s) => s.userId);
  return useQuery({
    queryKey: ["redemptions", userId],
    queryFn: () => api.getRedemptions(userId),
    refetchInterval: (query) => {
      // Poll while there are pending redemptions
      const data = query.state.data;
      const hasPending = data?.some(
        (r) => r.status === "queued" || r.status === "processing"
      );
      return hasPending ? 2000 : false;
    },
  });
}

export function useRedeemReward() {
  const qc = useQueryClient();
  const userId = useUserStore((s) => s.userId);

  return useMutation({
    mutationFn: (rewardId: string) => api.redeemReward(rewardId, userId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["user"] });
      qc.invalidateQueries({ queryKey: ["rewards"] });
      qc.invalidateQueries({ queryKey: ["transactions"] });
      qc.invalidateQueries({ queryKey: ["redemptions"] });
    },
  });
}

export function useEarnPoints() {
  const qc = useQueryClient();
  const userId = useUserStore((s) => s.userId);

  return useMutation({
    mutationFn: ({ points, description }: { points: number; description: string }) =>
      api.earnPoints(userId, points, description),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["user"] });
      qc.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: api.getDashboardStats,
  });
}
