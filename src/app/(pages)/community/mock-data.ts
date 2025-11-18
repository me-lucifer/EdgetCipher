export const mockPosts = [
  {
    id: 'post-1',
    author: 'CryptoChad',
    avatarSeed: 'chad',
    timestamp: '2h ago',
    content: 'BTC is looking strong above the 50-day EMA. Watching for a breakout above $70k to confirm the next leg up. My stop is tight below the trendline.',
    tags: ['BTC', 'Technical Analysis'],
    likes: 128,
    comments: 23,
  },
  {
    id: 'post-2',
    author: 'RiskManagerPro',
    avatarSeed: 'risk',
    timestamp: '5h ago',
    content: "A reminder for everyone: don't let a winning streak make you overconfident. Stick to your risk parameters. My rule is to cut my size in half after 5 consecutive wins to cool off.",
    tags: ['Risk Management', 'Psychology'],
    likes: 256,
    comments: 45,
  },
  {
    id: 'post-3',
    author: 'AltcoinAlice',
    avatarSeed: 'alice',
    timestamp: '1d ago',
    content: 'The recent developer activity on the SOL network is very promising. I believe it has more room to run, especially if the broader market remains stable. Dips are for buying.',
    tags: ['SOL', 'Fundamental Analysis'],
    likes: 98,
    comments: 15,
  },
];

export const mockGroups = [
  {
    id: 'group-1',
    name: 'Crypto Swing Traders',
    description: 'A group for traders focusing on multi-day to multi-week holds. We discuss technical setups, market structure, and timing.',
    members: 1284,
  },
  {
    id: 'group-2',
    name: 'Delta Options Desk',
    description: 'Advanced discussion on options strategies, volatility trading, and hedging with derivatives on Delta Exchange.',
    members: 450,
  },
  {
    id: 'group-3',
    name: 'Risk Management Club',
    description: 'Dedicated to the most important topic in trading: protecting your capital. Share rules, psychology tips, and review mistakes.',
    members: 2300,
  },
];

export const mockLeaders = [
    {
        id: 'leader-1',
        name: 'The Rational Trader',
        avatarSeed: 'rational',
        stats: '+23% YTD, max DD 8%',
        bio: 'Ex-quant trader focused on systematic trend-following strategies. I post my weekly outlook and thoughts on market structure.',
        focus: ['Trend Following', 'Risk Management', 'BTC', 'ETH'],
    },
    {
        id: 'leader-2',
        name: 'Volatility Queen',
        avatarSeed: 'queen',
        stats: '+45% YTD, max DD 15%',
        bio: 'I trade options and perpetuals, specializing in high-volatility environments. My goal is to capture explosive moves.',
        focus: ['Options', 'Volatility', 'Derivatives', 'SOL'],
    },
    {
        id: 'leader-3',
        name: 'Dr. Crypto',
        avatarSeed: 'doctor',
        stats: '+18% YTD, max DD 5%',
        bio: 'A long-term, research-driven investor. I share deep dives on project fundamentals and on-chain analytics.',
        focus: ['Fundamental Analysis', 'On-Chain Data', 'Long-Term'],
    }
];

export const mockLessons = [
    {
        id: 'lesson-1',
        title: 'Risk Management Basics',
        duration: '20 min',
        description: 'Learn the fundamentals of position sizing, setting stop-losses, and managing your overall portfolio risk.',
    },
    {
        id: 'lesson-2',
        title: 'Understanding Leverage',
        duration: '15 min',
        description: 'A clear guide to how leverage works, the dangers of over-leveraging, and how to use it responsibly.',
    },
    {
        id: 'lesson-3',
        title: 'Using AI Coaching Effectively',
        duration: '10 min',
        description: 'Get the most out of EdgeCipher\'s AI tools, from pre-trade analysis to post-trade review.',
    }
];

export const mockEvents = [
    {
        id: 'event-1',
        title: 'Weekly Market Outlook',
        host: 'The Rational Trader',
        date: 'Monday, 10:00 AM PST',
        description: 'Join our weekly session to discuss major trends, key levels, and potential setups for the week ahead.',
    },
    {
        id: 'event-2',
        title: 'Live AMA with Volatility Queen',
        host: 'Volatility Queen',
        date: 'Wednesday, 2:00 PM PST',
        description: 'An open Q&A session on options trading, managing volatility, and her recent trades.',
    }
];
