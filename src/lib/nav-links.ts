import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  Book,
  BookOpen,
  Bot,
  Briefcase,
  CandlestickChart,
  History,
  LayoutDashboard,
  Lightbulb,
  Newspaper,
  Settings,
  Shield,
  Users,
} from 'lucide-react';

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
  subtitle: string;
}

export const navLinks: NavLink[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    subtitle: 'An overview of your trading activity.',
  },
  {
    href: '/performance-analytics',
    label: 'Performance Analytics',
    icon: Activity,
    subtitle: 'Analyze your trading performance with AI-powered insights.',
  },
  {
    href: '/trade-planning',
    label: 'Trade Planning',
    icon: Lightbulb,
    subtitle: 'Get AI-powered recommendations for your next trade.',
  },
  {
    href: '/ai-coaching',
    label: 'AI Coaching',
    icon: Bot,
    subtitle: 'Personalized AI-driven coaching to improve your trading skills.',
  },
  {
    href: '/broker-integration',
    label: 'Broker Integration',
    icon: Briefcase,
    subtitle: 'Connect and manage your broker accounts.',
  },
  {
    href: '/strategy-management',
    label: 'Strategy Management',
    icon: BookOpen,
    subtitle: 'Create, backtest, and manage your trading strategies.',
  },
  {
    href: '/community',
    label: 'Community',
    icon: Users,
    subtitle: 'Connect with other traders and share insights.',
  },
  {
    href: '/trade-journal',
    label: 'Trade Journal',
    icon: Book,
    subtitle: 'Log and review your trades to learn from your experience.',
  },
  {
    href: '/news',
    label: 'News',
    icon: Newspaper,
    subtitle: 'Stay up-to-date with the latest market news.',
  },
  {
    href: '/historical-trade',
    label: 'Historical Trade',
    icon: History,
    subtitle: 'Browse and analyze historical market data.',
  },
  {
    href: '/crypto-vix',
    label: 'Crypto VIX',
    icon: CandlestickChart,
    subtitle: 'Monitor market volatility with the Crypto Volatility Index.',
  },
  {
    href: '/risk-center',
    label: 'Risk Center',
    icon: Shield,
    subtitle: 'Manage your risk and exposure across all positions.',
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: Settings,
    subtitle: 'Customize your EdgeCipher experience.',
  },
];
