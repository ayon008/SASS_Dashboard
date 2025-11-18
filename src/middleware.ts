import NextAuth from "next-auth"
import authConfig from "./app/auth.config"
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req) {
    const isLoggedIn = !!req.auth;
    console.log(isLoggedIn);
    if (!isLoggedIn) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    return NextResponse.next();
})

export const config = {
    matcher: ['/settings'],
};

