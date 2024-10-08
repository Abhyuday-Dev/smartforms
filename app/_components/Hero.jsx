'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, FileSpreadsheet, PenLine, BarChart3, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white min-h-screen flex flex-col justify-between">
      <div className="mx-auto max-w-screen-xl px-4 py-16 lg:flex lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold sm:text-5xl"
          >
            Create AI-Powered Forms
            <span className="block font-extrabold text-primary mt-2">in Seconds</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 sm:text-xl/relaxed text-gray-700"
          >
            Generate, edit, and style forms effortlessly using Gemini AI. Analyze responses and export data with ease.
          </motion.p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90">
                <Link href="/dashboard">
                  Create AI Form <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild variant="outline" size="lg">
                <Link href="/learn-more">
                  Learn More
                </Link>
              </Button>
            </motion.div>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { icon: FileSpreadsheet, title: "AI Form Generation", description: "Create forms instantly with Gemini AI" },
              { icon: PenLine, title: "Easy Editing", description: "Customize and style your forms effortlessly" },
              { icon: BarChart3, title: "Response Analytics", description: "View and export form data from your dashboard" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex flex-col items-center"
              >
                <feature.icon className="h-10 w-10 text-primary mb-2" />
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center text-primary sm:justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 mr-2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span className="text-xl font-bold">Smart Forms</span>
            </div>

            <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-right">
              &copy; {new Date().getFullYear()} Smart Forms. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </section>
  )
}