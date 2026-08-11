export default function Home() {
  return (
    <div className="animate-fade-in">
      <p className="text-subtext font-mono text-sm mb-2">idkanythin07/home</p>
      <h1 className="text-4xl md:text-5xl font-bold mb-10 text-mauve">About Me</h1>

      <main className="space-y-12">
        <section id="about" className="space-y-6">
          <img 
            src="/profile.jpg" 
            alt="IdkAnythin07" 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-surface1 shadow-lg float-right ml-6 mb-4 object-cover"
            loading="lazy" 
          />

          <p className="text-lg leading-relaxed text-subtext">
            Hi, I'm <span className="text-text-main font-semibold">IdkAnythin07</span>, a
            <span className="text-text-main font-semibold"> B.Tech </span> Computer Science and Engineering student at
            <span className="text-text-main font-semibold"> TIEM Banipur</span>, specializing in Artificial Intelligence and
            Machine Learning. I have a deep passion for technology, creativity, and the endless process
            of exploring new ideas. Whether I'm writing code, experimenting with custom Android ROMs, or
            fine-tuning a Linux setup to work exactly the way I want, I genuinely enjoy understanding how
            things work and pushing them further through customization and hands-on problem-solving.
            Programming isn't just a skill to me — it's a creative outlet and one of the main ways I
            engage with the world.
          </p>

          <p className="text-lg leading-relaxed text-subtext">
            Outside of programming, I'm a huge fan of anime, gacha games, and rhythm games. Music plays
            a central role in my life, and I'm always on the hunt for new tracks, artists, and
            genres to add to my ever-growing playlist. I also enjoy creative audio work, including
            recitation, voice acting, dubbing, audio editing, and mixing. More recently, I've started
            learning to sing as another way to stretch my creative abilities and challenge myself in a
            completely new direction. It's difficult, but that's exactly what makes it rewarding.
          </p>

          <section className="py-8 clear-both">
            <h2 className="text-2xl font-bold mb-6 text-text-main border-b border-surface1 pb-2">Technologies I Use</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {['Python', 'C / C++', 'TensorFlow', 'PyTorch', 'JavaScript', 'Linux / Bash', 'Git', 'Docker'].map(tech => (
                <div key={tech} className="bg-surface0 text-text-main py-3 px-4 rounded-lg text-center font-medium shadow-sm border border-surface1 hover:border-mauve transition-colors">
                  {tech}
                </div>
              ))}
            </div>
          </section>

          <p className="text-lg leading-relaxed text-subtext">
            I'm always eager to learn something new. Whether I'm building personal side projects,
            exploring a different Linux distribution, experimenting with an emerging technology stack, or
            discovering hidden gems in the world of gaming and anime, I try to approach every opportunity
            with genuine curiosity. I believe there's always something more to discover, and I love
            connecting with people who share similar interests. If you're into open-source software,
            AI, anime, games, or just enjoy talking through interesting ideas, feel free to reach out —
            I'd be happy to connect.
          </p>
        </section>

        <section className="bg-surface0/50 p-8 rounded-xl border border-glass-border">
          <h2 className="text-2xl font-bold mb-6 text-text-main">Find Me Online</h2>
          <ul className="flex flex-wrap gap-6">
            <li><a href="https://x.com/IdkAnythin07" target="_blank" rel="noreferrer" className="text-mauve hover:text-mauve-hover underline font-medium">Twitter</a></li>
            <li><a href="https://github.com/IdkAnythin07" target="_blank" rel="noreferrer" className="text-mauve hover:text-mauve-hover underline font-medium">GitHub</a></li>
            <li><a href="https://t.me/IdkAnythin07" target="_blank" rel="noreferrer" className="text-mauve hover:text-mauve-hover underline font-medium">Telegram</a></li>
            <li><a href="mailto:IdkAnythin07@proton.me" className="text-mauve hover:text-mauve-hover underline font-medium">Email</a></li>
          </ul>
        </section>
      </main>
    </div>
  );
}
