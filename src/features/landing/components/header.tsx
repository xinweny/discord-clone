import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header>
      <img src="" alt="Discord Clone" />
      <div>
        <a href="">Demo</a>
        <a href="">Source Code</a>
      </div>
      <Link to="/login">
      </Link>
    </header>
  );
}