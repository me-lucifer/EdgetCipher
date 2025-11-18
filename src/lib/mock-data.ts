
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


// Data for Performance Analytics Page
export const performanceMetrics = [
  {
    label: 'Total Return (YTD)',
    value: '+$25,832.71',
    trend: 'vs. +$18,450 last year',
    isPositive: true,
    tooltip:
      'The total profit or loss for your account since the beginning of the year.',
  },
  {
    label: 'Performance This Month',
    value: '+5.41%',
    trend: 'Better than last month',
    isPositive: true,
    tooltip:
      'The percentage change in your account value over the current month.',
  },
  {
    label: 'Profit Factor',
    value: '2.15',
    trend: 'Slightly down from 2.20',
    isPositive: true,
    tooltip:
      'Gross profit divided by gross loss. A value greater than 1 means your strategy is profitable.',
  },
  {
    label: 'Sharpe Ratio',
    value: '1.78',
    trend: 'Stable',
    isPositive: true,
    tooltip:
      'Measures your risk-adjusted return. Higher is better, indicating more return for the amount of risk taken.',
  },
  {
    label: 'Max Drawdown',
    value: '-8.23%',
    trend: 'Worse than last month',
    isPositive: false,
    tooltip:
      'The largest peak-to-trough decline your account has experienced. This is a key measure of risk.',
  },
  {
    label: 'Win Rate',
    value: '68.4%',
    trend: 'Up from 65%',
    isPositive: true,
    tooltip: 'The percentage of your trades that were profitable.',
  },
];

export const equityData = {
  start: 100000,
  current: 125832.71,
  netReturn: 25832.71,
};

export const drawdownProfile = {
  current: 1.5,
  max: 8.23,
  average: 3.1,
  avgRecoveryTime: '7 days',
  painLevel: 65, // Percentage for the progress bar
};

export const returnDistribution = [
  { name: '< -3%', trades: 5 },
  { name: '-3% to 0', trades: 15 },
  { name: '0 to 2%', trades: 40 },
  { name: '2% to 5%', trades: 25 },
  { name: '> 5%', trades: 10 },
];

export const tradeMix = {
  long: { trades: 65, winRate: 71 },
  short: { trades: 30, winRate: 62 },
  setups: [
    { name: 'Momentum', trades: 45, pnl: 18200 },
    { name: 'Mean Reversion', trades: 25, pnl: 9500 },
    { name: 'Breakout', trades: 15, pnl: -1870 },
    { name: 'Scalping', trades: 10, pnl: -300 },
  ],
};

export const strategyBreakdown = [
  { name: '4H RSI Divergence', trades: 22, winRate: 75, netPnl: 15400, commentary: 'This strategy performs well in trending markets but struggles during high volatility. Consider adding a volatility filter.' },
  { name: '1D Supply/Demand', trades: 15, winRate: 68, netPnl: 11250, commentary: 'A solid, consistent performer. Your entries are precise, but exits could be optimized to capture more of the move.' },
  { name: '15m ORB', trades: 35, winRate: 60, netPnl: -2300, commentary: 'This strategy is currently underperforming. It seems sensitive to false breakouts in the current market conditions.' },
  { name: 'ETH Grid Bot', trades: 150, winRate: 85, netPnl: 1480, commentary: 'High win rate but low profit per trade. Best suited for range-bound markets. Ensure transaction costs are minimal.' },
];

export const assetBreakdown = [
    { symbol: 'BTC/USDT', trades: 40, netPnl: 19500, avgHold: '2.5 days', commentary: 'You tend to hold BTC trades longer than others; check if this is intentional as it exposes you to more overnight risk.' },
    { symbol: 'ETH/USDT', trades: 35, netPnl: 8750, avgHold: '1.2 days', commentary: 'Your most consistently profitable asset. Entries are strong, but consider scaling out of positions.' },
    { symbol: 'SOL/USDT', trades: 12, netPnl: -1500, avgHold: '8 hours', commentary: 'This asset has been a drag on performance. The high volatility seems to be catching you on the wrong side.' },
    { symbol: 'XRP/USDT', trades: 8, netPnl: -950, avgHold: '18 hours', commentary: 'Small number of trades with poor results. It might be best to avoid this asset until your strategy is refined.' },
];

    