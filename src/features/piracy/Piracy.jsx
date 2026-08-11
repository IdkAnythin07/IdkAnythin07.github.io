import { useEffect } from 'react';

export default function Piracy() {
  useEffect(() => {
    // Dynamic import to keep Piracy isolated
    import('./piracy.js').catch(err => console.error("Failed to load piracy script:", err));
  }, []);

  return (
    <div className="animate-fade-in text-center max-w-2xl mx-auto">
      <p className="text-subtext font-mono text-sm mb-2 text-left">idkanythin07/piracy</p>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-red-main text-left">Anti-Piracy Screen</h1>

      <main className="space-y-8 mt-12">
        <p className="text-xl text-subtext leading-relaxed">
          Please do not pirate software. It is illegal and harms developers.
        </p>

        <section className="bg-crust p-8 border border-surface1 rounded-xl shadow-2xl">
          <div id="piracy-warning" className="text-red-main font-bold text-xl p-4 border-2 border-dashed border-red-main animate-pulse">
            WARNING: PIRATED COPY DETECTED
          </div>
          <p className="mt-6 text-subtext font-mono">
            System lock initiated. Please contact the administrator.
          </p>
          <div id="piracy-glitch" className="hidden fixed inset-0 bg-black text-green-500 z-[9999] p-8 font-mono text-2xl flex items-center justify-center">
            SYSTEM FAILURE. PLEASE REBOOT.
          </div>
        </section>
      </main>
    </div>
  );
}
