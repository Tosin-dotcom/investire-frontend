"use client"

import { useState, useEffect } from 'react';
import { BarChart3, Bell, Brain, CreditCard, LineChart, Shield, Sparkles, TrendingUp } from 'lucide-react';
import Head from 'next/head';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      text: "Investire has transformed how I manage both personal and business finances. The real-time insights and AI-powered suggestions have helped me make better investment decisions."
    },
    {
      name: "Marcus Chen",
      role: "Day Trader",
      text: "The real-time data feeds and AI-powered sentiment analysis have been game-changers for my trading strategy. I can now react to market shifts instantly."
    },
    {
      name: "Priya Patel",
      role: "Retirement Planner",
      text: "I've tried many financial platforms, but none offer the comprehensive analysis and personalized recommendations that Investire provides. My portfolio performance has improved by 18% in just six months."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
      <div>
        <Head>
          <title>Investire | AI-Powered Investment & Financial Advisory</title>
          <meta name="description"
                content="Investire combines AI financial advisory with real-time trading and investment management"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>

        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          {/* Navigation */}
          <nav className="px-4 py-5 lg:px-16">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span
                    className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Investire</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
                <a href="#how-it-works" className="text-gray-300 hover:text-white transition">How It Works</a>
                <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
                <a href="#testimonials" className="text-gray-300 hover:text-white transition">Testimonials</a>
              </div>

              <div className="hidden md:flex space-x-4">
                <a
                    href="/login"
                    className="px-4 py-2 rounded text-white hover:text-blue-300 transition cursor-pointer">
                  Login
                </a>
                <a
                    href="/register"
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 rounded font-medium hover:from-blue-600 hover:to-teal-600 transition cursor-pointer">
                  Sign up
                </a>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-gray-300 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg">
                    {isMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="mt-4 md:hidden">
                  <div className="flex flex-col space-y-3 pt-2 pb-4">
                    <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
                    <a href="#how-it-works" className="text-gray-300 hover:text-white transition">How It Works</a>
                    <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
                    <a href="#testimonials" className="text-gray-300 hover:text-white transition">Testimonials</a>
                    <div className="flex flex-col space-y-2 pt-2">
                      <button className="px-4 py-2 text-white hover:text-blue-300 transition text-left">Login</button>
                      <button
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 rounded font-medium hover:from-blue-600 hover:to-teal-600 transition">Sign
                        Up Free
                      </button>
                    </div>
                  </div>
                </div>
            )}
          </nav>

          {/* Hero Section */}
          <header className="px-4 pt-16 pb-24 lg:px-16 text-center lg:text-left lg:flex items-center justify-between">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                AI-Powered Finance to <span
                  className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Maximize</span> Your
                Wealth
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                Combine AI financial advisory with real-time trading analytics. Get personalized investment strategies,
                track expenses, and optimize your portfolio—all in one powerful platform.
              </p>
              <div
                  className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg font-medium text-lg hover:from-blue-600 hover:to-teal-600 transition pointer">
                  Get Started
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  <img className="w-10 h-10 rounded-full border-2 border-gray-900" src="https://randomuser.me/api/portraits/women/48.jpg"
                       alt="User avatar"/>
                  <img className="w-10 h-10 rounded-full border-2 border-gray-900" src="https://randomuser.me/api/portraits/men/8.jpg"
                       alt="User avatar"/>
                  <img className="w-10 h-10 rounded-full border-2 border-gray-900" src="https://randomuser.me/api/portraits/women/32.jpg"
                       alt="User avatar"/>
                </div>
                <p className="ml-4 text-sm text-gray-300">Join <span
                    className="font-semibold text-blue-400">10,000+</span> investors already using Investire</p>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="bg-gray-800 bg-opacity-50 p-4 rounded-2xl border border-gray-700 shadow-2xl">
                <img
                    src="/api/placeholder/600/400"
                    alt="Investire Dashboard Preview"
                    className="rounded-lg w-full"
                />
              </div>
              <div
                  className="absolute -bottom-6 -right-6 bg-blue-900 bg-opacity-80 p-3 rounded-lg border border-blue-700 shadow-lg hidden md:block">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="text-green-400" size={24}/>
                  <div>
                    <p className="text-xs text-gray-300">Portfolio Performance</p>
                    <p className="text-lg font-bold text-green-400">+23.4%</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Features Section */}
          <section id="features" className="py-20 px-4 lg:px-16 bg-gray-800">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Modern Investors</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our platform combines advanced AI with real-time market data to deliver a complete financial management
                solution.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div
                  className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition duration-300">
                <div
                    className="bg-blue-900 bg-opacity-30 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <LineChart className="text-blue-400" size={24}/>
                </div>
                <h3 className="text-xl font-semibold mb-3">Real-Time Market Data</h3>
                <p className="text-gray-300">
                  Access live stock and crypto feeds with instant price updates, historical charts, and trend analysis.
                </p>
              </div>

              {/* Feature 2 */}
              <div
                  className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition duration-300">
                <div
                    className="bg-purple-900 bg-opacity-30 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Brain className="text-purple-400" size={24}/>
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered Advisory</h3>
                <p className="text-gray-300">
                  Get personalized financial advice, portfolio optimization recommendations, and sentiment analysis of
                  market news.
                </p>
              </div>

              {/* Feature 3 */}
              <div
                  className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition duration-300">
                <div
                    className="bg-teal-900 bg-opacity-30 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <BarChart3 className="text-teal-400" size={24}/>
                </div>
                <h3 className="text-xl font-semibold mb-3">Advanced Analytics</h3>
                <p className="text-gray-300">
                  Track performance with comprehensive metrics, risk-adjusted returns, and downloadable investment
                  reports.
                </p>
              </div>

              {/* Feature 4 */}
              <div
                  className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition duration-300">
                <div
                    className="bg-red-900 bg-opacity-30 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Bell className="text-red-400" size={24}/>
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Notifications</h3>
                <p className="text-gray-300">
                  Receive instant alerts on price movements, significant news, and AI-generated investment
                  opportunities.
                </p>
              </div>

              {/* Feature 5 */}
              <div
                  className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition duration-300">
                <div
                    className="bg-green-900 bg-opacity-30 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <CreditCard className="text-green-400" size={24}/>
                </div>
                <h3 className="text-xl font-semibold mb-3">Trading & Transactions</h3>
                <p className="text-gray-300">
                  Execute trades with our intuitive interface and track your complete transaction history with detailed
                  logs.
                </p>
              </div>

              {/* Feature 6 */}
              <div
                  className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition duration-300">
                <div
                    className="bg-orange-900 bg-opacity-30 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  <Sparkles className="text-orange-400" size={24}/>
                </div>
                <h3 className="text-xl font-semibold mb-3">Automated Strategies</h3>
                <p className="text-gray-300">
                  Implement AI-powered trading strategies with customizable parameters based on market conditions.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="py-20 px-4 lg:px-16">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Investire Works</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our platform seamlessly integrates AI advisory with real-time trading capabilities
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {/* Step 1 */}
              <div className="text-center">
                <div
                    className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold mx-auto mb-6">1
                </div>
                <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
                <p className="text-gray-300">
                  Define your financial goals, risk tolerance, and investment preferences to receive tailored
                  recommendations.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div
                    className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold mx-auto mb-6">2
                </div>
                <h3 className="text-xl font-semibold mb-3">Link Your Bank & Fund Wallet</h3>
                <p className="text-gray-300">
                  Connect your bank to deposit funds, invest in stocks, crypto, and commodities, and manage everything from a single dashboard.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div
                    className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold mx-auto mb-6">3
                </div>
                <h3 className="text-xl font-semibold mb-3">Get AI-Powered Insights</h3>
                <p className="text-gray-300">
                  Receive personalized recommendations, market analysis, and automated trading strategies tailored to
                  your goals.
                </p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <button
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg font-medium text-lg hover:from-blue-600 hover:to-teal-600 transition">
                Start Your Journey
              </button>
            </div>
          </section>

          {/* Testimonials */}
          <section id="testimonials" className="py-20 px-4 lg:px-16 bg-gray-800">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Join thousands of investors who have transformed their financial future with Investire
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-900 p-8 rounded-xl border border-gray-700 relative">
                <div className="absolute top-6 left-8 text-6xl text-blue-500 opacity-20"></div>
                <div className="relative z-10">
                  <p className="text-xl text-gray-300 mb-6">
                    {testimonials[currentIndex].text}
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-900 mr-4"></div>
                    <div>
                      <p className="font-semibold">{testimonials[currentIndex].name}</p>
                      <p className="text-gray-400 text-sm">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${
                            index === currentIndex ? 'bg-blue-500' : 'bg-gray-600'
                        }`}
                    />
                ))}
              </div>
            </div>
          </section>


          {/* CTA Section */}
          <section className="py-20 px-4 lg:px-16 bg-gradient-to-r from-blue-900 to-teal-900">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Financial Future?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Join thousands of investors who are already using AI to maximize their returns and optimize their
                portfolios.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button
                    className="px-8 py-4 bg-white text-gray-900 rounded-lg font-medium text-lg hover:bg-gray-100 transition">
                  Start Free Trial
                </button>
                <button
                    className="px-8 py-4 border border-white rounded-lg font-medium text-lg hover:bg-white/10 transition">
                  Schedule Demo
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center">
                <Shield size={20} className="text-gray-300 mr-2"/>
                <p className="text-gray-300">14-day free trial. No credit card required.</p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 px-4 lg:px-16 bg-gray-900">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Investire</h3>
                  <p className="text-gray-400 mb-6">
                    AI-powered financial advisory and real-time trading platform that helps you make smarter investment
                    decisions.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white transition">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.107 4.107 0 001.27 5.477A4.073 4.073 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                      </svg>
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Product</h4>
                  <ul className="space-y-2">
                    <li><a href="#features" className="text-gray-400 hover:text-white transition">Features</a></li>
                    <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition">How It Works</a>
                    </li>
                    <li><a href="#pricing" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                    <li><a href="#testimonials" className="text-gray-400 hover:text-white transition">Testimonials</a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Company</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Legal</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition">Cookie Policy</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition">Licenses</a></li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} Investire. All rights reserved.
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Stock data provided by financial partners. Past performance is not indicative of future results.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
  )

}