import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Chart from '../components/Chart';
import ValueCard from '../components/ValueCard';
import ValueSummary from '../components/ValueSummary';
import { apiService } from '../services/api';
import type { ChartDataPoint, MetricData, BackendChartData, BackendMetrics } from '../types/api';
import '../style/Dashboard.css';

interface SummaryItem {
    id: string;
    title: string;
    amount: string;
    type: 'positive' | 'negative';
    trend?: 'up' | 'down';
}

const summaryData: SummaryItem[] = [
    { id: '1', title: 'Valor positivo', amount: '$700.000 ARS', type: 'positive', trend: 'up' },
    { id: '2', title: 'Valor positivo', amount: '$3.400 USD', type: 'positive', trend: 'up' },
    { id: '3', title: 'Valor negativo', amount: '$230.000 ARS', type: 'negative', trend: 'down' },
    { id: '4', title: 'Valor negativo', amount: '$1.200 USD', type: 'negative', trend: 'down' }
];

const Dashboard: React.FC = () => {
    const [activeMenuItem, setActiveMenuItem] = useState<string>('item-empresa-2');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
    const [metrics, setMetrics] = useState<MetricData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [summaryItems, setSummaryItems] = useState<SummaryItem[]>(summaryData);

    // Carga de datos desde el backend
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                const [chartResponse, metricsResponse] = await Promise.all([
                    apiService.getChartData(),
                    apiService.getMetrics()
                ]);

                // Procesar datos del gráfico
                const backendChart = chartResponse.data as BackendChartData;
                const processedChart = backendChart.sales.map(sale => ({
                    month: new Date(sale.date).toLocaleDateString('es', { month: 'short' }),
                    value: sale.amount
                }));
                setChartData(processedChart);

                // Procesar métricas
                const backendMetrics = metricsResponse.data as BackendMetrics;
                const processedMetrics: MetricData[] = [
                    { value: backendMetrics.sales.ARS, label: 'Ventas ARS', icon: '💰' },
                    { value: backendMetrics.sales.USD, label: 'Ventas USD', icon: '💵' }
                ];
                setMetrics(processedMetrics);

                console.log('Datos cargados correctamente desde el backend');
            } catch (error) {
                console.error('Error cargando datos del backend:', error);
            } finally {
                setLoading(false);
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
                    {loading ? (
                        <div className="dashboard-page__loading">Cargando datos...</div>
                    ) : (
                        <>
                            <div className="dashboard-page__charts">
                                <Chart
                                    title="Título gráfico lineal"
                                    data={chartData}
                                    height={300}
                                />

                                <ValueCard
                                    subtitle="Concepto de Valor"
                                    amount="$700.000"
                                    description="Texto de ejemplo valor"
                                    buttonText="Ver detalle"
                                    onButtonClick={handleValueCardClick}
                                />
                            </div>

                            <ValueSummary items={summaryItems} />
                        </>
                    )}
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