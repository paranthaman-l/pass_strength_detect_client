import prisma from "@/app/lib/prisma";

export async function POST(req) {
    const { uid, positive,negative } = await req.json();
    const feedback = await prisma.feedback.create({
        data: {
            userId:uid,
            positive,
            negative
        },
    });
    return new Response(
        JSON.stringify({
          message: 'Feedback Created Successfully',
        }),
        { status: 201 }
      );
}