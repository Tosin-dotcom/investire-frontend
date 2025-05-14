'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  PieChart,
  TrendingUp,
  BarChart2,
  DollarSign,
  Wallet,
  Settings,
  HelpCircle,
  Users,
  Bell,
  ChevronLeft,
  ChevronRight,
  Zap,
  Shield,
  LogOut,
  LineChart
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SideNavProps {
  notificationCount?: number;
}

export default function SideNav({notificationCount = 3}: Readonly<SideNavProps>) {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();

  // Navigation items structure
  const mainNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Portfolio', href: '/portfolio', icon: PieChart },
    {name: 'Market', href: '/market', icon: LineChart },
    { name: 'Trading', href: '/trading', icon: TrendingUp },
    { name: 'Analytics', href: '/analytics', icon: BarChart2 },
    //{ name: 'Expenses', href: '/expenses', icon: DollarSign },
    //{ name: 'Funding', href: '/funding', icon: Wallet },
  ];

  const secondaryNavItems = [
    { name: 'AI Advisor', href: '/advisor', icon: Zap },
    //{ name: 'Security', href: '/security', icon: Shield },
    //{ name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Help', href: '/help', icon: HelpCircle },
  ];

  // Function to check if a nav item is active
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
      <div className={`h-full flex flex-col ${expanded ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 ease-in-out relative`}>
        {/* Toggle button */}
        <button
            onClick={() => setExpanded(!expanded)}
            className="absolute -right-3 top-20 bg-indigo-600 rounded-full p-1 text-white shadow-lg hover:bg-indigo-700 focus:outline-none"
        >
          {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* Logo and Title */}
        {/*<div className="flex items-center px-6 py-6">*/}
        {/*  <div className="flex-shrink-0 bg-indigo-600 rounded-md h-10 w-10 flex items-center justify-center">*/}
        {/*    <span className="font-bold text-lg">F</span>*/}
        {/*  </div>*/}
        {/*  {expanded && (*/}
        {/*      <span className="ml-3 font-semibold text-xl text-white">FinAI</span>*/}
        {/*  )}*/}
        {/*</div>*/}

        {/*/!* User Profile *!/*/}
        {/*<div className={`mt-2 px-4 py-3 ${expanded ? 'flex items-center' : 'flex flex-col items-center'}`}>*/}
        {/*  <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold flex-shrink-0">*/}
        {/*    {userInitials}*/}
        {/*  </div>*/}
        {/*  {expanded && (*/}
        {/*      <div className="ml-3 overflow-hidden">*/}
        {/*        <p className="text-sm font-medium text-white truncate">{userName}</p>*/}
        {/*        <p className="text-xs text-gray-300 truncate">{userRole}</p>*/}
        {/*      </div>*/}
        {/*  )}*/}
        {/*</div>*/}

        {/* Main Navigation */}
        <nav className="mt-6 flex-grow">
          <div className="px-3">
            {expanded ? (
                <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Main
                </p>
            ) : (
                <div className="h-6"></div>
            )}
            <ul className="space-y-1">
              {mainNavItems.map((item) => (
                  <li key={item.name}>
                    <Link
                        href={item.href}
                        className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                            isActive(item.href)
                                ? 'bg-indigo-700 text-white'
                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }`}
                    >
                      <item.icon className={`flex-shrink-0 ${expanded ? 'mr-3' : 'mx-auto'}`} size={20} />
                      {expanded && <span className={`text-sm`}>{item.name}</span>}
                      {isActive(item.href) && !expanded && (
                          <motion.div
                              layoutId="activeIndicator"
                              className="absolute left-0 w-1 h-8 bg-indigo-400 rounded-r"
                          />
                      )}
                    </Link>
                  </li>
              ))}
            </ul>
          </div>

          {/* Secondary Navigation */}
          <div className="px-3 mt-8">
            {expanded ? (
                <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Tools
                </p>
            ) : (
                <div className="h-6"></div> // Spacer for collapsed state
            )}
            <ul className="space-y-1">
              {secondaryNavItems.map((item) => (
                  <li key={item.name}>
                    <Link
                        href={item.href}
                        className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                            isActive(item.href)
                                ? 'bg-indigo-700 text-white'
                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }`}
                    >
                      <item.icon className={`flex-shrink-0 ${expanded ? 'mr-3' : 'mx-auto'}`} size={20} />
                      {expanded && <span className={`text-sm`}>{item.name}</span>}
                      {isActive(item.href) && !expanded && (
                          <motion.div
                              layoutId="activeIndicator2"
                              className="absolute left-0 w-1 h-8 bg-indigo-400 rounded-r"
                          />
                      )}
                    </Link>
                  </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="px-3 py-4 border-t border-gray-800">
          <div className="space-y-3">
            {/* Notifications */}
            <Link
                href="/notifications"
                className={`flex items-center px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors`}
            >
              <div className="relative">
                <Bell size={20} />
                {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {notificationCount}
                </span>
                )}
              </div>
              {expanded && <span className="ml-3 text-sm">Notifications</span>}
            </Link>

            {/* Support/Community */}
            <Link
                href="/community"
                className={`flex items-center px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors`}
            >
              <Users size={20} />
              {expanded && <span className="ml-3 text-sm">Community</span>}
            </Link>

            {/* Logout */}
            <button
                className={`w-full flex items-center px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors`}
            >
              <LogOut size={20} />
              {expanded && <span className="ml-3 text-sm">Sign Out</span>}
            </button>
          </div>
        </div>
      </div>
  );
}