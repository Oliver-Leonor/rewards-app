"use client";

import { useDashboardStats } from "@/lib/hooks";
import { Users, TrendingUp, TrendingDown, Clock } from "lucide-react";

const statCards = [
  { key: "totalUsers" as const, label: "Total Users", icon: Users, fmt: (v: number) => v.toString() },
  { key: "totalPointsEarned" as const, label: "Points Earned", icon: TrendingUp, fmt: (v: number) => v.toLocaleString() },
  { key: "totalPointsRedeemed" as const, label: "Points Redeemed", icon: TrendingDown, fmt: (v: number) => v.toLocaleString() },
  { key: "pendingRedemptions" as const, label: "Pending Redemptions", icon: Clock, fmt: (v: number) => v.toString() },
];

export default function AdminPage() {
  const { data: stats, isLoading } = useDashboardStats();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      {isLoading ? (
        <p className="text-foreground/40">Loading stats...</p>
      ) : stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(({ key, label, icon: Icon, fmt }) => (
            <div
              key={key}
              className="rounded-xl border border-foreground/10 p-5 flex flex-col gap-2"
            >
              <div className="flex items-center gap-2 text-foreground/50">
                <Icon size={16} />
                <span className="text-sm">{label}</span>
              </div>
              <p className="text-2xl font-bold">{fmt(stats[key])}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
