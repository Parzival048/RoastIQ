"use client";

import { motion } from "framer-motion";
import {
  Flame,
  BarChart3,
  Clock,
  Star,
  Download,
  ExternalLink,
  TrendingUp,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

const recentScans = [
  {
    id: "1",
    url: "https://acmecorp.com",
    score: 42,
    mode: "Roast",
    date: "2 hours ago",
    status: "complete",
  },
  {
    id: "2",
    url: "https://techstartup.io",
    score: 67,
    mode: "Professional",
    date: "1 day ago",
    status: "complete",
  },
  {
    id: "3",
    url: "https://coolshop.store",
    score: 38,
    mode: "E-Commerce",
    date: "3 days ago",
    status: "complete",
  },
  {
    id: "4",
    url: "https://gamingsite.gg",
    score: 55,
    mode: "Gamer",
    date: "1 week ago",
    status: "complete",
  },
];

const stats = [
  { label: "Total Scans", value: "24", icon: BarChart3, change: "+8 this month" },
  { label: "Avg. Score", value: "51", icon: TrendingUp, change: "+12 from last month" },
  { label: "Saved Reports", value: "6", icon: Download, change: "" },
  { label: "Favorites", value: "3", icon: Star, change: "" },
];

function getScoreColor(score: number): string {
  if (score >= 70) return "text-green-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}

export function DashboardView() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Your roast history and analytics at a glance.
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

      {/* Stats Grid */}
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
            {stat.change && (
              <div className="text-xs text-green-400 mt-1">{stat.change}</div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Recent Scans */}
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
            Last 30 days
          </div>
        </div>

        <div className="divide-y divide-border/50">
          {recentScans.map((scan, i) => (
            <motion.div
              key={scan.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="px-6 py-4 flex items-center justify-between hover:bg-secondary/20 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className={`text-xl font-bold w-12 text-center ${getScoreColor(
                    scan.score
                  )}`}
                >
                  {scan.score}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">
                    {scan.url}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge
                      variant="secondary"
                      className="text-[10px] px-1.5 py-0"
                    >
                      {scan.mode}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {scan.date}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="h-8">
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
                <Button size="sm" variant="ghost" className="h-8">
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="px-6 py-3 border-t border-border/50 text-center">
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            View All Scans
          </Button>
        </div>
      </motion.div>

      {/* Subscription */}
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
              <Badge variant="secondary" className="text-[10px]">
                Active
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              1 of 3 monthly scans used. Upgrade for unlimited scans and all
              analysis modes.
            </p>
          </div>
          <Button
            size="sm"
            className="roast-gradient text-white border-0 hover:opacity-90"
          >
            Upgrade to Pro
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
