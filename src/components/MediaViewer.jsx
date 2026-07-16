export default function MediaViewer({ data, loading, error }) {
  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorBox}>
          <p style={styles.errorTitle}>CONNECTION LOST</p>
          <p style={styles.errorMessage}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.frame}>
        {/* Crosshair decorators */}
        <div style={{...styles.crosshair, top: 20, left: 20, borderTop: '1px solid var(--accent)', borderLeft: '1px solid var(--accent)'}}></div>
        <div style={{...styles.crosshair, bottom: 20, right: 20, borderBottom: '1px solid var(--accent)', borderRight: '1px solid var(--accent)'}}></div>

        {loading ? (
          <div style={styles.skeleton}></div>
        ) : data?.media_type === 'image' ? (
          <img src={data.url} alt={data.title} style={styles.media} />
        ) : data?.url?.includes('youtube') ? (
          <iframe src={data.url} style={styles.media} frameBorder="0" allowFullScreen></iframe>
        ) : (
          <video src={data?.url} style={styles.media} controls></video>
        )}
      </div>
      
      <div style={styles.toolbar}>
        {loading ? (
          <div style={{...styles.skeletonBadge, width: '60px'}}></div>
        ) : (
          <span style={styles.badge}>{data?.media_type || 'UNKNOWN'}</span>
        )}
        
        {!loading && data?.hdurl && (
          <a href={data.hdurl} target="_blank" rel="noopener noreferrer" style={styles.hdLink}>
            HD VIEW ↗
          </a>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#000',
    borderRight: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
  },
  frame: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    overflow: 'hidden',
  },
  crosshair: {
    position: 'absolute',
    width: '20px',
    height: '20px',
    opacity: 0.5,
    pointerEvents: 'none',
  },
  media: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    filter: 'brightness(0.95) contrast(1.05)',
  },
  toolbar: {
    height: '45px',
    backgroundColor: 'var(--bg-main)',
    borderTop: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1.5rem',
    flexShrink: 0,
  },
  badge: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    color: 'var(--accent)',
    backgroundColor: 'rgba(255, 69, 0, 0.1)',
    border: '1px solid rgba(255, 69, 0, 0.2)',
    padding: '2px 8px',
    letterSpacing: '0.15em',
  },
  hdLink: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    color: 'var(--text-muted)',
    border: '1px solid var(--border)',
    padding: '4px 10px',
    letterSpacing: '0.1em',
    transition: 'all 0.2s',
  },
  errorBox: {
    margin: 'auto',
    textAlign: 'center',
    fontFamily: 'var(--font-mono)',
  },
  errorTitle: {
    color: 'var(--accent)',
    letterSpacing: '0.2em',
    marginBottom: '1rem',
  },
  errorMessage: {
    color: 'var(--text-muted)',
    fontSize: '0.8rem',
  },
  skeleton: {
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--bg-surface)',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
  skeletonBadge: {
    height: '20px',
    backgroundColor: 'var(--bg-surface)',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  }
};
