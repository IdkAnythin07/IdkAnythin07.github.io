import { Link } from 'react-router-dom';

export default function Secret() {
  return (
    <div style={{ textAlign: 'center', marginTop: '10vh' }}>
      <h1>You found the secret page!</h1>
      <p style={{ marginTop: '20px' }}>But there's nothing here yet...</p>
      <Link to="/" className="submit-btn" style={{ marginTop: '40px', display: 'inline-block', textDecoration: 'none' }}>
        Go Back Home
      </Link>
    </div>
  );
}
