import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jwt from 'jsonwebtoken';

const PUBLIC_PATHS = ['/login'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ❌ ۱. اجازه دسترسی به مسیرهای عمومی
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // ✅ ۲. گرفتن توکن از کوکی یا هدر
  const token = request.cookies.get('access_token')?.value;

  // 🚫 ۳. اگر توکن وجود نداشت، به صفحه لاگین هدایت کن
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 🔑 ۴. بررسی اعتبار توکن
  try {
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET || "devshelfjwtsecrret92872098347";
    const decoded = jwt.verify(token, secret) as { userId: string; username: string; role: string };

    // ۵. (اختیاری) اضافه کردن اطلاعات کاربر به هدر درخواست
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decoded.userId);
    requestHeaders.set('x-user-role', decoded.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    // ❌ توکن نامعتبر: هدایت به لاگین
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
}

// میدلویر فقط روی این مسیرها اجرا شود (اختیاری)
export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};