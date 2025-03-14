import nodemailer from 'nodemailer';
import { randomInt } from 'crypto'; // Node's crypto module for OTP generation

// Create a transporter for sending the email (using Gmail in this case)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Gmail address
        pass: process.env.EMAIL_PASS,  // Gmail App Password
    },
});

export async function POST(req) {
    const { email } = await req.json();

    if (!email) {
        return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
    }

    try {
        // Generate a 6-digit OTP
        const otp = randomInt(100000, 999999);

        // Construct the email body
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP for Singup',
            text: `Your OTP is: ${otp}`,
            html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
        };

        // Send the OTP email
        await transporter.sendMail(mailOptions);

        // Respond with success message
        return new Response(
            JSON.stringify({ message: 'OTP sent successfully', otp }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending OTP:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to send OTP' }),
            { status: 500 }
        );
    }
}