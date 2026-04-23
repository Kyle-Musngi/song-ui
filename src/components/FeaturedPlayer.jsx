import { useState } from 'react';
import { OpenInNew } from '@mui/icons-material';

export default function FeaturedPlayer({ song, songs, onSongChange }) {
  const [isPlaying, setIsPlaying] = useState(true);

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const isYouTubeUrl = (url) => url && url.includes('youtu');
  const videoId = getYouTubeVideoId(song?.url);

  const openYouTube = () => {
    window.open(`https://youtu.be/${videoId}`, '_blank');
  };

  return (
    <div className="featured-player">
      <div className="featured-wrapper">
        {/* Left Section */}
        <div className="featured-left">
          <div className="featured-header">
            <div>
              <h2 className="featured-title">{song?.title}</h2>
              <p className="featured-meta">{song?.artist} • {song?.album} • {song?.genre}</p>
            </div>
            {isYouTubeUrl(song?.url) && (
              <button className="featured-open-btn" onClick={openYouTube}>
                OPEN <OpenInNew />
              </button>
            )}
          </div>

          {/* Video Player */}
          {isYouTubeUrl(song?.url) ? (
            <div className="featured-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title={song?.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="featured-video-placeholder">
              <div className="placeholder-content">♫</div>
            </div>
          )}

          {/* Song Info Below */}
          <div className="featured-info">
            <h3>{song?.title}</h3>
            <p className="featured-artist">{song?.artist} • {song?.album} • {song?.genre}</p>
            <p className="featured-description">Search like YouTube, then click a card in "Recommended" to play.</p>
          </div>
        </div>

        {/* Right Section - Recommendations */}
        <div className="featured-right">
          <h3 className="featured-recommended-header">Recommended</h3>
          <div className="featured-recommended-grid">
            {songs.map((s) => (
              <button
                key={s.id}
                className={`featured-rec-card ${s.id === song.id ? 'active' : ''}`}
                onClick={() => onSongChange(s)}
              >
                <div className="featured-rec-image">
                  <img
                    src={`https://img.youtube.com/vi/${getYouTubeVideoId(s.url)}/hqdefault.jpg`}
                    alt={s.title}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="featured-rec-placeholder">♫</div>
                </div>
                <div className="featured-rec-info">
                  <p className="featured-rec-title">{s.title}</p>
                  <p className="featured-rec-artist">{s.artist}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}