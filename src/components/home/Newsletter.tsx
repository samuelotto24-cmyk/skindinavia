"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="bg-secondary py-24">
      <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
        <h2 className="text-3xl font-light tracking-tight sm:text-4xl">
          Join the Skindinavia Community
        </h2>
        <p className="mt-4 text-muted-foreground">
          Get exclusive offers, pro tips, and early access to new products
          delivered straight to your inbox.
        </p>

        {submitted ? (
          <div className="mt-10 rounded-2xl border border-border/50 bg-card px-8 py-6">
            <p className="text-lg font-medium">Thank you!</p>
            <p className="mt-1 text-sm text-muted-foreground">
              You&apos;re on the list. Watch your inbox for something special.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
          >
            <Input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 flex-1 rounded-xl bg-card px-4 sm:max-w-sm"
            />
            <Button
              type="submit"
              size="lg"
              className="h-11 rounded-xl px-8 text-sm tracking-wide"
            >
              Subscribe
            </Button>
          </form>
        )}

        <p className="mt-4 text-xs text-muted-foreground/60">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
