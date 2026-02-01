# Mindtris - Enterprise Dashboard Template
A modern, enterprise-grade dashboard template built with Next.js 15, TypeScript, and Tailwind CSS. Mindtris provides a comprehensive admin interface with multiple modules including analytics, e-commerce, community features, and more.

## 🚀 Quick Start

```bash
# Clone and install
git clone <your-repo-url>
cd mindtris-template
pnpm install

# Start development
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and you're ready to go!

## ✨ Features

- 🚀 **Next.js 15** with App Router
- 🎨 **Tailwind CSS 4** with custom design system
- 📊 **Chart.js** integration for data visualization
- 🌙 **Dark/Light mode** support
- 📱 **Fully responsive** design
- 🔧 **TypeScript** for type safety
- 🎯 **Component library** with reusable UI components
- 🔌 **API Client** with Axios integration
- 🔄 **SWR** for state management and data fetching
- 🔐 **Authentication** ready
- 📈 **Enterprise features** built-in

## 📚 Documentation

- **[Developer Guide](./docs/README.md)** - Complete development guide
- **[Changelog](./docs/CHANGELOG.md)** - Version history and roadmap

## 🏗️ Project Structure

```
mindtris-template/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (default)/         # Main dashboard pages
│   ├── api/               # API routes
│   └── css/               # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Core UI components
│   ├── charts/           # Chart components
│   └── utils/            # Utility components
├── lib/                  # Utilities and configurations
│   ├── api/              # API client and services
│   ├── hooks/            # Custom React hooks
│   └── swr-config.ts     # SWR configuration
├── public/               # Static assets
└── docs/                 # Documentation
```

## 🔌 API Integration

The template includes a complete API client layer with SWR for state management:

```typescript
import { useUsers, useUserMutations } from '@/lib/hooks/use-swr'

function UserList() {
  const { data: users, error, isLoading } = useUsers({ page: 1, limit: 10 })
  const { createUser, updateUser, deleteUser } = useUserMutations()
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      {users?.data?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

## 🎨 Customization

### Branding
- Replace logo in `public/images/mindtris-logo.svg`
- Update colors in `app/css/style.css`
- Change company name throughout the codebase

### API Configuration
```bash
cp env.example .env.local
# Edit with your API endpoints
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
pnpm add -g vercel
vercel
```

### Docker
```bash
docker build -t mindtris .
docker run -p 3000:3000 mindtris
```

## 🛠️ Development

```bash
# Development
pnpm dev

# Build
pnpm build

# Start production
pnpm start

# Lint
pnpm lint
```

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Chart.js](https://www.chartjs.org/docs/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [SWR Documentation](https://swr.vercel.app/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


---

