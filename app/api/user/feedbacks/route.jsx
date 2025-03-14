import prisma from '@/app/lib/prisma';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid"); // Get uid from query params

    if (!uid) {
      return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
    }

    // Fetch only the feedbacks related to the user
    const feedbacks = await prisma.feedback.findMany({
      where: { userId: uid },  // Filter by user ID
      select: { id: true, positive: true, negative: true, createdAt: true } // Select only required fields
    });

    return new Response(JSON.stringify(feedbacks), { status: 200 });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return new Response(JSON.stringify({ error: "Failed to retrieve feedbacks" }), { status: 500 });
  }
}
