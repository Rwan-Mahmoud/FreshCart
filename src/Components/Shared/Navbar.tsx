"use client";

import freshCartLogo from "../../Assets/Images/freshcart-logo.svg";
import {
  faArrowRightFromBracket,
  faCartArrowDown,
  faChevronDown,
  faEnvelope,
  faGift,
  faHeart,
  faMagnifyingGlass,
  faPhone,
  faUser,
  faUserPlus,
  faVanShuttle,
  faBars,
  faTimes,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { AppState } from "@/Store/store";
import useLogout from "@/Features/Auth/Hooks/useLogout";
import { useState } from "react";

export default function Navbar() {
  const { logout } = useLogout();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { isAuthenticated } = useSelector(
    (appState: AppState) => appState.auth,
  );

  return (
    <>
      <main className="">
        {/* top of Navbar - hidden on mobile */}
        <div className="border-b border-gray-400/20 py-4 hidden lg:block">
          <div className="container flex justify-between items-center">
            <ul className="flex gap-4">
              <li className="space-x-1">
                <FontAwesomeIcon
                  icon={faVanShuttle}
                  className="text-green-500"
                />
                <span className="text-gray-500 text-sm">
                  Free Shipping on Orders 500 EGP
                </span>
              </li>
              <li className="space-x-1">
                <FontAwesomeIcon icon={faGift} className="text-green-500" />
                <span className="text-gray-500 text-sm">
                  New Arrivals Daily
                </span>
              </li>
            </ul>

            <div className="flex gap-9 justify-between text-gray-500">
              <ul className="flex gap-5 *:hover:text-green-600">
                <li className="space-x-1.5 text-sm">
                  <FontAwesomeIcon icon={faPhone} />
                  <a href="tel:+1 (800) 123-4567">+1 (800) 123-4567 </a>
                </li>
                <li className="space-x-1.5 text-sm">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <a href="mailto:support@freshcart.com">
                    support@freshcart.com
                  </a>
                </li>
              </ul>

              <ul className="flex gap-3 *:hover:text-green-600">
                {isAuthenticated ? (
                  <li className="cursor-pointer text-sm" onClick={logout}>
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      className="pr-1"
                    />
                    <span>Logout</span>
                  </li>
                ) : (
                  <>
                    <li className="space-x-2 text-sm">
                      <Link href="/Login">
                        <FontAwesomeIcon icon={faUser} className="pr-1" />
                        Sign In
                      </Link>
                    </li>
                    <li className="text-sm">
                      <Link href="/signup" className="">
                        <FontAwesomeIcon icon={faUserPlus} className="pr-1" />
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom of Navbar */}
        <div className="py-4 shadow-sm">
          <div className="container flex justify-between items-center">
            {/* Hamburger - mobile only */}
            <button
              className="lg:hidden text-gray-600 text-xl"
              onClick={() => setMobileMenuOpen(true)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>

            <div className="logo">
              <Link href="/">
                <Image src={freshCartLogo} alt="freshCart logo" />
              </Link>
            </div>

            {/* Search - hidden on mobile */}
            <div className="hidden lg:flex items-center relative">
              <input
                type="search"
                className="min-w-96 outline-none border border-gray-400/30 rounded-2xl py-2 px-2 focus:border-green-600"
                placeholder="search for products, brands and more"
              />
              <FontAwesomeIcon
                className="absolute right-4 text-gray-400"
                icon={faMagnifyingGlass}
              />
            </div>

            {/* Nav links - hidden on mobile */}
            <ul className="hidden lg:flex gap-6 text-gray-600">
              <li className="hover:text-green-600">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:text-green-600">
                <Link href="/shop">Shop</Link>
              </li>
              <li className="relative group z-20">
                <div className="hover:text-green-600">
                  <Link href="/Categories">Categories</Link>
                  <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
                </div>

                <menu className="bg-white shadow-lg rounded-lg absolute min-w-36 text-center hidden group-hover:block">
                  <li className="text-sm py-2 border-b border-gray-400/20 hover:bg-gray-300/20">
                    <Link href={"/Categories"}>All Categories</Link>
                  </li>
                  <li className="text-sm py-2 border-b border-gray-400/20 hover:bg-gray-300/20">
                    <Link href="/electronics">Electronics</Link>
                  </li>
                  <li className="text-sm py-2 border-b border-gray-400/20 hover:bg-gray-300/20">
                    <Link href="">Women&apos;s Fashion</Link>
                  </li>
                  <li className="text-sm py-2 border-b border-gray-400/20 hover:bg-gray-300/20">
                    <Link href="">Men&apos;s Fashion</Link>
                  </li>
                  <li className="text-sm py-2 border-b border-gray-400/20 hover:bg-gray-300/20">
                    <Link href="">Beauty & Health</Link>
                  </li>
                </menu>
              </li>
              <li className="hover:text-green-600">
                <Link href="/brands">Brands</Link>
              </li>
            </ul>

            {/* Icons */}
            <ul className="flex gap-5 text-gray-500 *:hover:text-green-600 text-2xl items-center">
              <li>
                <Link href="/whishlist">
                  <FontAwesomeIcon icon={faHeart} />
                </Link>
              </li>
              <li>
                <Link href="/cart">
                  <FontAwesomeIcon icon={faCartArrowDown} />
                </Link>
              </li>
            </ul>

            {/* User avatar / Sign In */}
            {isAuthenticated ? (
              <div className="relative group z-20 hidden lg:block">
                <div className="bg-gray-300 text-gray-700 w-10 h-10 rounded-full flex items-center justify-center hover:text-green-600">
                  <FontAwesomeIcon icon={faUser} className="text-sm" />
                </div>

                <menu className="bg-white shadow-lg rounded-lg absolute min-w-36 text-center hidden group-hover:block">
                  <li className="text-sm py-2 border-b border-gray-400/20 hover:bg-gray-300/20">
                    <Link href={"/cart"}>My Cart</Link>
                  </li>
                  <li className="text-sm py-2 border-b border-gray-400/20 hover:bg-gray-300/20">
                    <Link href="/whishlist">My whishList</Link>
                  </li>
                  <li className="text-sm py-2 border-b border-gray-400/20 hover:bg-gray-300/20">
                    <Link href="/orders">My Orders</Link>
                  </li>
                </menu>
              </div>
            ) : (
              <Link
                href="/Login"
                className="hidden lg:flex bg-green-600 rounded-2xl px-3 py-2 text-white hover:bg-green-700"
              >
                <FontAwesomeIcon icon={faUser} className="mr-1" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden px-4 pb-3">
          <div className="flex items-center relative">
            <input
              type="search"
              className="w-full outline-none border border-gray-400/30 rounded-2xl py-2 px-4 focus:border-green-600"
              placeholder="search for products, brands and more"
            />
            <FontAwesomeIcon
              className="absolute right-4 text-gray-400"
              icon={faMagnifyingGlass}
            />
          </div>
        </div>

        {/* Mobile Drawer Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Drawer */}
        <div
          className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 lg:hidden flex flex-col ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              <Image src={freshCartLogo} alt="freshCart logo" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-500 text-xl hover:text-gray-800"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Drawer Nav Links */}
          <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-green-600 font-medium"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-green-600 font-medium"
            >
              Shop
            </Link>
            <Link
              href="/Categories"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-green-600 font-medium"
            >
              Categories
            </Link>
            <Link
              href="/brands"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-green-600 font-medium"
            >
              Brands
            </Link>

            <div className="border-t border-gray-200 pt-3 mt-3">
              <Link
                href="/whishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 text-gray-700 hover:text-green-600"
              >
                <FontAwesomeIcon icon={faHeart} className="text-red-400" />
                Wishlist
              </Link>
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 py-2 text-gray-700 hover:text-green-600"
              >
                <FontAwesomeIcon
                  icon={faCartArrowDown}
                  className="text-green-500"
                />
                Cart
              </Link>
            </div>

            {isAuthenticated && (
              <div className="border-t border-gray-200 pt-3 mt-3">
                <Link
                  href="/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-gray-700 hover:text-green-600"
                >
                  My Orders
                </Link>
              </div>
            )}
          </nav>

          {/* Drawer Footer */}
          <div className="px-4 py-4 border-t border-gray-200 space-y-3">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-gray-600 hover:text-red-500"
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                Logout
              </button>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/Login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center bg-green-600 text-white rounded-2xl py-2 hover:bg-green-700"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center border border-green-600 text-green-600 rounded-2xl py-2 hover:bg-green-50"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <div className="text-xs text-gray-400 space-y-1">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faHeadset} className="text-green-500" />
                <span>Need Help? Contact Support</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}