import { Rss } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Mind the Gap. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Rss className="h-4 w-4" />
              <span>Subscribe:</span>
              <Link
                href="/feed.xml"
                className="hover:text-primary transition-colors"
                title="RSS Feed"
              >
                RSS
              </Link>
              <span>•</span>
              <Link
                href="/feed.json"
                className="hover:text-primary transition-colors"
                title="JSON Feed"
              >
                JSON
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
