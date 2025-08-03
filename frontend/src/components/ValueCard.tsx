import React, { useState } from 'react';
import '../style/components/ValueCard.css';

interface ValueCardProps {
    subtitle?: string;
    amount?: string;
    description?: string;
    buttonText?: string;
    onButtonClick?: () => void;
}

const ValueCard: React.FC<ValueCardProps> = ({
    subtitle = 'Concepto de Valor',
    amount = '$700.000',
    description = 'Texto de ejemplo valor',
    buttonText = 'Ver detalle',
    onButtonClick
}) => {
    const handleButtonClick = () => {
        if (onButtonClick) {
            onButtonClick();
        } else {
            // amazonq-ignore-next-line
            console.log('Ver detalle clicked');
        }
    };

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
        <div className="value-card">
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

            <div className="value-card__content">
                <h3 className="value-card__subtitle">{subtitle}</h3>
                <div className="value-card__amount">{amount}</div>
                <div className="value-card__description">{description}</div>

                <button
                    className="value-card__button"
                    onClick={handleButtonClick}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default ValueCard;