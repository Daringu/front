import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    try {        
        const response=await fetch('https://front-three-azure.vercel.app/api/authorize',{method:'POST',credentials:'include',headers:{"Content-Type": "application/json",'Cookie':request.cookies.toString()}})
        
        if (response.status===401) {
            throw new Error('Not authorized')
        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.redirect(new URL('/auth', request.url))
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/todos/:path*',
}