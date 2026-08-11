import { Link } from 'react-router-dom';

export default function Secret() {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center min-h-[50vh] text-center space-y-8">
      <h1 className="text-4xl md:text-5xl font-bold text-mauve">You found the secret page!</h1>
      <p className="text-xl text-subtext">But there's nothing here yet...</p>
      
      <Link 
        to="/" 
        className="inline-block bg-surface0 hover:bg-surface1 text-text-main border border-surface1 hover:border-mauve px-8 py-3 rounded-md transition-colors shadow-sm font-medium"
      >
        Go Back Home
      </Link>
    </div>
  );
}
