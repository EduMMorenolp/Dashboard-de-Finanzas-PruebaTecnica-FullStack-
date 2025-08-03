import React from 'react';
import '../style/components/ValueSummary.css';

interface SummaryItem {
    id: string;
    title: string;
    amount: string;
    type: 'positive' | 'negative';
    trend?: 'up' | 'down';
}

interface ValueSummaryProps {
    items?: SummaryItem[];
}

const ValueSummary: React.FC<ValueSummaryProps> = ({
    items = [
        { id: '1', title: 'Valor positivo', amount: '$700.000 ARS', type: 'positive', trend: 'up' },
        { id: '2', title: 'Valor positivo', amount: '$3.400 USD', type: 'positive', trend: 'up' },
        { id: '3', title: 'Valor negativo', amount: '$230.000 ARS', type: 'negative', trend: 'down' },
        { id: '4', title: 'Valor negativo', amount: '$1.200 USD', type: 'negative', trend: 'down' }
    ]
}) => {
    const getTrendIcon = (trend?: 'up' | 'down') => {
        return trend === 'down' ? '📉' : '📈';
    };

    return (
        <div className="value-summary">
            {items.map((item) => (
                <div key={item.id} className={`value-summary__card value-summary__card--${item.type}`}>
                    <div className="value-summary__header">
                        <span className="value-summary__title">{item.title}</span>
                        <span className="value-summary__trend">
                            {getTrendIcon(item.trend)}
                        </span>
                    </div>
                    <div className="value-summary__amount">{item.amount}</div>
                </div>
            ))}
        </div>
    );
};

export default ValueSummary;