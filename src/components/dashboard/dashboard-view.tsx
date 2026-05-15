"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Flame,
  BarChart3,
  Clock,
  Star,
  Download,
  ExternalLink,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ScanData {
  id: string;
  url: string;
  overallScore: number;
  mode: string;
  slug: string | null;
  createdAt: string;
}

function getScoreColor(score: number): string {
  if (score >= 70) return "text-green-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function DashboardView() {
  const { data: session, status } = useSession();
  const [scans, setScans] = useState<ScanData[]>([]);
  const [total, setTotal] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/scans")
        .then((r) => r.json())
        .then((data) => {
          setScans(data.scans || []);
          setTotal(data.total || 0);
          setAvgScore(data.avgScore || 0);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <Flame className="h-12 w-12 text-roast mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Sign in to view your dashboard</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Track your scans, view analytics, and manage your reports.
        </p>
        <Link
          href="/auth/signin"
          className={cn(
            buttonVariants(),
            "roast-gradient text-white border-0 hover:opacity-90"
          )}
        >
          Sign In
        </Link>
      </div>
    );
  }

  const stats = [
    { label: "Total Scans", value: String(total), icon: BarChart3, change: "" },
    { label: "Avg. Score", value: String(avgScore), icon: TrendingUp, change: "" },
    { label: "Saved Reports", value: String(scans.filter((s) => s.slug).length), icon: Download, change: "" },
    { label: "Favorites", value: "0", icon: Star, change: "" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back, {session.user?.name || "there"}. Your roast history at a glance.
          </p>
        </div>
        <Link
          href="/roast"
          className={cn(
            buttonVariants(),
            "roast-gradient text-white border-0 hover:opacity-90"
          )}
        >
          <Flame className="mr-2 h-4 w-4" />
          New Scan
        </Link>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Recent Scans</h2>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {total} total scans
          </div>
        </div>

        {scans.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              No scans yet. Start by roasting a website!
            </p>
            <Link
              href="/roast"
              className={cn(
                buttonVariants({ size: "sm" }),
                "roast-gradient text-white border-0"
              )}
            >
              <Flame className="mr-2 h-3.5 w-3.5" />
              Roast a Website
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {scans.map((scan, i) => (
              <motion.div
                key={scan.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="px-6 py-4 flex items-center justify-between hover:bg-secondary/20 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className={`text-xl font-bold w-12 text-center ${getScoreColor(scan.overallScore)}`}
                  >
                    {scan.overallScore}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{scan.url}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                        {scan.mode}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {timeAgo(scan.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {scan.slug && (
                    <Link href={`/roast/${scan.slug}`}>
                      <Button size="sm" variant="ghost" className="h-8">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  )}
                  <Link href={`/api/report?scanId=${scan.id}`} target="_blank">
                    <Button size="sm" variant="ghost" className="h-8">
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-xl p-6 mt-8"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-semibold">Free Plan</h3>
              <Badge variant="secondary" className="text-[10px]">Active</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {total} scans used. Upgrade for unlimited scans and all analysis modes.
            </p>
          </div>
          <Button
            size="sm"
            className="roast-gradient text-white border-0 hover:opacity-90"
            disabled
          >
            Upgrade to Pro (Coming Soon)
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
