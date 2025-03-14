import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");
    if (!uid) {
        return new Response(JSON.stringify({ error: "Missing uid parameter" }), { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: { uid: uid },
    });

    if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
}