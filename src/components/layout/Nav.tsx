'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  Search,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  Menu,
  X,
  MoonStar,
  Sun
} from 'lucide-react';
import Image from "next/image";

interface NavBarProps {
  userName: string;
  userAvatar?: string;
  userInitials?: string;
  onSidebarToggle?: () => void;
  notificationCount?: number;
  messageCount?: number;
}

export default function NavBar({
                                 userName = 'John Doe',
                                 userAvatar,
                                 userInitials = 'JD',
                                 notificationCount = 3,
                                 messageCount = 2
                               }: Readonly<NavBarProps>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search submitted:', searchQuery);
    // Implement search functionality here
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Implement actual dark mode toggle functionality here
    // This might involve updating a theme context or localStorage
  };

  return (
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            {/* Left section: Mobile menu button and logo (on larger screens) */}
            <div className="flex items-center">
              {/* Mobile menu button */}


              {/* Logo - visible on medium and larger screens */}
              <div className="hidden md:flex items-center ml-4">
                <Link href="/dashboard" className="flex items-center">
                  <div className="flex items-center">
                    <span className="inline-flex items-center">
                        <Image
                            src="/images/investire2.png"
                            alt="Investire Logo"
                            width={80}
                            height={80}
                            className="mr-2"
                        />
                      </span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Center section: Search */}
            <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-start">
              <form onSubmit={handleSearchSubmit} className="w-full max-w-lg">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search
                        className={`h-5 w-5 ${
                            isSearchFocused ? 'text-indigo-600' : 'text-gray-400'
                        }`}
                        aria-hidden="true"
                    />
                  </div>
                  <input
                      type="text"
                      name="search"
                      id="search"
                      className={`block w-full rounded-md border-0 bg-white dark:bg-gray-700 py-1.5 pl-10 pr-3 
                    text-gray-900 dark:text-gray-100 ring-1 ring-inset 
                    ${
                          isSearchFocused
                              ? 'ring-indigo-600 placeholder:text-indigo-300'
                              : 'ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400'
                      } 
                    focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                      placeholder="Search stocks, crypto, or expenses..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                  />
                </div>
              </form>
            </div>

            {/* Right section: Action icons and profile */}
            <div className="flex items-center lg:ml-4">
              {/* Theme Toggle */}
              <button
                  type="button"
                  onClick={toggleDarkMode}
                  className="ml-2 rounded-full bg-white dark:bg-gray-700 p-1.5 text-gray-500 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Toggle theme</span>
                {isDarkMode ? (
                    <Sun className="h-5 w-5" aria-hidden="true" />
                ) : (
                    <MoonStar className="h-5 w-5" aria-hidden="true" />
                )}
              </button>

              {/* Help Button */}
              <Link
                  href="/help"
                  className="ml-2 rounded-full bg-white dark:bg-gray-700 p-1.5 text-gray-500 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Help</span>
                <HelpCircle className="h-5 w-5" aria-hidden="true" />
              </Link>

              {/* Messages */}
              <Link
                  href="/messages"
                  className="ml-2 rounded-full bg-white dark:bg-gray-700 p-1.5 text-gray-500 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 relative"
              >
                <span className="sr-only">Messages</span>
                <MessageSquare className="h-5 w-5" aria-hidden="true" />
                {messageCount > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                  {messageCount}
                </span>
                )}
              </Link>

              {/* Notifications */}
              <Link
                  href="/notifications"
                  className="ml-2 rounded-full bg-white dark:bg-gray-700 p-1.5 text-gray-500 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 relative"
              >
                <span className="sr-only">Notifications</span>
                <Bell className="h-5 w-5" aria-hidden="true" />
                {notificationCount > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                  {notificationCount}
                </span>
                )}
              </Link>

              {/* Profile dropdown */}
              <div className="relative ml-4">
                <div>
                  <button
                      type="button"
                      className="flex items-center rounded-full bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      id="user-menu-button"
                      aria-expanded={isProfileMenuOpen}
                      aria-haspopup="true"
                      onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    {userAvatar ? (
                        <img
                            className="h-8 w-8 rounded-full"
                            src={userAvatar}
                            alt={`${userName}'s avatar`}
                        />
                    ) : (
                        <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-medium">
                          {userInitials}
                        </div>
                    )}
                    <ChevronDown className="ml-1 h-4 w-4 text-gray-500 dark:text-gray-300" />
                  </button>
                </div>

                {/* Dropdown menu */}
                {isProfileMenuOpen && (
                    <div
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                    >
                      <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          role="menuitem"
                      >
                        Your Profile
                      </Link>
                      <Link
                          href="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          role="menuitem"
                      >
                        Settings
                      </Link>
                      <Link
                          href="/billing"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          role="menuitem"
                      >
                        Billing
                      </Link>
                      <Link
                          href="/support"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          role="menuitem"
                      >
                        Support
                      </Link>
                      <div className="border-t border-gray-200 dark:border-gray-600"></div>
                      <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          role="menuitem"
                      >
                        Sign out
                      </button>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on mobile menu state */}
        {isMobileMenuOpen && (
            <div className="lg:hidden" id="mobile-menu">
              <div className="space-y-1 px-2 pb-3 pt-2">
                <Link
                    href="/dashboard"
                    className="block rounded-md px-3 py-2 text-base font-medium text-indigo-600 dark:text-indigo-400 bg-gray-50 dark:bg-gray-700"
                >
                  Dashboard
                </Link>
                <Link
                    href="/portfolio"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Portfolio
                </Link>
                <Link
                    href="/trading"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Trading
                </Link>
                <Link
                    href="/analytics"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Analytics
                </Link>
                <Link
                    href="/expenses"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  Expenses
                </Link>
                <Link
                    href="/advisor"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  AI Advisor
                </Link>
              </div>
            </div>
        )}
      </header>
  );
}