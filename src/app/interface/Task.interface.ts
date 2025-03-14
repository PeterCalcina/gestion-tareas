export interface Task {
  id?: number;
  title: string;
  description: string;
  state: 'pending' | 'complete';
  registerDate: Date;
}
