import 'dotenv/config'



if(!process.env.DATABASE_URL ||
    !process.env.ADMIN_EMAIL ||
    !process.env.ADMIN_PASSWORD ||
    !process.env.ADMIN_NAME ||
    !process.env.NEXT_PUBLIC_APP_URL ||
    !process.env.NODE_ENV
){
    throw new Error("Environment variable missing");
}
export const env = {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NODE_ENV: process.env.NODE_ENV,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    ADMIN_NAME: process.env.ADMIN_NAME
}
