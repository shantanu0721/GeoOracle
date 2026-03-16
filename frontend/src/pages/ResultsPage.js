import React from 'react';

function ResultsPage({ topic, results, onBack }) {
  const { ai_analysis, articles } = results;

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <div style={styles.logo}>Geo<span style={styles.logoSpan}>Oracle</span></div>
        <div style={styles.navTopic}>{topic}</div>
        <button style={styles.backBtn} onClick={onBack}>← New Search</button>
      </div>

      <div style={styles.grid}>
        <div style={styles.left}>
          <div style={styles.topicBar}>
            <h2 style={styles.topicTitle}>{topic}</h2>
            <div style={styles.liveBadge}>● Live</div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardLabel}>AI Analysis</div>
            <div style={styles.analysisText}>
              {ai_analysis.split('\n').map((line, i) => (
                <p key={i} style={{
                  marginBottom: '8px',
                  color: line.startsWith('**') ? '#fff' : '#d1d5db',
                  fontWeight: line.startsWith('**') ? '600' : '400'
                }}>
                  {line.replace(/\*\*/g, '')}
                </p>
              ))}
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardLabel}>Source Articles</div>
            {articles.map((article, i) => (
              <div key={i} style={styles.articleItem}>
                <div style={styles.articleNum}>0{i + 1}</div>
                <div>
                  <a href={article.url} target="_blank" rel="noreferrer" style={styles.articleTitle}>
                    {article.title}
                  </a>
                  <div style={styles.articleMeta}>
                    {article.source} · {new Date(article.publishedAt).toDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.right}>
          <div style={styles.card}>
            <div style={styles.cardLabel}>Quick Stats</div>
            <div style={styles.statRow}>
              <div style={styles.statBox}>
                <div style={styles.statVal}>{articles.length}</div>
                <div style={styles.statLabel}>Sources</div>
              </div>
              <div style={styles.statBox}>
                <div style={styles.statVal}>Live</div>
                <div style={styles.statLabel}>Data</div>
              </div>
              <div style={styles.statBox}>
                <div style={styles.statVal}>AI</div>
                <div style={styles.statLabel}>Powered</div>
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardLabel}>Sources</div>
            {articles.map((article, i) => (
              <div key={i} style={styles.sourceItem}>
                <div style={styles.sourceDot}></div>
                <div>
                  <div style={styles.sourceName}>{article.source}</div>
                  <div style={styles.sourceDate}>
                    {new Date(article.publishedAt).toDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#060612', padding: '1.5rem' },
  navbar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '12px' },
  logo: { fontSize: '20px', fontWeight: '700', color: '#fff' },
  logoSpan: { color: '#4f8ef7' },
  navTopic: { fontSize: '13px', color: '#4b5563', flex: 1, textAlign: 'center' },
  backBtn: { background: 'transparent', border: '1px solid #1a2744', borderRadius: '8px', padding: '7px 14px', color: '#4f8ef7', fontSize: '12px', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem' },
  left: {},
  right: {},
  topicBar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' },
  topicTitle: { fontSize: '22px', fontWeight: '600', color: '#fff' },
  liveBadge: { fontSize: '11px', color: 'red', border: '1px solid #1a2744', padding: '3px 10px', borderRadius: '20px' },
  card: { background: '#0d1117', border: '1px solid #1a2744', borderRadius: '14px', padding: '1.25rem', marginBottom: '1.25rem' },
  cardLabel: { fontSize: '11px', color: '#4f8ef7', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '12px' },
  analysisText: { fontSize: '14px', lineHeight: '1.75' },
  articleItem: { display: 'flex', gap: '12px', padding: '0.75rem 0', borderBottom: '1px solid #1a2744' },
  articleNum: { fontSize: '11px', color: '#4f8ef7', minWidth: '20px', marginTop: '2px' },
  articleTitle: { fontSize: '13px', color: '#e5e7eb', lineHeight: '1.5', textDecoration: 'none', display: 'block', marginBottom: '4px' },
  articleMeta: { fontSize: '11px', color: '#4b5563' },
  statRow: { display: 'flex', gap: '12px' },
  statBox: { flex: 1, background: '#0a0e1a', borderRadius: '10px', padding: '12px', textAlign: 'center' },
  statVal: { fontSize: '20px', fontWeight: '600', color: '#4f8ef7' },
  statLabel: { fontSize: '11px', color: '#4b5563', marginTop: '4px' },
  sourceItem: { display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '0.6rem 0', borderBottom: '1px solid #1a2744' },
  sourceDot: { width: '6px', height: '6px', borderRadius: '50%', background: '#4f8ef7', marginTop: '6px', flexShrink: 0 },
  sourceName: { fontSize: '12px', color: '#9ca3af' },
  sourceDate: { fontSize: '11px', color: '#4b5563', marginTop: '2px' }
};

export default ResultsPage;