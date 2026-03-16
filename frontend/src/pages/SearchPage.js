import React, { useState } from 'react';
import axios from 'axios';

const suggestions = [
  "India China border tensions",
  "Russia Ukraine war",
  "Middle East crisis",
  "Taiwan strait tensions",
  "NATO expansion",
  "South China Sea dispute"
];

function SearchPage({ onSearch }) {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/analyze/', {
        topic: topic
      });
      onSearch(topic, response.data);
    } catch (err) {
      setError('Something went wrong. Please try again!');
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div style={styles.container}>
        {loading && (
  <div style={styles.loadingOverlay}>
    <div style={styles.loadingBox}>
      <div style={styles.pulse}>🔮</div>
      <p style={styles.loadingTitle}>GeoOracle is analyzing...</p>
      <p style={styles.loadingDesc}>Fetching live news · Running AI analysis</p>
      <div style={styles.loadingSteps}>
        <div style={styles.step}>📰 Fetching real-time news articles</div>
        <div style={styles.step}>🧠 Sending to LLaMA 3.3 70B AI</div>
        <div style={styles.step}>🌍 Generating geopolitical analysis</div>
      </div>
    </div>
  </div>
)}
      <div style={styles.logoText}>Geo<span style={styles.highlight}>Oracle</span></div>
<div style={styles.badge}>🌍 Live Intelligence</div>
<h1 style={styles.title}>
  World events,<br />
  <span style={styles.highlight}>decoded by AI</span>
</h1>
      <p style={styles.desc}>
        Get real-time geopolitical analysis powered by live news and AI
      </p>
      <div style={styles.searchBox}>
        <input
          style={styles.input}
          placeholder="Ask about any geopolitical event..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
  style={{...styles.btn, opacity: loading ? 0.7 : 1}}
  onClick={handleSearch}
  disabled={loading}
>
  {loading ? '🔮 Analyzing...' : 'Analyze →'}
</button>
      </div>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.suggestions}>
        {suggestions.map((s, i) => (
          <div
            key={i}
            style={styles.chip}
            onClick={() => setTopic(s)}
          >
            {s}
          </div>
        ))}
      </div>
      <div style={styles.stats}>
        <div style={styles.stat}>
          <div style={styles.statVal}>150+</div>
          <div style={styles.statLabel}>Countries tracked</div>
        </div>
        <div style={styles.stat}>
          <div style={styles.statVal}>Live</div>
          <div style={styles.statLabel}>News data</div>
        </div>
        <div style={styles.stat}>
          <div style={styles.statVal}>AI</div>
          <div style={styles.statLabel}>Powered analysis</div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem 2rem',
    textAlign: 'center',
    background: '#060612'
  },
  badge: {
    fontSize: '11px',
    color: '#4f8ef7',
    border: '1px solid #1a2744',
    padding: '4px 12px',
    borderRadius: '20px',
    marginBottom: '2rem',
    letterSpacing: '1px'
  },
  title: {
    fontSize: '42px',
    fontWeight: '700',
    color: '#fff',
    lineHeight: '1.2',
    marginBottom: '1rem',
    letterSpacing: '-1px'
  },
  highlight: {
    color: '#4f8ef7'
  },
  desc: {
    fontSize: '14px',
    color: '#4b5563',
    marginBottom: '2rem',
    maxWidth: '420px'
  },
  searchBox: {
    width: '100%',
    maxWidth: '560px',
    background: '#0d1117',
    border: '1px solid #1a2744',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    padding: '4px 4px 4px 18px',
    gap: '12px'
  },
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#fff',
    fontSize: '14px',
    padding: '10px 0'
  },
  btn: {
    background: '#4f8ef7',
    border: 'none',
    borderRadius: '9px',
    padding: '10px 20px',
    color: '#fff',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer'
  },
  error: {
    color: '#ef4444',
    fontSize: '13px',
    marginTop: '1rem'
  },
  suggestions: {
    display: 'flex',
    gap: '8px',
    marginTop: '1.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '560px'
  },
  chip: {
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '12px',
    border: '1px solid #1a2744',
    color: '#6b7280',
    cursor: 'pointer'
  },
  stats: {
    display: 'flex',
    gap: '3rem',
    marginTop: '3rem'
  },
  stat: {
    textAlign: 'center'
  },
  statVal: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#4f8ef7'
  },
  statLabel: {
    fontSize: '11px',
    color: '#374151',
    marginTop: '2px'
  },
  logoText: {
  fontSize: '48px',
  fontWeight: '700',
  color: '#fff',
  letterSpacing: '-2px',
  marginBottom: '1.5rem'
},
loadingOverlay: {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(6, 6, 18, 0.95)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
},
loadingBox: {
  textAlign: 'center',
  padding: '3rem'
},
pulse: {
  fontSize: '48px',
  marginBottom: '1.5rem',
  animation: 'pulse 1.5s infinite'
},
loadingTitle: {
  fontSize: '22px',
  fontWeight: '600',
  color: '#fff',
  marginBottom: '8px'
},
loadingDesc: {
  fontSize: '13px',
  color: '#4b5563',
  marginBottom: '2rem'
},
loadingSteps: {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'center'
},
step: {
  fontSize: '13px',
  color: '#4f8ef7',
  background: '#0d1117',
  border: '1px solid #1a2744',
  borderRadius: '10px',
  padding: '10px 20px'
}
};

export default SearchPage;