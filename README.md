# Prodify - Product Dashboard

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Bhupendra-Maurya/Prodify
cd prodify

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
npm run build
```

## 📚 Libraries Used

### Core Framework
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### UI & Styling
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide React** - Icon library

### Data Management
- **TanStack Query (React Query)** - Server state management
- **Axios** - HTTP client for API calls

### Notifications
- **Sonner** - Toast notifications

## 🎯 Approach

### Architecture
- **Component-based architecture** with clear separation of concerns
- **Custom hooks** for data fetching and mutations
- **TypeScript interfaces** for type safety
- **Responsive design** with mobile-first approach

### Key Features
- **CRUD Operations**: Create, read, update, delete products
- **Search & Filter**: Real-time search and category filtering
- **Pagination**: Efficient data loading with pagination
- **Responsive Design**: Works on all device sizes
- **Loading States**: Skeleton loaders and proper error handling
- **Optimistic Updates**: Immediate UI updates for better UX

### Data Flow
1. **API Layer**: Axios client with DummyJSON API integration
2. **Hooks Layer**: React Query for caching and state management
3. **Component Layer**: Reusable UI components with shadcn/ui
4. **State Management**: Local state with React hooks + React Query cache

### Performance Optimizations
- **Debounced search** to reduce API calls
- **Placeholder data** to maintain smooth transitions
- **Query invalidation** for automatic data refresh
- **Optimistic updates** for instant feedback

## 🌟 Features

- ✅ Responsive dashboard layout
- ✅ Product table with search and filtering
- ✅ CRUD operations with dialogs
- ✅ Pagination with loading states
- ✅ Toast notifications
- ✅ Category dropdown filter
- ✅ Mobile-friendly design
- ✅ Error handling and empty states

## 🔧 Development

The project uses a modern React stack with:
- **Component composition** over inheritance
- **Custom hooks** for business logic
- **TypeScript** for better developer experience
- **TailwindCSS** for rapid UI development
- **React Query** for efficient data management

 


##  CRUD Operations 

### Add Product Dialog
- Form with validation
- Required fields: title, price, category, stock
- Success/error handling
- Auto-refresh table after success

### Edit Product Dialog
- Pre-populate form with existing data
- Update API integration
- Optimistic updates consideration

###  Delete Product
- Confirmation dialog
- Delete API call
- Table refresh after deletion

### Form Validation
- Basic client-side validation
- Error message display
- Loading states for form submissions

### Category Filter 
- Dropdown with all available categories
- Combine with search and pagination
- Clear filter option



