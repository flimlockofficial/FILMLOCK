import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-14rem)] max-w-screen-2xl flex-col items-center justify-center py-16 text-center">
      <div>
        <h1 className="font-headline text-5xl font-bold">Contact Us</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Have questions, feedback, or just want to say hello? The best way to
          reach us is through our official Telegram channel.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="https://t.me/flimlock" target="_blank" rel="noopener noreferrer">
              <Send className="mr-2 h-5 w-5" />
              Contact on Telegram
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
