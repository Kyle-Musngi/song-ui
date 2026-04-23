import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import FeaturedPlayer from './components/FeaturedPlayer';
import SongGrid from './components/SongGrid';
import './App.css';

function App() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'https://song-api-qx06.onrender.com/musngi/songs';

  const tabLabels = {
    home: 'Home',
    trending: 'Trending',
    music: 'Music',
    about: 'About',
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = songs.filter(song =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.album.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(songs);
    }
  }, [searchQuery, songs]);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setSongs(response.data);
      setFilteredSongs(response.data);
      if (response.data.length > 0) {
        setCurrentSong(response.data[0]);
      }
      setError(null);
    } catch (err) {
      setError('Failed to load songs. Make sure your API is running.');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-content">
          <p className="loading-text">🎵 Loading songs...</p>
          <p className="loading-subtext">(First load may take 30-50 seconds)</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error">
        <p className="error-text">{error}</p>
        <button onClick={fetchSongs} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="app-main">
        <SearchBar onSearch={setSearchQuery} />
        
        <div className="app-content">
          {activeTab === 'home' && currentSong && filteredSongs.length > 0 ? (
            <FeaturedPlayer 
              song={currentSong}
              songs={filteredSongs}
              onSongChange={setCurrentSong}
            />
          ) : (
            <div className="songs-section">
              <div className="section-header">
                <h2>{tabLabels[activeTab]}</h2>
                <p className="section-subtitle">
                  {filteredSongs.length} songs available
                </p>
              </div>
              
              {filteredSongs.length > 0 ? (
                <SongGrid 
                  songs={filteredSongs}
                  onPlay={setCurrentSong}
                  currentSong={currentSong}
                />
              ) : (
                <div className="no-songs">
                  <p>No songs found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;