// Mirrors rewards-api/src/types/domain.ts

export type TransactionType = "earn" | "redeem";
export type TransactionStatus = "pending" | "completed" | "failed";
export type RedemptionStatus = "queued" | "processing" | "fulfilled" | "failed";

export type User = {
  id: string;
  name: string;
  email: string;
  pointsBalance: number;
  createdAtISO: string;
};

export type Reward = {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  stock: number;
  imageUrl: string;
  isActive: boolean;
  createdAtISO: string;
};

export type Transaction = {
  id: string;
  userId: string;
  type: TransactionType;
  points: number;
  description: string;
  rewardId: string | null;
  status: TransactionStatus;
  createdAtISO: string;
};

export type Redemption = {
  id: string;
  userId: string;
  rewardId: string;
  transactionId: string;
  status: RedemptionStatus;
  fulfilledAtISO: string | null;
  createdAtISO: string;
};

export type DashboardStats = {
  totalUsers: number;
  totalPointsEarned: number;
  totalPointsRedeemed: number;
  pendingRedemptions: number;
};

// API envelope
export type ApiResponse<T> = { ok: true; data: T } | { ok: false; error: string };
