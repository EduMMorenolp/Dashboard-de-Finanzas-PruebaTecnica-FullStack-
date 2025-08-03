import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import '../style/components/Chart.css';

interface ChartDataPoint {
    month: string;
    value?: number;
    valueARS?: number;
    valueUSD?: number;
}

interface ChartProps {
    title?: string;
    data?: ChartDataPoint[];
    height?: number;
    onPeriodChange?: (period: string) => void;
}

const Chart: React.FC<ChartProps> = ({
    title = 'Título gráfico lineal',
    height = 300,
    data = [],
    onPeriodChange
}) => {
    const [selectedPeriod, setSelectedPeriod] = useState<string>('Mensual');

    const formatXAxisLabel = (value: string) => {
        if (!value) return '';
        return value; // El formateo ya se hace en el Dashboard
    };

    const periodOptions = [
        { value: 'Anual', label: 'Anual' },
        { value: 'Mensual', label: 'Mensual' },
        { value: 'Semanal', label: 'Semanal' },
        { value: 'Diario', label: 'Diario' }
    ];

    const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newPeriod = event.target.value;
        setSelectedPeriod(newPeriod);
        if (onPeriodChange) {
            onPeriodChange(newPeriod);
        }
    };

    return (
        <div className="chart">
            <div className="chart__header">
                <h3 className="chart__title">{title}</h3>
                <div className="chart__controls">
                    <div className="chart__legend">
                        <span className="chart__legend-item">
                            <span className="chart__legend-color" style={{backgroundColor: '#3b82f6'}}></span>
                            ARS
                        </span>
                        <span className="chart__legend-item">
                            <span className="chart__legend-color" style={{backgroundColor: '#10b981'}}></span>
                            USD
                        </span>
                    </div>
                    <select
                        className="chart__select"
                        value={selectedPeriod}
                        onChange={handlePeriodChange}
                    >
                        {periodOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="chart__container">
                {data && data.length > 0 ? (
                    <ResponsiveContainer width="100%" height={height}>
                        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e6ed" />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#8b949e' }}
                                tickFormatter={formatXAxisLabel}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#8b949e' }}
                                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e0e6ed',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                                formatter={(value: any, name: string) => [
                                    `$${Number(value).toLocaleString()}`,
                                    name === 'valueARS' ? 'ARS' : 'USD'
                                ]}
                                labelFormatter={(label) => `Período: ${label}`}
                            />
                            <Line
                                type="monotone"
                                dataKey="valueARS"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#ffffff' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="valueUSD"
                                stroke="#10b981"
                                strokeWidth={3}
                                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#ffffff' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b949e' }}>
                        No hay datos disponibles
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chart;