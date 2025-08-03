export interface ChartDataPoint {
  month: string;
  value: number;
}

export interface MetricData {
  value: number;
  label: string;
  icon: string;
}

export interface BackendChartData {
  sales: Array<{
    date: string;
    amount: number;
    currency: string;
  }>;
  expenses: Array<{
    date: string;
    amount: number;
    currency: string;
  }>;
}

export interface BackendMetrics {
  sales: {
    ARS: number;
    USD: number;
  };
  expenses: {
    ARS: number;
    USD: number;
  };
  profit: {
    ARS: number;
    USD: number;
  };
}