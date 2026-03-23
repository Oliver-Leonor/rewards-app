"use client";

import { useUser, useRewards, useRedeemReward } from "@/lib/hooks";
import { RewardCard } from "@/components/reward-card";
import { useState } from "react";

export default function RewardsPage() {
  const { data: user } = useUser();
  const { data: rewards, isLoading } = useRewards();
  const redeem = useRedeemReward();
  const [redeemingId, setRedeemingId] = useState<string | null>(null);

  const handleRedeem = async (rewardId: string) => {
    if (!confirm("Redeem this reward? Points will be deducted.")) return;
    setRedeemingId(rewardId);
    try {
      await redeem.mutateAsync(rewardId);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Redemption failed");
    } finally {
      setRedeemingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-baseline justify-between mb-6">
        <h1 className="text-2xl font-bold">Reward Catalog</h1>
        {user && (
          <p className="text-sm text-foreground/60">
            Balance: <span className="font-bold text-accent">{user.pointsBalance.toLocaleString()} pts</span>
          </p>
        )}
      </div>
      {isLoading ? (
        <p className="text-foreground/40">Loading rewards...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards?.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              userBalance={user?.pointsBalance ?? 0}
              onRedeem={handleRedeem}
              isRedeeming={redeemingId === reward.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
