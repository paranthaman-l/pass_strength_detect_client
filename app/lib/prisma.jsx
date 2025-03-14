import { PrismaClient } from '@prisma/client';

let prisma;

// Ensure that PrismaClient is only initialized once
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    // In development, use a global variable to avoid exhausting the database connection pool
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;
