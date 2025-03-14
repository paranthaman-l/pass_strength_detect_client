import bcrypt from 'bcryptjs';
import { encrypt } from '@/app/lib/session';  // Replace with the actual path
import prisma from '@/app/lib/prisma';
import argon2 from 'argon2'

export async function POST(req) {
  const { email, password } = await req.json();

  // Validate input fields
  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Email and password are required' }), {
      status: 400,
    });
  }

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
        status: 401,
      });
    }

    // Compare the provided password with the stored hashed password
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = await argon2.verify(user.password, password);
    console.log(isPasswordValid);
    


    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
        status: 401,
      });
    }

    // Generate a JWT token
    const sessionToken = await encrypt({ uid: user.uid, email: user.email, role: user.role });

    // Respond with the token and user data
    return new Response(
      JSON.stringify({
        message: 'Login successful',
        token: sessionToken,
        user: {
          uid: user.uid,
          name: user.name,
          email: user.email,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during login:', error);
    return new Response(JSON.stringify({ error: 'Failed to login' }), { status: 500 });
  }
}
