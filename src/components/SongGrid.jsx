import SongCard from './SongCard';

export default function SongGrid({ songs, onPlay, currentSong }) {
  return (
    <div className="song-grid-wrapper">
      <div className="song-grid">
        {songs.map(song => (
          <div key={song.id}>
            <SongCard
              song={song}
              onPlay={onPlay}
              isPlaying={currentSong?.id === song.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}