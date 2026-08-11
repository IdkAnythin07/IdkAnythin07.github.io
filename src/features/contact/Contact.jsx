export default function Contact() {
  return (
    <div className="animate-fade-in">
      <p className="text-subtext font-mono text-sm mb-2">idkanythin07/contact</p>
      <h1 className="text-4xl md:text-5xl font-bold mb-10 text-mauve">Let's Connect</h1>

      <main className="space-y-12">
        <p className="text-xl text-subtext leading-relaxed">
          Whether you have a question, want to collaborate on a project,
          found a bug on the website, or simply want to say hello,
          my inbox is always open.
        </p>

        <section className="bg-surface0 rounded-xl overflow-hidden border border-surface1 shadow-xl max-w-2xl">
          <div className="bg-mantle px-4 py-3 flex items-center border-b border-surface1">
            <span className="flex space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-main"></span>
              <span className="w-3 h-3 rounded-full bg-peach"></span>
              <span className="w-3 h-3 rounded-full bg-green-main"></span>
            </span>
            <span className="mx-auto text-sm font-mono text-subtext">compose_message.txt</span>
            <span className="w-12"></span> {/* Spacer to balance flex */}
          </div>

          <form action="https://formspree.io/f/xjkgrkyy" method="POST" className="p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-bold text-text-main">Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="John Doe" 
                required 
                className="w-full bg-crust border border-surface1 rounded-md px-4 py-3 text-text-main placeholder-subtext focus:outline-none focus:border-mauve focus:ring-1 focus:ring-mauve transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold text-text-main">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="john@example.com" 
                required 
                className="w-full bg-crust border border-surface1 rounded-md px-4 py-3 text-text-main placeholder-subtext focus:outline-none focus:border-mauve focus:ring-1 focus:ring-mauve transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-bold text-text-main">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                placeholder="Write your message here..." 
                required
                className="w-full bg-crust border border-surface1 rounded-md px-4 py-3 text-text-main placeholder-subtext focus:outline-none focus:border-mauve focus:ring-1 focus:ring-mauve transition-colors resize-y"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-mauve hover:bg-mauve-hover text-crust font-bold py-3 px-6 rounded-md transition-colors shadow-lg hover:shadow-mauve/20"
            >
              Send Message
            </button>
          </form>
        </section>

        <section className="pt-8 border-t border-glass-border">
          <h2 className="text-2xl font-bold mb-6 text-text-main">Other Ways to Connect</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="bg-surface0 p-4 rounded-lg border border-surface1"><strong className="text-mauve block mb-1">Email</strong> <a href="mailto:IdkAnythin07@proton.me" className="text-text-main hover:underline">IdkAnythin07@proton.me</a></li>
            <li className="bg-surface0 p-4 rounded-lg border border-surface1"><strong className="text-mauve block mb-1">X (Twitter)</strong> <a href="https://x.com/IdkAnythin07" target="_blank" rel="noreferrer" className="text-text-main hover:underline">@IdkAnythin07</a></li>
            <li className="bg-surface0 p-4 rounded-lg border border-surface1"><strong className="text-mauve block mb-1">GitHub</strong> <a href="https://github.com/IdkAnythin07" target="_blank" rel="noreferrer" className="text-text-main hover:underline">IdkAnythin07</a></li>
            <li className="bg-surface0 p-4 rounded-lg border border-surface1"><strong className="text-mauve block mb-1">Telegram</strong> <a href="https://t.me/IdkAnythin07" target="_blank" rel="noreferrer" className="text-text-main hover:underline">@IdkAnythin07</a></li>
          </ul>
        </section>
      </main>
    </div>
  );
}
