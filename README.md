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
- **Image Optimization**: Imgix for responsive images
- **Deployment**: Optimized for Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account with bucket access
- Basic knowledge of Next.js and React

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd bookshelf-ai
```

2. **Install dependencies**
```bash
bun install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. **Run the development server**
```bash
bun run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Cosmic SDK Examples

### Fetching Analysis Sessions

```typescript
import { cosmic } from '@/lib/cosmic'

export async function getSessions() {
  try {
    const response = await cosmic.objects
      .find({ type: 'book-analysis-sessions' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as BookAnalysisSession[]
  } catch (error) {
    if (error.status === 404) return []
    throw error
  }
}
```

### Fetching Session with Related Data

```typescript
export async function getSessionWithData(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'book-analysis-sessions', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const session = response.object as BookAnalysisSession
    
    // Fetch related detected books
    const booksResponse = await cosmic.objects
      .find({ 
        type: 'detected-books',
        'metadata.session': session.id 
      })
      .props(['id', 'title', 'metadata'])
      .depth(1)
    
    return {
      session,
      books: booksResponse.objects as DetectedBook[]
    }
  } catch (error) {
    if (error.status === 404) return null
    throw error
  }
}
```

## 🎨 Cosmic CMS Integration

This application uses five interconnected Cosmic object types:

### Book Analysis Sessions
Stores uploaded bookshelf images and AI processing metadata
- **Fields**: uploaded_image, user_id, ai_analysis_status, total_books_detected, analysis_metadata

### Detected Books
Individual books identified from bookshelf scans
- **Fields**: session (object), book_title, author, isbn, genres (objects), publication_year, confidence_score

### Collection Insights
Fun facts and analytics about reading habits
- **Fields**: session (object), insight_type, insight_title, insight_description, data_visualization (JSON)

### Book Recommendations
Personalized reading suggestions
- **Fields**: session (object), recommended_book_title, author, recommendation_reason, genres (objects), amazon_url, amazon_asin, match_score

### Genre Tags
Book categorization with UI styling
- **Fields**: genre_name, genre_description, color_code

## 🌐 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the "Deploy with Vercel" button
2. Connect your Git repository
3. Add environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Environment Variables

Make sure to set these in your hosting platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read API key
- `COSMIC_WRITE_KEY` - Your Cosmic write API key (for future upload features)

## 📁 Project Structure

```
bookshelf-ai/
├── app/
│   ├── layout.tsx              # Root layout with navigation
│   ├── page.tsx                # Home page with latest session
│   ├── sessions/
│   │   └── [slug]/
│   │       └── page.tsx        # Session detail view
│   └── globals.css             # Global styles
├── components/
│   ├── BookCard.tsx            # Detected book display
│   ├── RecommendationCard.tsx  # Recommendation display
│   ├── InsightCard.tsx         # Insight display
│   ├── Header.tsx              # Navigation header
│   ├── Footer.tsx              # Site footer
│   └── CosmicBadge.tsx         # "Built with Cosmic" badge
├── lib/
│   └── cosmic.ts               # Cosmic SDK configuration
├── types.ts                    # TypeScript type definitions
└── public/
    └── dashboard-console-capture.js  # Console logging for dashboard
```

## 🎯 Key Features Explained

### AI Book Detection
The application displays books detected from uploaded bookshelf images, showing:
- Book title and author
- Publication year
- Genre tags with color coding
- Confidence score of detection
- Book cover images
- Brief descriptions

### Collection Insights
Provides engaging analytics about your reading habits:
- Genre diversity analysis
- Publication era trends
- Reading level distribution
- Visual charts for data representation

### Smart Recommendations
Three personalized book suggestions featuring:
- Detailed reasoning based on your collection
- Match score (confidence percentage)
- Books from your collection that influenced the recommendation
- Amazon purchase links
- Full book descriptions

## 🔧 Customization

### Styling
The app uses Tailwind CSS with a custom color palette. Modify `tailwind.config.js` to change:
- Primary colors (purple/blue theme)
- Font family (currently Inter)
- Spacing and layout
- Component styling

### Content Display
Customize how content is displayed by modifying components in the `/components` directory:
- `BookCard.tsx` - Detected books layout
- `RecommendationCard.tsx` - Recommendation cards
- `InsightCard.tsx` - Insight cards with charts

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For questions or issues, please visit [Cosmic Documentation](https://www.cosmicjs.com/docs) or open an issue on GitHub.

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com) headless CMS

<!-- README_END -->