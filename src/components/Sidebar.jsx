import { Home, TrendingUp, LibraryMusic, Info } from '@mui/icons-material';

export default function Sidebar({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'music', label: 'Music', icon: LibraryMusic },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">♫</span>
          <span className="logo-text">Song UI</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon className="nav-icon" />
              <span className="nav-label">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <p className="footer-text">© 2026 Song UI</p>
      </div>
    </aside>
  );
}