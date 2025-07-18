import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';
  const role = request.cookies.get('userRole')?.value; // seller, admin, superadmin
  const pathname = request.nextUrl.pathname;

  const publicRoutes = [
    '/login',
    '/forgot-password',
    '/reset-password',
    '/otp',
    '/password-created',
  ];

  const isPublic = publicRoutes.includes(pathname);

  if (!isPublic && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isLoggedIn && isPublic) {
    // Redirect logged-in user to their respective dashboard
    if (role === 'seller') {
      return NextResponse.redirect(new URL('/seller/dashboard', request.url));
    }
    if (role === 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    if (role === 'superadmin') {
      return NextResponse.redirect(new URL('/superadmin/dashboard', request.url));
    }
  }

  // Protect role-specific routes
  const isSellerRoute = pathname.startsWith('/seller');
  const isAdminRoute = pathname.startsWith('/admin');
  const isSuperAdminRoute = pathname.startsWith('/super-admin');

  if (isLoggedIn) {
    if (isSellerRoute && role !== 'seller') {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
    }
    if (isAdminRoute && role !== 'admin') {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
    }
    if (isSuperAdminRoute && role !== 'superadmin') {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
    }
  }

  return NextResponse.next();
}

// ✅ Matcher config
export const config = {
  matcher: [
    '/((?!_next|api|static|.*\\.(?:svg|png|jpg|jpeg|webp|ico|css|js|woff2?|ttf|eot)).*)',
  ],
};
