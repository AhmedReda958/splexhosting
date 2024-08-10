import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/admin-dashboard/:path*"], // Add the routes you want to protect
};
