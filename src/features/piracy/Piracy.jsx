import { useEffect } from 'react';

export default function Piracy() {
  useEffect(() => {
    // Dynamic import to keep Piracy isolated
    import('./piracy.js').catch(err => console.error("Failed to load piracy script:", err));
  }, []);

  return (
    <>
      <p className="eyebrow">idkanythin07/piracy</p>
      <h1>Anti-Piracy Screen</h1>

      <main>
        <p className="lede">
          Please do not pirate software. It is illegal and harms developers.
        </p>

        <section className="piracy-container" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <div id="piracy-warning" style={{ color: 'red', fontWeight: 'bold', fontSize: '1.2rem', padding: '1rem', border: '2px dashed red' }}>
            WARNING: PIRATED COPY DETECTED
          </div>
          <p style={{ marginTop: '1rem' }}>
            System lock initiated. Please contact the administrator.
          </p>
          <div id="piracy-glitch" style={{ display: 'none', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'black', color: 'lime', zIndex: 9999, padding: '2rem', fontFamily: 'monospace' }}>
            SYSTEM FAILURE. PLEASE REBOOT.
          </div>
        </section>
      </main>
    </>
  );
}
