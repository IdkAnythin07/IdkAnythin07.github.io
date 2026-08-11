export default function Home() {
  return (
    <>
      <p className="eyebrow">idkanythin07/home</p>
      <h1>About Me</h1>

      <main>
        <section id="about" className="intro">
          <img src="/profile.jpg" alt="IdkAnythin07" className="profile-pic" loading="lazy" />

          <p className="bio">
            Hi, I'm <span className="highlight">IdkAnythin07</span>, a
            <span className="highlight"> B.Tech </span> Computer Science and Engineering student at
            <span className="highlight"> TIEM Banipur</span>, specializing in Artificial Intelligence and
            Machine Learning. I have a deep passion for technology, creativity, and the endless process
            of exploring new ideas. Whether I'm writing code, experimenting with custom Android ROMs, or
            fine-tuning a Linux setup to work exactly the way I want, I genuinely enjoy understanding how
            things work and pushing them further through customization and hands-on problem-solving.
            Programming isn't just a skill to me — it's a creative outlet and one of the main ways I
            engage with the world.
          </p>

          <p className="bio">
            Outside of programming, I'm a huge fan of anime, gacha games, and rhythm games. Music plays
            a central role in my life, and I'm always on the hunt for new tracks, artists, and
            genres to add to my ever-growing playlist. I also enjoy creative audio work, including
            recitation, voice acting, dubbing, audio editing, and mixing. More recently, I've started
            learning to sing as another way to stretch my creative abilities and challenge myself in a
            completely new direction. It's difficult, but that's exactly what makes it rewarding.
          </p>

          <section className="skills">
            <h2>Technologies I Use</h2>
            <div className="tech-grid">
              <div className="tech-item">Python</div>
              <div className="tech-item">C / C++</div>
              <div className="tech-item">TensorFlow</div>
              <div className="tech-item">PyTorch</div>
              <div className="tech-item">JavaScript</div>
              <div className="tech-item">Linux / Bash</div>
              <div className="tech-item">Git</div>
              <div className="tech-item">Docker</div>
            </div>
          </section>

          <p className="bio">
            I'm always eager to learn something new. Whether I'm building personal side projects,
            exploring a different Linux distribution, experimenting with an emerging technology stack, or
            discovering hidden gems in the world of gaming and anime, I try to approach every opportunity
            with genuine curiosity. I believe there's always something more to discover, and I love
            connecting with people who share similar interests. If you're into open-source software,
            AI, anime, games, or just enjoy talking through interesting ideas, feel free to reach out —
            I'd be happy to connect.
          </p>
        </section>

        <section className="links">
          <h2>Find Me Online</h2>
          <ul>
            <li><a href="https://x.com/IdkAnythin07" target="_blank" rel="noreferrer">Twitter</a></li>
            <li><a href="https://github.com/IdkAnythin07" target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href="https://t.me/IdkAnythin07" target="_blank" rel="noreferrer">Telegram</a></li>
            <li><a href="mailto:IdkAnythin07@proton.me">Email</a></li>
          </ul>
        </section>
      </main>
    </>
  );
}
