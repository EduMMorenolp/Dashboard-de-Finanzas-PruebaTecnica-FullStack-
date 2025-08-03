import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Chart from '../components/Chart';
import ValueCard from '../components/ValueCard';
import ValueSummary from '../components/ValueSummary';
import '../style/Dashboard.css';

// Interfaces
interface ChartDataPoint {
    month: string;
    value: number;
}

interface MetricData {
    value: number;
    label: string;
    icon: string;
}

interface SummaryItem {
    id: string;
    title: string;
    amount: string;
    type: 'positive' | 'negative';
    trend?: 'up' | 'down';
}

// Datos de ejemplo - normalmente vendrían de archivos JSON
const salesData: ChartDataPoint[] = [
    { month: 'Ene', value: 580000 },
    { month: 'Feb', value: 620000 },
    { month: 'Mar', value: 590000 },
    { month: 'Abr', value: 640000 },
    { month: 'May', value: 680000 },
    { month: 'Jun', value: 720000 },
    { month: 'Jul', value: 700000 }
];

const metricsData: MetricData[] = [
    { value: 12, label: 'Valor 1', icon: '📊' },
    { value: 10, label: 'Valor 2', icon: '⏰' }
];

const summaryData: SummaryItem[] = [
    { id: '1', title: 'Valor positivo', amount: '$700.000 ARS', type: 'positive', trend: 'up' },
    { id: '2', title: 'Valor positivo', amount: '$3.400 USD', type: 'positive', trend: 'up' },
    { id: '3', title: 'Valor negativo', amount: '$230.000 ARS', type: 'negative', trend: 'down' },
    { id: '4', title: 'Valor negativo', amount: '$1.200 USD', type: 'negative', trend: 'down' }
];

const Dashboard: React.FC = () => {
    const [activeMenuItem, setActiveMenuItem] = useState<string>('item-empresa-2');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [chartData, setChartData] = useState<ChartDataPoint[]>(salesData);
    const [metrics, setMetrics] = useState<MetricData[]>(metricsData);
    const [summaryItems, setSummaryItems] = useState<SummaryItem[]>(summaryData);
    const [selectedPeriod, setSelectedPeriod] = useState<string>('Anual');

    const periodOptions = [
        { value: 'Anual', label: 'Anual' },
        { value: 'Mensual', label: 'Mensual' },
        { value: 'Semanal', label: 'Semanal' },
        { value: 'Diario', label: 'Diario' }
    ];

    // Simulación de carga de datos desde JSON
    useEffect(() => {
        const loadData = async () => {
            try {
                // Aquí cargarías los datos reales desde archivos JSON
                // const salesResponse = await fetch('/data/sales.json');
                // const salesJson = await salesResponse.json();
                // setChartData(salesJson);

                // const metricsResponse = await fetch('/data/metrics.json');
                // const metricsJson = await metricsResponse.json();
                // setMetrics(metricsJson);

                console.log('Datos cargados correctamente');
            } catch (error) {
                console.error('Error cargando datos:', error);
            }
        };

        loadData();
    }, []);

    const handleMenuItemClick = (itemId: string) => {
        setActiveMenuItem(itemId);
        setIsMobileMenuOpen(false);
    };

    const handleValueCardClick = () => {
        console.log('Value card clicked - navegar a detalle');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="dashboard-page">
            <Sidebar
                activeItem={activeMenuItem}
                onItemClick={handleMenuItemClick}
                isMobileOpen={isMobileMenuOpen}
            />

            <div className="dashboard-page__main">
                <Header
                    userName="Usuario"
                    metrics={metrics}
                />

                <div className="dashboard-page__content">
                    <div className="dashboard-page__charts">
                        <Chart
                            title="Título gráfico lineal"
                            data={chartData}
                            height={300}
                        />

                        <ValueCard
                            title="Ayuda"
                            subtitle="Concepto de Valor"
                            amount="$700.000"
                            description="Texto de ejemplo valor"
                            buttonText="Ver detalle"
                            onButtonClick={handleValueCardClick}
                        />
                    </div>

                    <ValueSummary items={summaryItems} />
                </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
                className="dashboard-page__mobile-toggle"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
            >
                ☰
            </button>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="dashboard-page__overlay"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </div>
    );
};

export default Dashboard;