import { Link } from 'react-router-dom';

export function FriendsLink() {
  return (
    <Link to="/channels/@me">
      <div>
        <img src="#" />
        <p>Friends</p>
      </div>
    </Link>
  );
}