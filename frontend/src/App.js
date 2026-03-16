import React, { useState } from 'react';
import SearchPage from './pages/SearchPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('search');
  const [searchTopic, setSearchTopic] = useState('');
  const [results, setResults] = useState(null);

  const handleSearch = (topic, data) => {
    setSearchTopic(topic);
    setResults(data);
    setCurrentPage('results');
  };

  const handleBack = () => {
    setCurrentPage('search');
    setResults(null);
    setSearchTopic('');
  };

  return (
    <div>
      {currentPage === 'search' ? (
        <SearchPage onSearch={handleSearch} />
      ) : (
        <ResultsPage
          topic={searchTopic}
          results={results}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

export default App;