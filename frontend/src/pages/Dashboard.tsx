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


    const mapPeriodToBackend = (period: string) => {
        const periodMap: { [key: string]: string } = {
            'Anual': 'year',
            'Mensual': 'month',
            'Semanal': 'week',
            'Diario': 'day'
        };
        return periodMap[period] || 'month';
    };

    const loadChartData = async (period = 'Anual') => {
        try {
            const backendPeriod = mapPeriodToBackend(period);
            const chartResponse = await apiService.getChartData(backendPeriod);
            const backendChart = chartResponse.data as BackendChartData;

            if (backendChart && backendChart.sales && Array.isArray(backendChart.sales)) {
                const dataMapARS = new Map<string, number>();
                const dataMapUSD = new Map<string, number>();

                // Procesar ventas por moneda
                backendChart.sales.forEach(sale => {
                    const dateKey = sale.date.split('T')[0];
                    if (sale.currency === 'ARS') {
                        const currentValue = dataMapARS.get(dateKey) || 0;
                        dataMapARS.set(dateKey, currentValue + sale.amount);
                    } else if (sale.currency === 'USD') {
                        const currentValue = dataMapUSD.get(dateKey) || 0;
                        dataMapUSD.set(dateKey, currentValue + sale.amount);
                    }
                });

                // Combinar fechas únicas
                const allDates = new Set([...dataMapARS.keys(), ...dataMapUSD.keys()]);
                
                const processedChart = Array.from(allDates)
                    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
                    .map((date, index) => ({
                        month: formatDateForChart(date, period, index),
                        valueARS: Math.round(dataMapARS.get(date) || 0),
                        valueUSD: Math.round(dataMapUSD.get(date) || 0)
                    }));

                setChartData(processedChart);
            } else {
                console.warn('Datos del gráfico no válidos');
                setChartData([]);
            }
        } catch (error) {
            console.error('Error cargando datos del gráfico:', error);
            setChartData([]);
        }
    };

    const formatDateForChart = (date: string, period: string, index: number) => {
        const dateObj = new Date(date);
        switch (period) {
            case 'Anual':
                return dateObj.getFullYear().toString();
            case 'Mensual':
                return dateObj.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' });
            case 'Semanal':
                return `S${index + 1}`;
            case 'Diario':
                return dateObj.toLocaleDateString('es-ES', { month: 'numeric', day: 'numeric' });
            default:
                return date;
        }
    };

    // Carga de datos desde el backend
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                const metricsResponse = await apiService.getMetrics('month');

                await loadChartData();

                // Procesar métricas con validación
                const backendMetrics = metricsResponse.data as BackendMetrics;
                if (backendMetrics && backendMetrics.sales) {
                    const processedMetrics: MetricData[] = [
                        { value: `$${Math.round(backendMetrics.sales.ARS || 0).toLocaleString()}`, label: 'Ventas ARS', icon: '💰' },
                        { value: `$${Math.round(backendMetrics.sales.USD || 0).toLocaleString()}`, label: 'Ventas USD', icon: '💵' },
                        { value: `$${Math.round(backendMetrics.expenses.ARS || 0).toLocaleString()}`, label: 'Gastos ARS', icon: '📉' },
                        { value: `$${Math.round(backendMetrics.expenses.USD || 0).toLocaleString()}`, label: 'Gastos USD', icon: '📉' }
                    ];
                    setMetrics(processedMetrics);
                } else {
                    console.warn('Datos de métricas no válidos');
                    setMetrics([]);
                }

                console.log('Datos cargados correctamente desde el backend');
            } catch (error) {
                const sanitizedError = String(error).replace(/[\r\n]/g, ' ');
                console.error('Error cargando datos del backend:', sanitizedError);
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

    const handlePeriodChange = (period: string) => {
        loadChartData(period);
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
                    username="Usuario"
                    metrics={metrics}
                />

                <div className="dashboard-page__content">
                    {loading ? (
                        <div className="dashboard-page__loading">Cargando datos...</div>
                    ) : (
                        <>
                            <div className="dashboard-page__charts">
                                <Chart
                                    title="Datos Financieros por Período"
                                    data={chartData}
                                    height={300}
                                    onPeriodChange={handlePeriodChange}
                                />

                                <ValueCard
                                    subtitle="Resumen Financiero"
                                    amount={`ARS: $${chartData.reduce((sum, item) => sum + (item.valueARS || 0), 0).toLocaleString()} | USD: $${chartData.reduce((sum, item) => sum + (item.valueUSD || 0), 0).toLocaleString()}`}
                                    description="Total del período seleccionado"
                                    buttonText="Ver detalle"
                                    onButtonClick={handleValueCardClick}
                                />
                            </div>

                            <ValueSummary items={summaryData} />
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