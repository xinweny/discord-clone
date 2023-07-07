import { RestrictedLinkButton } from '@common/components/ui';
import { DemoButton } from './demo-button';

export function HeadlineBanner() {
  return (
    <div>
      <h1>Imagine A Place...</h1>
      <p>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
      <RestrictedLinkButton to="/register">Sign up</RestrictedLinkButton>
      <DemoButton />
    </div>
  );
}