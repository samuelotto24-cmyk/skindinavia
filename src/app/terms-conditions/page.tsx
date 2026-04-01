import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Terms & Conditions — Skindinavia",
  description:
    "Terms and conditions governing the use of skindinavia.com and purchases made through our online store.",
};

const sections = [
  {
    title: "General Terms",
    content:
      "By accessing and using the Skindinavia website (skindinavia.com), you agree to be bound by these Terms and Conditions, all applicable laws, and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials on this website are protected by applicable copyright and trademark law. We reserve the right to modify these terms at any time without prior notice. Your continued use of the website following any changes constitutes acceptance of those changes.",
  },
  {
    title: "Ordering",
    content:
      "When you place an order through our website, you are making an offer to purchase the products you have selected. All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in product or pricing information, or suspected fraudulent activity. If your order is cancelled after payment has been processed, a full refund will be issued to your original payment method. Order confirmation emails are sent upon successful placement of your order and do not constitute acceptance of your order.",
  },
  {
    title: "Payment",
    content:
      "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All prices are listed in US dollars unless otherwise specified. Sales tax is calculated and applied based on your shipping address in accordance with applicable state and local tax laws. Payment is processed at the time of order placement. Your financial information is encrypted and processed securely through our PCI-compliant payment processors. We do not store your complete credit card information on our servers.",
  },
  {
    title: "Shipping",
    content:
      "Shipping times and costs are outlined on our Shipping & Returns page. While we make every effort to deliver products within the estimated timeframes, delivery dates are not guaranteed. Skindinavia is not responsible for delays caused by shipping carriers, weather events, customs processing, or other circumstances beyond our control. Risk of loss and title for products purchased from our website pass to you upon delivery of the items to the shipping carrier. If your package is lost or damaged during transit, please contact our support team for assistance.",
  },
  {
    title: "Returns & Refunds",
    content:
      "We offer a 30-day satisfaction guarantee on all regular-priced products. To be eligible for a return, products must be in their original packaging with at least 75% of the product remaining. Sale items and gift cards are final sale. Refunds are processed within 5-7 business days of receiving the returned product and are issued to the original payment method. Shipping costs for returns are covered by Skindinavia for domestic orders. International return shipping is the responsibility of the customer. Please see our Shipping & Returns page for detailed return instructions.",
  },
  {
    title: "Limitation of Liability",
    content:
      "Skindinavia and its suppliers shall not be held liable for any damages arising from the use or inability to use the materials on our website or products purchased through our website, even if Skindinavia or an authorized representative has been notified of the possibility of such damages. This includes, but is not limited to, direct, indirect, incidental, punitive, and consequential damages. Some jurisdictions do not allow limitations on implied warranties or limitation of liability for incidental or consequential damages, so the above limitations may not apply to you. In no event shall our total liability exceed the amount you paid for the product(s) giving rise to the claim.",
  },
];

export default function TermsConditionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Legal
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight lg:text-5xl">
          Terms &amp; Conditions
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
          Last updated: March 1, 2026
        </p>
      </div>

      <Separator className="my-14" />

      <div className="space-y-12">
        {sections.map((section, index) => (
          <section key={index}>
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {section.content}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
