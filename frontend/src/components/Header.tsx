import React from 'react';
import '../style/components/Header.css';

interface MetricData {
    value: number;
    label: string;
    icon: string;
}

interface HeaderProps {
    userName?: string;
    metrics?: MetricData[];
}

const Header: React.FC<HeaderProps> = ({
    userName = 'Usuario',
    metrics = [
        { value: 12, label: 'Valor 1', icon: '📊' },
        { value: 10, label: 'Valor 2', icon: '⏰' }
    ]
}) => {
    return (
        <div className="header">
            <div className="header__content">
                <h1 className="header__title">Hola {userName} !</h1>
                <h2 className="header__subtitle">¿Qué hacemos hoy?</h2>

                <div className="header__metrics">
                    {Array.isArray(metrics) && metrics.map((metric, index) => (
                        <div key={index} className="header__metric-card">
                            <div className="header__metric-icon">{metric.icon}</div>
                            <div className="header__metric-info">
                                <div className="header__metric-value">{metric.value}</div>
                                <div className="header__metric-label">{metric.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Header;