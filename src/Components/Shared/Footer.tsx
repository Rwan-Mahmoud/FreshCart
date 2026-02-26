import { faFacebookF, faInstagram, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#0f172a] text-gray-300">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          {/* Main Grid */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5 md:gap-12">
            {/* Logo + Description */}
            <div className="col-span-2 md:col-span-2">
              <div className="mb-6">
                <div className="inline-flex items-center gap-3">
                  <span className="bg-green-600 text-white px-3 py-1.5 rounded-md font-bold text-lg">

                     FreshCart
                  </span>
                </div>
              </div>

              <p className="mb-6 text-gray-400 leading-relaxed">
                FreshCart is your one-stop destination for quality products.
                From fashion to electronics, we bring you the best brands at
                competitive prices with a seamless shopping experience.
              </p>

              <div className="space-y-3 text-sm">
                <p className="flex items-center gap-3">
                
                  <a
                    href="tel:+18001234567"
                    className="hover:text-white transition-colors"
                  >
                    +1 (800) 123-4567
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  
                  <a
                    href="mailto:support@freshcart.com"
                    className="hover:text-white transition-colors"
                  >
                    support@freshcart.com
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  
                  123 Commerce Street, New York, NY 10001
                </p>
              </div>
            </div>

            {/* Shop */}
            <div>
              <h3 className="mb-5 font-semibold text-white">Shop</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/products"
                    className="hover:text-white transition-colors"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories"
                    className="hover:text-white transition-colors"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/brands"
                    className="hover:text-white transition-colors"
                  >
                    Brands
                  </Link>
                </li>
                <li>
                  <Link
                    href="/electronics"
                    className="hover:text-white transition-colors"
                  >
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mens-fashion"
                    className="hover:text-white transition-colors"
                  >
                    Men&apos;s Fashion
                  </Link>
                </li>
                <li>
                  <Link
                    href="/womens-fashion"
                    className="hover:text-white transition-colors"
                  >
                    Women&apos;s Fashion
                  </Link>
                </li>
              </ul>
            </div>

            {/* Account */}
            <div>
              <h3 className="mb-5 font-semibold text-white">Account</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/account"
                    className="hover:text-white transition-colors"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="/orders"
                    className="hover:text-white transition-colors"
                  >
                    Order History
                  </Link>
                </li>
                <li>
                  <Link
                    href="/wishlist"
                    className="hover:text-white transition-colors"
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cart"
                    className="hover:text-white transition-colors"
                  >
                    Shopping Cart
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signin"
                    className="hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="hover:text-white transition-colors"
                  >
                    Create Account
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="mb-5 font-semibold text-white">Support</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="hover:text-white transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping"
                    className="hover:text-white transition-colors"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    href="/returns"
                    className="hover:text-white transition-colors"
                  >
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link
                    href="/track-order"
                    className="hover:text-white transition-colors"
                  >
                    Track Order
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="mb-5 font-semibold text-white">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-sm">
              {/* Social Icons */}
              <div className="flex items-center gap-5">
                <a href="#" className="hover:text-[#1877F2] transition-colors">
                  <FontAwesomeIcon icon={faFacebookF} size="lg" />
                </a>

                <a href="#" className="hover:text-[#000000] transition-colors">
                  <FontAwesomeIcon icon={faXTwitter} size="lg" />
                </a>

                <a href="#" className="hover:text-[#E1306C] transition-colors">
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>

                <a href="#" className="hover:text-[#FF0000] transition-colors">
                  <FontAwesomeIcon icon={faYoutube} size="lg" />
                </a>
              </div>

              {/* Copyright */}
              <div className="text-center md:text-right">
                © 2026 FreshCart. All rights reserved.
              </div>

          
            </div>

            {/* Activate Windows (just for fun 😂) */}
            <div className="mt-4 text-center text-xs text-gray-600">
              Activate Windows · Go to Settings to activate Windows.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
