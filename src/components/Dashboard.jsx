import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import MediaViewer from './MediaViewer';
import MetadataPanel from './MetadataPanel';

export default function Dashboard() {
  const [date, setDate] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_NASA_API_KEY;

  const fetchData = async (targetDate) => {
    setLoading(true);
    setError(null);
    try {
      const url = targetDate 
        ? `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${targetDate}`
        : `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
        
      const res = await fetch(url);
      const json = await res.json();
      
      if (json.code && json.code !== 200) {
        throw new Error(json.msg || 'Failed to fetch data');
      }
      
      setData(json);
      setDate(json.date);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData('');
  }, []);

  return (
    <div style={styles.container} className="animate-fade-in">
      <Navbar 
        currentDate={date} 
        onDateChange={fetchData} 
      />
      
      <main style={styles.grid}>
        <MediaViewer 
          data={data} 
          loading={loading} 
          error={error} 
        />
        <MetadataPanel 
          data={data} 
          loading={loading} 
        />
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    flex: 1,
    minHeight: 'calc(100vh - 60px)',
  }
};
