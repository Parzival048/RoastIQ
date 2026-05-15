"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Users,
  BarChart3,
  Globe,
  Star,
  Shield,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface UserData {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  createdAt: string;
  _count: { scans: number };
}

interface ScanData {
  id: string;
  url: string;
  overallScore: number;
  mode: string;
  isPublic: boolean;
  isFeatured: boolean;
  slug: string | null;
  createdAt: string;
  user: { name: string | null; email: string | null } | null;
}

interface Stats {
  userCount: number;
  scanCount: number;
  publicCount: number;
  featuredCount: number;
}

export function AdminPanel() {
  const { data: session } = useSession();
  const user = session?.user as { role?: string } | undefined;
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);
  const [scans, setScans] = useState<ScanData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== "admin") {
      setLoading(false);
      return;
    }
    Promise.all([
      fetch("/api/admin?resource=stats").then((r) => r.json()),
      fetch("/api/admin?resource=users").then((r) => r.json()),
      fetch("/api/admin?resource=scans").then((r) => r.json()),
    ]).then(([statsData, usersData, scansData]) => {
      setStats(statsData);
      setUsers(usersData.users || []);
      setScans(scansData.scans || []);
      setLoading(false);
    });
  }, [user?.role]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-sm text-muted-foreground mb-6">
          You need admin privileges to access this page.
        </p>
        <Link href="/" className={cn(buttonVariants())}>
          Go Home
        </Link>
      </div>
    );
  }

  const handleAction = async (action: string, id: string, extra?: Record<string, string>) => {
    const res = await fetch("/api/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, id, ...extra }),
    });
    if (res.ok) {
      // Refresh data
      const [statsData, usersData, scansData] = await Promise.all([
        fetch("/api/admin?resource=stats").then((r) => r.json()),
        fetch("/api/admin?resource=users").then((r) => r.json()),
        fetch("/api/admin?resource=scans").then((r) => r.json()),
      ]);
      setStats(statsData);
      setUsers(usersData.users || []);
      setScans(scansData.scans || []);
    }
  };

  const statCards = [
    { label: "Total Users", value: stats?.userCount || 0, icon: Users },
    { label: "Total Scans", value: stats?.scanCount || 0, icon: BarChart3 },
    { label: "Public Roasts", value: stats?.publicCount || 0, icon: Globe },
    { label: "Featured", value: stats?.featuredCount || 0, icon: Star },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="text-sm text-muted-foreground">
          Manage users, scans, and featured roasts.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-5"
          >
            <stat.icon className="h-5 w-5 text-muted-foreground mb-3" />
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="scans" className="w-full">
        <TabsList className="w-full max-w-md grid grid-cols-2 bg-secondary/50">
          <TabsTrigger value="scans">Scans</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="scans" className="mt-6">
          <div className="glass rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border/50">
              <h2 className="text-sm font-semibold">All Scans ({scans.length})</h2>
            </div>
            <div className="divide-y divide-border/50">
              {scans.map((scan) => (
                <div
                  key={scan.id}
                  className="px-6 py-3 flex items-center justify-between hover:bg-secondary/20 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">{scan.url}</span>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                        {scan.overallScore}/100
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">
                        {scan.user?.email || "Anonymous"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {scan.mode}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant={scan.isFeatured ? "default" : "ghost"}
                      className="h-7"
                      onClick={() => handleAction("toggleFeatured", scan.id)}
                      title={scan.isFeatured ? "Unfeature" : "Feature"}
                    >
                      <Star className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7"
                      onClick={() => handleAction("togglePublic", scan.id)}
                      title={scan.isPublic ? "Make private" : "Make public"}
                    >
                      {scan.isPublic ? (
                        <Eye className="h-3.5 w-3.5" />
                      ) : (
                        <EyeOff className="h-3.5 w-3.5" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 text-red-400 hover:text-red-300"
                      onClick={() => handleAction("deleteScan", scan.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <div className="glass rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border/50">
              <h2 className="text-sm font-semibold">All Users ({users.length})</h2>
            </div>
            <div className="divide-y divide-border/50">
              {users.map((u) => (
                <div
                  key={u.id}
                  className="px-6 py-3 flex items-center justify-between hover:bg-secondary/20 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{u.name || "—"}</span>
                      <Badge
                        variant={u.role === "admin" ? "default" : "secondary"}
                        className="text-[10px] px-1.5 py-0"
                      >
                        {u.role}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {u.email} · {u._count.scans} scans
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7"
                    onClick={() =>
                      handleAction("setRole", u.id, {
                        role: u.role === "admin" ? "user" : "admin",
                      })
                    }
                  >
                    <Shield className="h-3.5 w-3.5 mr-1" />
                    {u.role === "admin" ? "Remove Admin" : "Make Admin"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
