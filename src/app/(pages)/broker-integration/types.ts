export type Broker = {
  id: string;
  name: string;
  description: string;
  markets: string[];
  connected: boolean;
};

export type ConnectedAccount = {
  id: string;
  brokerId: string;
  brokerName: string;
  nickname: string;
  mode: 'Live' | 'Paper';
  status: 'Connected' | 'Paused' | 'Error';
  lastSync: string;
};
