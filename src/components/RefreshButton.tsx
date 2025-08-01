import React from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import './RefreshButton.css';

const RefreshButton: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <button
      className="refresh-button"
      onClick={handleRefresh}
      aria-label="Refresh movies"
      title="Get new random movies"
    >
      <RefreshIcon fontSize="small" />
      Refresh
    </button>
  );
};

export default RefreshButton;