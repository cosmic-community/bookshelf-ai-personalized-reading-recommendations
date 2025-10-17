# 📚 BookShelf AI - Personalized Reading Recommendations

![App Preview](https://imgix.cosmicjs.com/68249090-aad8-11f0-add1-b963a22b9c27-photo-1524995997946-a1c2e315a42f-1760650688347.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern web application that uses AI to analyze your bookshelf photos, identify your books, provide fascinating insights about your reading habits, and recommend your next great reads with direct Amazon purchase links.

## ✨ Features

- 📸 Upload or capture bookshelf photos for instant AI analysis
- 🤖 Automatic book detection and identification
- 📊 Visual insights about your reading collection (genre diversity, publication trends, etc.)
- 🎯 Three personalized book recommendations based on your collection
- 🛒 Direct Amazon purchase links for recommended books
- 🎨 Beautiful, responsive design with genre color-coding
- 📱 Mobile-first interface that works on all devices
- 🔍 Detailed book information with cover images and descriptions
- 📈 Match scores showing recommendation confidence
- 💾 Session history to revisit past analyses

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68f16470961595061d524218&clone_repository=68f166c8961595061d524248)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "I want to build an application that let's you upload a picture or take a picture with your phone of your book shelf, showing all of the books you own. I then want the Cosmic AI to list out all off the books seen in the bookshelf, provide some fun facts about the breakdown of those books, and then provide 3 recommendations for the next books the user should read based on what they currently own. then provide Amazon links to purchase those books."

### Code Generation Prompt

> "Based on the content model I created for 'I want to build an application that let's you upload a picture or take a picture with your phone of your book shelf, showing all of the books you own. I then want the Cosmic AI to list out all off the books seen in the bookshelf, provide some fun facts about the breakdown of those books, and then provide 3 recommendations for the next books the user should read based on what they currently own. then provide Amazon links to purchase those books.', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS with custom design system
- **CMS**: Cosmic headless CMS for content management
- **SDK**: @cosmicjs/sdk v1.5+ for data fetching
- **AI**: OpenAI GPT-4o Vision API for book analysis
- **Image Optimization**: Imgix for responsive images
- **Deployment**: Optimized for Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account with bucket access
- An OpenAI API key for AI book analysis
- Basic knowledge of Next.js and React

### Installation

1. **Clone the repository**