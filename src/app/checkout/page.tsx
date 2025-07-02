import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center space-y-6">
          <CheckCircle className="mx-auto h-24 w-24 text-green-500" />
          <h1 className="text-4xl font-headline font-bold">Thank You!</h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            This is a placeholder for the checkout page. In a real application, this would be a multi-step form to collect payment and shipping information.
          </p>
          <Button asChild size="lg">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
