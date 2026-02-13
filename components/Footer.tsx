import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

type FooterLink = {
  label: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const footerSections: FooterSection[] = [
  {
    title: "Shop",
    links: [
      { label: "Necklaces", href: "#" },
      { label: "Rings", href: "#" },
      { label: "Bracelets", href: "#" },
      { label: "Earrings", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQs", href: "#" },
      { label: "Shipping & Returns", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        
        {/* Brand + Contact */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">LuxeJewels</h2>
          <p className="text-sm text-gray-400">
            Premium jewelry crafted for elegance and timeless beauty.
          </p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin size={16} /> Nairobi, Kenya
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} /> +254 700 000 000
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} /> support@luxejewels.com
            </div>
          </div>
        </div>

        {/* Link Sections */}
        {footerSections.map((section) => (
          <div key={section.title}>
            <h3 className="font-semibold text-white mb-4">{section.title}</h3>
            <ul className="space-y-2 text-sm">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-yellow-500 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Newsletter</h3>
          <p className="text-sm text-gray-400">
            Get updates on new collections and exclusive offers.
          </p>

          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded-md text-gray-900 text-sm w-full"
              required
            />
            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm transition"
            >
              Subscribe
            </button>
          </form>

          {/* Socials */}
          <div className="flex gap-4 pt-2">
            <Facebook className="cursor-pointer hover:text-yellow-500 transition" />
            <Instagram className="cursor-pointer hover:text-yellow-500 transition" />
            <Twitter className="cursor-pointer hover:text-yellow-500 transition" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 text-center text-sm py-4 text-gray-500">
        © {new Date().getFullYear()} LuxeJewels. All rights reserved.
      </div>
    </footer>
  );
}
