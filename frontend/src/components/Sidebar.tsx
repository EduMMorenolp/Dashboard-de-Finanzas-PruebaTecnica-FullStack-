import React from 'react';
import '../style/components/Sidebar.css';

interface MenuItem {
    id: string;
    label: string;
    icon: string;
    active?: boolean;
}

interface SidebarProps {
    activeItem?: string;
    onItemClick?: (itemId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem = 'item-empresa-2', onItemClick }) => {
    const menuItems: MenuItem[] = [
        { id: 'inicio', label: 'Inicio', icon: '🏠' },
        { id: 'item-empresa-2', label: 'Item Empresa 2', icon: '📊', active: true },
        { id: 'item-empresa-3', label: 'Item Empresa 3', icon: '📈' },
        { id: 'item-empresa-4', label: 'Item Empresa 4', icon: '👥' },
        { id: 'item-empresa-5', label: 'Item Empresa 5', icon: '⚙️' },
        { id: 'item-empresa-6', label: 'Item Empresa 6', icon: '📋' },
    ];

    const handleItemClick = (itemId: string) => {
        if (onItemClick) {
            onItemClick(itemId);
        }
    };

    const handleLogout = () => {
        console.log('Cerrar sesión');
    };

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__logo">
                    <div className="sidebar__logo-icon">📊</div>
                    <span className="sidebar__logo-text">LOGO EMPRESA</span>
                </div>
            </div>

            <nav className="sidebar__nav">
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        className={`sidebar__nav-item ${activeItem === item.id ? 'sidebar__nav-item--active' : ''}`}
                        onClick={() => handleItemClick(item.id)}
                    >
                        <span className="sidebar__nav-icon">{item.icon}</span>
                        <span className="sidebar__nav-text">{item.label}</span>
                    </div>
                ))}
            </nav>

            <div className="sidebar__footer">
                <div className="sidebar__nav-item" onClick={handleLogout}>
                    <span className="sidebar__nav-icon">🚪</span>
                    <span className="sidebar__nav-text">Cerrar sesión</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;