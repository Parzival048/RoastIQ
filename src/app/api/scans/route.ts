import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const [scans, total] = await Promise.all([
      prisma.scan.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.scan.count({ where: { userId } }),
    ]);

    const avgScore = scans.length
      ? Math.round(scans.reduce((sum, s) => sum + s.overallScore, 0) / scans.length)
      : 0;

    return NextResponse.json({
      scans,
      total,
      avgScore,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Scans fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch scans" }, { status: 500 });
  }
}
