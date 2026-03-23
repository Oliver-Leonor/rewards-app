"use client";

import type { Reward } from "@/types/api";
import { Gift } from "lucide-react";

type Props = {
  reward: Reward;
  userBalance: number;
  onRedeem: (rewardId: string) => void;
  isRedeeming: boolean;
};

export function RewardCard({ reward, userBalance, onRedeem, isRedeeming }: Props) {
  const canAfford = userBalance >= reward.pointsCost;
  const outOfStock = reward.stock <= 0;
  const disabled = !canAfford || outOfStock || isRedeeming;

  return (
    <div className="rounded-xl border border-foreground/10 bg-background p-5 flex flex-col gap-3 hover:border-accent/30 transition-colors">
      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
        <Gift size={24} className="text-accent" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-base">{reward.name}</h3>
        <p className="text-sm text-foreground/60 mt-1">{reward.description}</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="font-bold text-accent">{reward.pointsCost.toLocaleString()} pts</span>
        <span className="text-xs text-foreground/40">{reward.stock} left</span>
      </div>
      <button
        onClick={() => onRedeem(reward.id)}
        disabled={disabled}
        className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
          disabled
            ? "bg-foreground/5 text-foreground/30 cursor-not-allowed"
            : "bg-accent text-white hover:bg-accent/90 cursor-pointer"
        }`}
      >
        {isRedeeming
          ? "Processing..."
          : outOfStock
            ? "Out of Stock"
            : !canAfford
              ? `Need ${(reward.pointsCost - userBalance).toLocaleString()} more pts`
              : "Redeem"}
      </button>
    </div>
  );
}
