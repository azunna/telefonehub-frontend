# TelefoneHub Frontend

React frontend application for TelefoneHub communication platform.

## Features

- Voice & Video Calling
- SMS Messaging
- Contact Management
- Call History & Analytics
- Real-time Sync
- Push Notifications
- Multi-language Support
- KYC Verification
- Social Authentication

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm start
```

Runs on http://localhost:3000

### Build
```bash
npm run build
```

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial frontend repository"
   git remote add origin https://github.com/azunna/telefonehub-frontend.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Select `telefonehub-frontend` repository
   - Click "Import"

3. **Configure Environment Variables**
   Add these in Vercel dashboard:
   - `REACT_APP_API_URL`: `https://api.telefonehub.com`
   - `REACT_APP_WS_URL`: `wss://api.telefonehub.com`

4. **Deploy**
   - Click "Deploy"
   - Your app will be live in ~2 minutes!

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd /Users/mac/telefonehub-frontend
vercel

# Follow the prompts
```

## Environment Variables

Required environment variables:

| Variable | Value | Description |
|---------|-------|-------------|
| `REACT_APP_API_URL` | `https://api.telefonehub.com` | Backend API URL |
| `REACT_APP_WS_URL` | `wss://api.telefonehub.com` | WebSocket URL |

### Setting in Vercel

1. Go to your project on Vercel
2. Click **Settings** → **Environment Variables**
3. Add each variable
4. Click **Save**
5. Redeploy your app

## Project Structure

```
telefonehub-frontend/
├── public/           # Static files
├── src/
│   ├── components/   # React components
│   ├── pages/        # Page components
│   ├── contexts/     # React contexts
│   ├── services/     # API services
│   ├── types/        # TypeScript types
│   └── App.tsx       # Main app component
├── package.json      # Dependencies
├── tsconfig.json     # TypeScript config
└── vercel.json       # Vercel configuration
```

## Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Material-UI** - UI components
- **React Router** - Routing
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client
- **React Query** - Data fetching
- **Zustand** - State management

## Custom Domain

### Add Your Domain

1. In Vercel dashboard → **Settings** → **Domains**
2. Add custom domain: `telefonehub.com`
3. Update DNS records as instructed
4. SSL certificate is auto-issued by Vercel

## Performance

- Automatic code splitting
- Optimized production build
- CDN caching
- Image optimization
- Bundle size optimization

## Support

For issues or questions:
- Create an issue on GitHub
- Email: support@telefonehub.com

## License

© 2024 TelefoneHub. All rights reserved.

