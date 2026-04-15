// 404 Not Found Page
// Design: Institutional Elegance - Professional error page

import { Link } from "wouter";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-accent mb-4">404</h1>
          <h2 className="font-serif text-3xl font-bold text-primary mb-4">
            Page Not Found
          </h2>
        </div>

        <p className="text-foreground/70 text-lg mb-8">
          Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        <Link href="/">
          <span className="btn-primary inline-flex items-center gap-2">
            <Home className="w-4 h-4" />
            Back to Home
          </span>
        </Link>
      </div>
    </div>
  );
}
