"use client";

import { useUser, useEarnPoints } from "@/lib/hooks";
import { useState } from "react";

const presets = [
  { points: 50, description: "Small purchase" },
  { points: 150, description: "Medium purchase" },
  { points: 500, description: "Large purchase" },
];

export default function EarnPage() {
  const { data: user } = useUser();
  const earn = useEarnPoints();
  const [custom, setCustom] = useState({ points: "", description: "" });

  const handlePreset = async (points: number, description: string) => {
    try {
      await earn.mutateAsync({ points, description });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to earn points");
    }
  };

  const handleCustom = async (e: React.FormEvent) => {
    e.preventDefault();
    const points = parseInt(custom.points, 10);
    if (!points || points <= 0 || !custom.description.trim()) return;
    try {
      await earn.mutateAsync({ points, description: custom.description.trim() });
      setCustom({ points: "", description: "" });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to earn points");
    }
  };

  return (
    <div className="max-w-lg space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Earn Points</h1>
        <p className="text-sm text-foreground/60 mt-1">
          Simulate a purchase to earn points.
          {user && (
            <> Current balance: <span className="font-bold text-accent">{user.pointsBalance.toLocaleString()} pts</span></>
          )}
        </p>
      </div>

      {/* Quick presets */}
      <section>
        <h2 className="text-sm font-medium text-foreground/60 mb-3">Quick Add</h2>
        <div className="flex gap-3">
          {presets.map((p) => (
            <button
              key={p.points}
              onClick={() => handlePreset(p.points, p.description)}
              disabled={earn.isPending}
              className="flex-1 rounded-lg border border-foreground/10 p-4 text-center hover:border-accent/30 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              <p className="text-lg font-bold text-accent">+{p.points}</p>
              <p className="text-xs text-foreground/50 mt-1">{p.description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Custom form */}
      <section>
        <h2 className="text-sm font-medium text-foreground/60 mb-3">Custom Amount</h2>
        <form onSubmit={handleCustom} className="space-y-3">
          <input
            type="number"
            min={1}
            placeholder="Points"
            value={custom.points}
            onChange={(e) => setCustom((c) => ({ ...c, points: e.target.value }))}
            className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-accent"
          />
          <input
            type="text"
            placeholder="Description (e.g. Spring sale purchase)"
            value={custom.description}
            onChange={(e) => setCustom((c) => ({ ...c, description: e.target.value }))}
            className="w-full rounded-lg border border-foreground/10 bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={earn.isPending}
            className="w-full py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {earn.isPending ? "Processing..." : "Earn Points"}
          </button>
        </form>
      </section>

      {earn.isSuccess && (
        <p className="text-sm text-green-500">
          Points earned! New balance: {earn.data.newBalance.toLocaleString()} pts
        </p>
      )}
    </div>
  );
}
