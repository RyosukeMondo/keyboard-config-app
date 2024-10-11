// ./src/components/Explain.jsx

import React from 'react';

const nodokaFiles = [
  '109.nodoka',
  'hm.nodoka',
  'master.nodoka',
  'dvorakY.nodoka',
  'key_seq.nodoka',
];

const Explain = () => {
  return (
    <div style={styles.container}>
      <h2>How to Use Key Config Web App</h2>
      
      <section style={styles.section}>
        <p>Download Yamy:</p>
        <a 
          href="https://ja.osdn.net/frs/redir.php?m=jaist&f=yamy%2F43637%2Fyamy-0.03.zip" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Download Yamy
        </a>
      </section>
      
      <section style={styles.section}>
        <p>Download the default config files below:</p>
        <ul>
          {nodokaFiles.map((file) => (
            <li key={file}>
              <a href={`/nodoka/${file}`} download>
                {file}
              </a>
            </li>
          ))}
        </ul>
      </section>
      
      <section style={styles.section}>
        <p>After downloading the config files generated on this site:</p>
        <ol>
          <li>Place the downloaded files in the <code>yamy</code> folder.</li>
          <li>Reload Yamy.</li>
          <li>Have fun!</li>
        </ol>
      </section>
    </div>
  );
};

// Basic inline styles for simplicity. You can replace these with CSS or styled-components as needed.
const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  section: {
    marginBottom: '20px',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Explain;
