import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const user = await prisma.user.findUnique({
    where: { id: (session.user as { id: string }).id },
    select: { role: true },
  });
  return user?.role === "admin" ? session : null;
}

export async function GET(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const resource = searchParams.get("resource");

  if (resource === "users") {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: { select: { scans: true } },
      },
    });
    return NextResponse.json({ users });
  }

  if (resource === "scans") {
    const scans = await prisma.scan.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { user: { select: { name: true, email: true } } },
    });
    return NextResponse.json({ scans });
  }

  if (resource === "stats") {
    const [userCount, scanCount, publicCount, featuredCount] = await Promise.all([
      prisma.user.count(),
      prisma.scan.count(),
      prisma.scan.count({ where: { isPublic: true } }),
      prisma.scan.count({ where: { isFeatured: true } }),
    ]);
    return NextResponse.json({ userCount, scanCount, publicCount, featuredCount });
  }

  return NextResponse.json({ error: "Invalid resource" }, { status: 400 });
}

export async function PATCH(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { action, id } = body as { action: string; id: string };

  if (action === "togglePublic") {
    const scan = await prisma.scan.findUnique({ where: { id } });
    if (!scan) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const updated = await prisma.scan.update({
      where: { id },
      data: { isPublic: !scan.isPublic },
    });
    return NextResponse.json({ scan: updated });
  }

  if (action === "toggleFeatured") {
    const scan = await prisma.scan.findUnique({ where: { id } });
    if (!scan) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const updated = await prisma.scan.update({
      where: { id },
      data: { isFeatured: !scan.isFeatured },
    });
    return NextResponse.json({ scan: updated });
  }

  if (action === "setRole") {
    const { role } = body as { role: string };
    const updated = await prisma.user.update({
      where: { id },
      data: { role },
    });
    return NextResponse.json({ user: updated });
  }

  if (action === "deleteScan") {
    await prisma.scan.delete({ where: { id } });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
