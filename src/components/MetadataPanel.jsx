export default function MetadataPanel({ data, loading }) {
  const copyright = data?.copyright?.replace(/\n/g, ' ').trim() || 'PUBLIC DOMAIN / NASA';

  return (
    <aside style={styles.container}>
      <div style={styles.header}>
        {loading ? (
          <>
            <div style={{...styles.skeleton, width: '100px', height: '12px', marginBottom: '1rem'}}></div>
            <div style={{...styles.skeleton, width: '80%', height: '32px'}}></div>
          </>
        ) : (
          <>
            <span style={styles.date}>{data?.date}</span>
            <h2 style={styles.title}>{data?.title}</h2>
          </>
        )}
      </div>

      <div style={styles.explanation}>
        {loading ? (
          <>
            <div style={{...styles.skeleton, height: '14px', marginBottom: '10px'}}></div>
            <div style={{...styles.skeleton, height: '14px', marginBottom: '10px'}}></div>
            <div style={{...styles.skeleton, height: '14px', marginBottom: '10px'}}></div>
            <div style={{...styles.skeleton, height: '14px', width: '60%'}}></div>
          </>
        ) : (
          <p style={styles.text}>{data?.explanation || 'No explanation provided for this visual.'}</p>
        )}
      </div>

      <div style={styles.details}>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>ORIGIN / COPYRIGHT</span>
          {loading ? (
            <div style={{...styles.skeleton, width: '150px', height: '14px', marginTop: '4px'}}></div>
          ) : (
            <span style={styles.detailValue} title={copyright}>{copyright}</span>
          )}
        </div>
        
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>SERVICE LINK</span>
          {loading ? (
            <div style={{...styles.skeleton, width: '120px', height: '14px', marginTop: '4px'}}></div>
          ) : (
            <span style={styles.detailValue}>NASA APOD API</span>
          )}
        </div>
      </div>
    </aside>
  );
}

const styles = {
  container: {
    backgroundColor: 'var(--bg-surface)',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  header: {
    padding: '2rem',
    borderBottom: '1px solid var(--border)',
    position: 'relative',
  },
  date: {
    display: 'block',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    color: 'var(--accent)',
    letterSpacing: '0.2em',
    marginBottom: '1rem',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.75rem',
    fontWeight: '800',
    lineHeight: '1.1',
    letterSpacing: '-0.01em',
    textTransform: 'uppercase',
  },
  explanation: {
    padding: '2rem',
    borderBottom: '1px solid var(--border)',
    flex: 1,
  },
  text: {
    fontSize: '0.9rem',
    lineHeight: '1.7',
    color: 'var(--text-muted)',
    fontWeight: '400',
  },
  details: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  detailLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.6rem',
    color: 'var(--text-dark)',
    letterSpacing: '0.15em',
  },
  detailValue: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    color: 'var(--text-hi)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  skeleton: {
    backgroundColor: 'var(--border)',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  }
};
