export default function Contact() {
  return (
    <>
      <p className="eyebrow">idkanythin07/contact</p>
      <h1>Let's Connect</h1>

      <main>
        <p className="lede">
          Whether you have a question, want to collaborate on a project,
          found a bug on the website, or simply want to say hello,
          my inbox is always open.
        </p>

        <section className="contact-form">
          <div className="window-bar">
            <span className="traffic">
              <span className="dot r"></span>
              <span className="dot y"></span>
              <span className="dot g"></span>
            </span>
            <span className="filename">compose_message.txt</span>
          </div>

          <form action="https://formspree.io/f/xjkgrkyy" method="POST">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" placeholder="John Doe" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" placeholder="john@example.com" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" placeholder="Write your message here..." required></textarea>
            </div>

            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </section>

        <section className="links" style={{ marginTop: '3rem' }}>
          <h2>Other Ways to Connect</h2>
          <ul className="contact-methods">
            <li><strong>Email:</strong> <a href="mailto:IdkAnythin07@proton.me">IdkAnythin07@proton.me</a></li>
            <li><strong>X (Twitter):</strong> <a href="https://x.com/IdkAnythin07" target="_blank" rel="noreferrer">@IdkAnythin07</a></li>
            <li><strong>GitHub:</strong> <a href="https://github.com/IdkAnythin07" target="_blank" rel="noreferrer">IdkAnythin07</a></li>
            <li><strong>Telegram:</strong> <a href="https://t.me/IdkAnythin07" target="_blank" rel="noreferrer">@IdkAnythin07</a></li>
          </ul>
        </section>
      </main>
    </>
  );
}
