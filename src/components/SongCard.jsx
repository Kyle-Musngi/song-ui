import { useState } from 'react';
import { PlayArrow } from '@mui/icons-material';

export default function SongCard({ song, onPlay, isPlaying }) {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      className={`song-card ${isPlaying ? 'playing' : ''}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => onPlay(song)}
    >
      <div className="card-thumbnail">
        <div className="thumbnail-content">♫</div>
        {hovering && (
          <button className="play-overlay">
            <PlayArrow className="play-icon" />
          </button>
        )}
        {isPlaying && <div className="now-playing-badge">Playing</div>}
      </div>

      <div className="card-info">
        <h4 className="card-title">{song.title}</h4>
        <p className="card-artist">{song.artist}</p>
        <p className="card-meta">{song.album}</p>
      </div>
    </div>
  );
}