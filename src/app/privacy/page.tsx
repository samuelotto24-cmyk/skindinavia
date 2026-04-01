import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Privacy Policy — Skindinavia",
  description:
    "How Skindinavia collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "Information We Collect",
    content:
      "When you visit skindinavia.com, we collect certain information automatically, including your IP address, browser type, operating system, referring URLs, and pages viewed. When you make a purchase or create an account, we collect personal information you provide directly, including your name, email address, shipping address, billing address, and phone number. Payment information (credit card numbers, expiration dates) is processed securely by our PCI-compliant payment processors and is not stored on our servers. If you sign up for our newsletter, we collect your email address and any preferences you indicate.",
  },
  {
    title: "How We Use Your Information",
    content:
      "We use the information we collect to process and fulfill your orders, communicate with you about your purchases and account, send promotional emails and newsletters (with your consent), improve our website, products, and customer experience, prevent fraud and maintain security, comply with legal obligations, and personalize your shopping experience. We do not sell, rent, or trade your personal information to third parties for their marketing purposes. We will never share your information except as described in this policy or with your explicit consent.",
  },
  {
    title: "Cookies & Tracking",
    content:
      "We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. Essential cookies are required for the website to function properly (shopping cart, login sessions). Analytics cookies help us understand how visitors interact with our website by collecting information anonymously. Marketing cookies are used to deliver relevant advertisements and track the effectiveness of our marketing campaigns. You can control cookie preferences through your browser settings. Disabling certain cookies may affect website functionality.",
  },
  {
    title: "Third-Party Services",
    content:
      "We work with trusted third-party service providers to operate our business, including payment processors (for secure transaction handling), shipping carriers (for order delivery), email service providers (for newsletters and transactional emails), analytics providers (for website performance insights), and advertising platforms (for relevant marketing). These providers have access only to the personal information necessary to perform their specific functions and are contractually obligated to protect your data and use it only for the purposes we specify. We do not allow them to use your personal information for their own marketing purposes.",
  },
  {
    title: "Your Rights",
    content:
      "You have the right to access the personal information we hold about you, request correction of inaccurate information, request deletion of your personal data (subject to legal retention requirements), opt out of marketing communications at any time, and request a portable copy of your data. California residents have additional rights under the CCPA, including the right to know what personal information is collected and how it is used, the right to request deletion, and the right to opt out of the sale of personal information. To exercise any of these rights, contact us at support@skindinavia.com. We will respond to all requests within 30 days.",
  },
  {
    title: "Data Security",
    content:
      "We implement industry-standard security measures to protect your personal information, including SSL/TLS encryption for all data transmitted between your browser and our servers, PCI DSS compliance for payment processing, regular security audits and vulnerability assessments, restricted access to personal data on a need-to-know basis, and secure data storage with encryption at rest. While we take every reasonable precaution to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to maintaining the highest standards of data protection.",
  },
  {
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will notify you by posting the updated policy on this page with a revised \"last updated\" date. We encourage you to review this policy periodically. Your continued use of our website after changes are posted constitutes acceptance of the updated policy.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Legal
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight lg:text-5xl">
          Privacy Policy
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

      <Separator className="my-14" />

      <div className="text-center text-sm text-muted-foreground">
        <p>
          Questions about our privacy practices? Contact us at{" "}
          <a
            href="mailto:support@skindinavia.com"
            className="font-medium text-foreground underline underline-offset-4"
          >
            support@skindinavia.com
          </a>
        </p>
      </div>
    </div>
  );
}
