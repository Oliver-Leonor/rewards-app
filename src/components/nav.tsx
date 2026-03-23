"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gift, LayoutDashboard, ShieldCheck, Coins } from "lucide-react";

const links = [
  { href: "/", label: "Rewards", icon: Gift },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/earn", label: "Earn", icon: Coins },
  { href: "/admin", label: "Admin", icon: ShieldCheck },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-foreground/10 bg-background/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <Link href="/" className="font-bold text-lg tracking-tight">
          <span className="text-accent">Rewards</span>
        </Link>
        <div className="flex gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                  active
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
