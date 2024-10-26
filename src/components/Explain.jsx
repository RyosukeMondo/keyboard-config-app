import React from 'react';
import './Explain.css';

const nodokaFiles = [
  '109.nodoka',
  'hm.nodoka',
  'master.nodoka',
  'dvorakY.nodoka',
  'key_seq.nodoka',
];

const Explain = () => {
  return (
    <div className="explain-container">
      <h2 className="explain-title">How to Use Key Config Web App</h2>
      
      <section className="explain-section">
        <p className="explain-text">Download Yamy:</p>
        <a 
          href="https://ja.osdn.net/frs/redir.php?m=jaist&f=yamy%2F43637%2Fyamy-0.03.zip" 
          target="_blank" 
          rel="noopener noreferrer"
          className="explain-link"
        >
          Download Yamy
        </a>
      </section>
      
      <section className="explain-section">
        <p className="explain-text">Download the default config files below:</p>
        <ul className="explain-list">
          {nodokaFiles.map((file) => (
            <li key={file} className="explain-list-item">
              <a href={`/nodoka/${file}`} download className="explain-link">
                {file}
              </a>
            </li>
          ))}
        </ul>
      </section>
      
      <section className="explain-section">
        <p className="explain-text">After downloading the config files generated on this site:</p>
        <ol className="explain-ordered-list">
          <li>Place the downloaded files in the <code className="explain-code">yamy</code> folder.</li>
          <li>Reload Yamy.</li>
          <li>Have fun!</li>
        </ol>
      </section>
    </div>
  );
};

export default Explain;