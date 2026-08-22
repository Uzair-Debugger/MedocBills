import 'dotenv/config'

if(!process.env.DATABASE_URL ||
    !process.env.ADMIN_EMAIL ||
    !process.env.ADMIN_PASSWORD ||
    !process.env.ADMIN_NAME ||
    !process.env.NEXT_PUBLIC_APP_URL ||
    !process.env.NODE_ENV ||
    !process.env.GITHUB_ID ||
    !process.env.GITHUB_SECRET ||
    !process.env.NEXTAUTH_SECRET ||
    !process.env.NEXTAUTH_URL
){
    throw new Error("Environment variable missing");
}

export const env = {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NODE_ENV: process.env.NODE_ENV,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    ADMIN_NAME: process.env.ADMIN_NAME,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
}
