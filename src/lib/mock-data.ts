
export const dashboardMetrics = [
  {
    label: 'Account Balance',
    value: '$125,832.71',
    trend: '+2.1%',
    isPositive: true,
    tooltip: 'Total equity in all connected broker accounts.',
  },
  {
    label: 'Monthly Return',
    value: '+5.4%',
    trend: '-1.2%',
    isPositive: false,
    tooltip: 'Percentage change in account value this month.',
  },
  {
    label: 'Win Rate',
    value: '68.4%',
    trend: '+0.5%',
    isPositive: true,
    tooltip: 'The percentage of your closed trades that were profitable.',
  },
  {
    label: 'Open Trades',
    value: '4',
    trend: '+1',
    isPositive: true,
    tooltip: 'The number of positions currently open in your account.',
  },
];

export const portfolioPerformance = [
  { date: 'Jan 24', value: 100000 },
  { date: 'Feb 24', value: 105000 },
  { date: 'Mar 24', value: 115000 },
  { date: 'Apr 24', value: 112000 },
  { date: 'May 24', value: 120000 },
  { date: 'Jun 24', value: 128000 },
  { date: 'Jul 24', value: 125000 },
  { date: 'Aug 24', value: 135000 },
  { date: 'Sep 24', value: 140000 },
  { date: 'Oct 24', value: 138000 },
  { date: 'Nov 24', value: 150000 },
  { date: 'Dec 24', value: 155000 },
  { date: 'Jan 25', value: 160000 },
];

export const marketSnapshot = [
    { ticker: 'BTC', price: '$68,123.45', change24h: '+1.5%', volatility: 'Normal' },
    { ticker: 'ETH', price: '$3,456.78', change24h: '-0.5%', volatility: 'Normal' },
    { ticker: 'SOL', price: '$165.20', change24h: '+4.2%', volatility: 'High' },
    { ticker: 'XRP', price: '$0.52', change24h: '-2.1%', volatility: 'Low' },
]

export const aiDailyBriefing = [
    'Your risk per trade is slightly above your configured limit.',
    'You tend to overtrade after a losing streak. Consider taking a break.',
    'Market volatility in the altcoin sector is increasing. Adjust stop-losses accordingly.',
    'Your portfolio is heavily concentrated in BTC. Consider diversifying.',
]

export const nextBestActions = [
    { id: 'action-1', label: 'Review underperforming strategies.' },
    { id: 'action-2', label: 'Update risk guardrails in Risk Center.' },
    { id: 'action-3', label: 'Journal your last 3 trades.' },
    { id: 'action-4', label: 'Research potential diversification options.' },
]

export const recentTrades = [
  {
    id: 'TRD001',
    asset: 'BTC/USD',
    type: 'Long',
    entry: '$68,123.45',
    exit: '$69,456.78',
    pnl: '$1,333.33',
    status: 'Closed',
    isPositive: true,
  },
  {
    id: 'TRD002',
    asset: 'ETH/USD',
    type: 'Short',
    entry: '$3,456.78',
    exit: '$3,401.23',
    pnl: '$55.55',
    status: 'Closed',
    isPositive: true,
  },
  {
    id: 'TRD003',
    asset: 'SOL/USD',
    type: 'Long',
    entry: '$165.20',
    exit: '$162.80',
    pnl: '-$2.40',
    status: 'Closed',
    isPositive: false,
  },
  {
    id: 'TRD004',
    asset: 'DOGE/USD',
    type: 'Long',
    entry: '$0.158',
    exit: 'N/A',
    pnl: 'N/A',
    status: 'Open',
  },
  {
    id: 'TRD005',
    asset: 'ADA/USD',
    type: 'Short',
    entry: '$0.45',
    exit: '$0.47',
    pnl: '-$0.02',
    status: 'Closed',
    isPositive: false,
  },
];
