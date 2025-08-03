import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import '../style/components/Chart.css';

interface ChartDataPoint {
    month: string;
    value: number;
}

interface ChartProps {
    title?: string;
    data?: ChartDataPoint[];
    height?: number;
}

const Chart: React.FC<ChartProps> = ({
    title = 'Título gráfico lineal',
    height = 300,
    data = [
        { month: 'Ene', value: 580000 },
        { month: 'Feb', value: 620000 },
        { month: 'Mar', value: 590000 },
        { month: 'Abr', value: 640000 },
        { month: 'May', value: 680000 },
        { month: 'Jun', value: 720000 },
        { month: 'Jul', value: 700000 }
    ]
}) => {
    const [selectedPeriod, setSelectedPeriod] = useState<string>('Anual');

    const periodOptions = [
        { value: 'Anual', label: 'Anual' },
        { value: 'Mensual', label: 'Mensual' },
        { value: 'Semanal', label: 'Semanal' },
        { value: 'Diario', label: 'Diario' }
    ];

    const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPeriod(event.target.value);
    };

    return (
        <div className="chart">
            <div className="chart__header">
                <h3 className="chart__title">{title}</h3>
                <div className="chart__controls">
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
                <ResponsiveContainer width="100%" height={height}>
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e6ed" />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#8b949e' }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#8b949e' }}
                            domain={['dataMin - 50000', 'dataMax + 50000']}
                            tickFormatter={(value) => `${(value / 1000)}k`}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#ffffff' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Chart;