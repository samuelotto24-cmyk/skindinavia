import { faqs } from "@/lib/mock-data";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export const metadata = {
  title: "FAQ — Skindinavia",
  description:
    "Frequently asked questions about Skindinavia setting sprays, shipping, returns, and more.",
};

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Support
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight lg:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Everything you need to know about Skindinavia products, shipping, and
          returns. Can&apos;t find your answer?{" "}
          <a href="/contact-us" className="underline underline-offset-4">
            Contact us
          </a>
          .
        </p>
      </div>

      <div className="mt-14">
        <Accordion>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={String(index)}>
              <AccordionTrigger className="text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
