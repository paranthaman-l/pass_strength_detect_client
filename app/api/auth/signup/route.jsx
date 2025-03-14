import bcrypt from "bcryptjs";
import { encrypt } from "@/app/lib/session";
import prisma from "@/app/lib/prisma";
import argon2 from "argon2";

export async function POST(req) {
  const { name, email, password, role } = await req.json();

  const profiles = [
    "1x-owkH3XMJn6B8Rlp309dqEvt6LGPHsm",
    "1H5ztBaIp2aNKx-1p21bo7ymvLwdbfWM3",
    "19ifBXAWaYTa1v4RIk54VuRY0DT6rykxy",
    "1yfkeA1K5QxQFkZV8gHjyLm9OFcgEu6pe",
    "1V9e70qJ8MuOhG1mhXtxe5KU2b9sOCId6",
    "1LsTV8BRKidFQCpwluEjh9BqmUt-vZgfs",
    "1bTMICD4qFpIf9jF1S9HcCbz-DH84gZfs",
    "1idnAF3-iE6NvQ_SS0rBLyYwFA6QaY9n7",
    "1I-K42kjhtBOpV62V402xUTx2qCMLneQX",
    "1vINcs5Brn0mWYitqG0lqCZNTlVnmYkhQ",
    "1cAnmbFyvC5pwHcqx3eI4a3ULYeq_oJTf",
    "15Jf3SJK3wyv9Q4TiSmMPH3WEkylO97rL",
    "1uBacdTCoyvGmFi91pfNimv4S43HCT5ea",
    "10MUqqMNi-8ImCbB7xb8_mJsjffGxsYoY",
    "1dKK1557jOYzTJNo5JdcNejUloHIHj5EK",
    "1sy8MgykSJDuueKZO76KDF1E9zf9LMsM0",
    "1C4glrbg-EgyProfN7UdbTYrsHWxDhiX7",
    "14ROJCNOqo0RzUR8-aa0oq7vcrCIPdPcz",
    "14wPbxDr4_78ldZk8kJODbmVYUpi4UVjc",
    "1ZFHU6sP-p4LYxk2KMupxICUStF6LB73P",
    "1TPGbyYRTK3wT6EAQk9DEs6DzbqqbVfQT",
    "1EPyo34t0fz29lFQtWv6dKuiNNNIjjBcq",
    "1NstN-FUTU4HCPy_SiKF7rvt2LgibXMuf",
    "1mSGnA2vMxP_oQaRXjftEyBKUjdN3evnz",
    "1HfDCjrNvriLaRR6Mlpg1wYwhFwATTJZJ",
    "1LQXrPohsjLmvezj9bfsPG6aeEwngEpFL",
  ];

  if (!name || !email || !password) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
    });
  }

  try {
    // Hash the password
    const hashedPassword = await argon2.hash(password,{
      type:argon2.argon2id,
      memoryCost: 1 << 16, // 64MB
      timeCost: 2, // 2 iterations
      parallelism: 1
    });

    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        profile: `https://lh3.googleusercontent.com/d/${
          profiles[name.toLowerCase().charCodeAt(0) - 97]
        }`,
      },
    });

    // Create a session (JWT token)
    const sessionToken = await encrypt({
      uid: newUser.uid,
      email: newUser.email,
      role: newUser.role,
    });

    // Respond with the token and user data
    return new Response(
      JSON.stringify({
        message: "User created successfully",
        token: sessionToken,
        user: {
          uid: newUser.uid,
          name: newUser.name,
          email: newUser.email,
        },
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error.message, error.stack);
    return new Response(
      JSON.stringify({
        error: "Failed to create user",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
