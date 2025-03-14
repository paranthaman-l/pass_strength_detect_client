import prisma from "@/app/lib/prisma";

export async function POST(req) {
  const { lower, upper, digit, special } = await req.json();
  const newPolicy = await prisma.policy.create({
    data: {
      lower,
      upper,
      special,
      digit,
    },
  });

  return new Response(
    JSON.stringify({
      message: "New Policy Added successfully",
      policy:newPolicy
    }),
    { status: 201 }
  );
}
