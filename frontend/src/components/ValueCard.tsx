import React from 'react';
import '../style/components/ValueCard.css';

interface ValueCardProps {
    title?: string;
    subtitle?: string;
    amount?: string;
    description?: string;
    buttonText?: string;
    onButtonClick?: () => void;
}

const ValueCard: React.FC<ValueCardProps> = ({
    title = 'Ayuda',
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
            console.log('Ver detalle clicked');
        }
    };

    return (
        <div className="value-card">
            <div className="value-card__header">
                <span className="value-card__tag">{title}</span>
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