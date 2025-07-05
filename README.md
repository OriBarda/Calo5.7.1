# Nutrition Tracker App

A comprehensive AI-powered nutrition tracking application built with React Native (Expo) and Node.js.

## Features

- 📸 **AI Meal Analysis** - Take photos of meals for automatic nutrition analysis
- 📊 **Comprehensive Tracking** - Track calories, macros, and micronutrients
- 📱 **Device Integration** - Connect fitness trackers and health apps
- 🍽️ **AI Meal Planning** - Generate personalized weekly meal plans
- 📈 **Advanced Statistics** - Detailed nutrition insights and trends
- 📅 **Calendar View** - Visual progress tracking over time
- 🔄 **Meal History** - Rate, favorite, and duplicate past meals

## Tech Stack

### Frontend (React Native)
- Expo Router for navigation
- Redux Toolkit for state management
- React Query for data fetching
- React Native Chart Kit for visualizations
- Expo Camera for meal photo capture

### Backend (Node.js)
- Express.js server
- Prisma ORM with PostgreSQL
- OpenAI GPT-4 Vision for meal analysis
- JWT authentication with secure cookies
- Comprehensive API for all features

## Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Expo CLI (`npm install -g @expo/cli`)

### 1. Clone and Install
```bash
git clone <repository-url>
cd nutrition-tracker
npm run setup
```

### 2. Database Setup
```bash
# Set up your PostgreSQL database
# Update server/.env with your DATABASE_URL
npm run db:setup
```

### 3. Environment Configuration
```bash
# Update IP address in environment files
npm run update-ip

# Configure server/.env:
DATABASE_URL="postgresql://user:password@localhost:5432/nutrition_tracker"
JWT_SECRET="your-secret-key"
OPENAI_API_KEY="your-openai-key" # Optional - uses mock data if not provided
```

### 4. Start Development
```bash
# Start both server and client
npm run dev

# Or start individually:
npm run server:dev  # Server on http://localhost:5000
npm run client:dev  # Client on http://localhost:8081
```

## Project Structure

```
nutrition-tracker/
├── client/                 # React Native app
│   ├── app/               # Expo Router pages
│   ├── src/               # Source code
│   │   ├── services/      # API services
│   │   ├── store/         # Redux store
│   │   └── types/         # TypeScript types
│   └── hooks/             # Custom hooks
├── server/                # Node.js backend
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Express middleware
│   │   └── types/         # TypeScript types
│   └── prisma/            # Database schema
└── scripts/               # Utility scripts
```

## Key Features

### AI Meal Analysis
- Take photos of meals for automatic nutrition analysis
- OpenAI GPT-4 Vision integration for accurate food recognition
- Update meals with additional information
- Comprehensive macro and micronutrient tracking

### Device Integration
- Connect Apple Health, Google Fit, Fitbit, and more
- Automatic calorie burn tracking
- Daily balance calculations (calories in vs out)
- Activity data synchronization

### Meal Planning
- AI-generated personalized weekly meal plans
- Dietary preference and restriction support
- Shopping list generation
- Meal replacement with AI alternatives

### Statistics & Insights
- Comprehensive nutrition analytics
- Weekly and monthly trends
- AI-generated insights and recommendations
- Visual charts and progress tracking

## Development

### Database Management
```bash
npm run db:studio    # Open Prisma Studio
npm run db:setup     # Reset and setup database
```

### API Testing
- Health check: `http://localhost:5000/health`
- Test endpoint: `http://localhost:5000/test`

### Mobile Testing
- Use Expo Go app on your phone
- Scan QR code from terminal
- Or use iOS Simulator / Android Emulator

## Environment Variables

### Server (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/nutrition_tracker"
JWT_SECRET="your-super-secret-jwt-key"
OPENAI_API_KEY="sk-..." # Optional
PORT=5000
NODE_ENV=development
```

### Client (.env)
```env
EXPO_PUBLIC_API_URL=http://192.168.1.70:5000/api
```

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Ensure PostgreSQL is running
   - Check DATABASE_URL in server/.env
   - Run `npm run db:setup`

2. **Network Errors on Mobile**
   - Update IP address: `npm run update-ip`
   - Ensure phone and computer are on same network
   - Check firewall settings

3. **AI Features Not Working**
   - Add OPENAI_API_KEY to server/.env
   - App will use mock data without API key

4. **Build Errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Clear Expo cache: `expo start --clear`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details