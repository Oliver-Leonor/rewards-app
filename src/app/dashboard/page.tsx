"use client";

import { useUser, useTransactions, useRedemptions } from "@/lib/hooks";
import { ArrowUpCircle, ArrowDownCircle, Clock, CheckCircle2, XCircle } from "lucide-react";

const statusIcon = {
  queued: <Clock size={14} className="text-foreground/40" />,
  processing: <Clock size={14} className="text-accent" />,
  fulfilled: <CheckCircle2 size={14} className="text-green-500" />,
  failed: <XCircle size={14} className="text-red-500" />,
};

export default function DashboardPage() {
  const { data: user } = useUser();
  const { data: transactions } = useTransactions();
  const { data: redemptions } = useRedemptions();

  return (
    <div className="space-y-8">
      {/* Balance card */}
      {user && (
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-6">
          <p className="text-sm text-foreground/60">Your Balance</p>
          <p className="text-4xl font-bold text-accent mt-1">
            {user.pointsBalance.toLocaleString()} <span className="text-lg font-normal">pts</span>
          </p>
          <p className="text-sm text-foreground/40 mt-2">{user.name} &middot; {user.email}</p>
        </div>
      )}

      {/* Transactions */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Transaction History</h2>
        {!transactions?.length ? (
          <p className="text-foreground/40 text-sm">No transactions yet.</p>
        ) : (
          <div className="divide-y divide-foreground/5">
            {transactions.map((txn) => (
              <div key={txn.id} className="flex items-center gap-3 py-3">
                {txn.type === "earn" ? (
                  <ArrowUpCircle size={20} className="text-green-500 shrink-0" />
                ) : (
                  <ArrowDownCircle size={20} className="text-red-400 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{txn.description}</p>
                  <p className="text-xs text-foreground/40">
                    {new Date(txn.createdAtISO).toLocaleDateString()} &middot; {txn.status}
                  </p>
                </div>
                <span
                  className={`text-sm font-medium tabular-nums ${
                    txn.type === "earn" ? "text-green-500" : "text-red-400"
                  }`}
                >
                  {txn.type === "earn" ? "+" : "−"}{txn.points.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Redemptions */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Redemptions</h2>
        {!redemptions?.length ? (
          <p className="text-foreground/40 text-sm">No redemptions yet.</p>
        ) : (
          <div className="divide-y divide-foreground/5">
            {redemptions.map((r) => (
              <div key={r.id} className="flex items-center gap-3 py-3">
                {statusIcon[r.status]}
                <div className="flex-1 min-w-0">
                  <p className="text-sm">Reward: {r.rewardId}</p>
                  <p className="text-xs text-foreground/40">
                    {new Date(r.createdAtISO).toLocaleDateString()}
                    {r.fulfilledAtISO && ` · Fulfilled ${new Date(r.fulfilledAtISO).toLocaleDateString()}`}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                    r.status === "fulfilled"
                      ? "bg-green-500/10 text-green-500"
                      : r.status === "failed"
                        ? "bg-red-500/10 text-red-500"
                        : "bg-accent/10 text-accent"
                  }`}
                >
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
