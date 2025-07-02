import Link from 'next/link';
import { Button } from './ui/button';
import { EventStatementDialog } from './EventStatementDialog';

export function Footer() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <Link href="/" className="font-bold font-headline text-2xl">
            ShopStream
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="link" asChild>
              <Link href="https://mia-sheep-su.github.io/AboutMe/" target="_blank" rel="noopener noreferrer">聯絡我們</Link>
            </Button>
            <EventStatementDialog />
            <Button variant="link" asChild>
              <Link href="https://mia-sheep-su.github.io/AboutMe/" target="_blank" rel="noopener noreferrer">品牌故事</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ShopStream. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
