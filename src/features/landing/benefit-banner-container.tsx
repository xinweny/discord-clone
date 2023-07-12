import { BenefitBanner } from './benefit-banner';

const BENEFITS = [
  {
    id: 0,
    header: 'Create an invite-only place where you belong',
    body: 'Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.',
    img: { src: '#', alt: '' },
  },
  {
    id: 1,
    header: 'Where hanging out is easy',
    body: 'Grab a seat in a voice channel when you’re free. Friends in your server can see you’re around and instantly pop in to talk without having to call.',
    img: { src: '#', alt: '' },
  },
  {
    id: 2,
    header: 'From few to a fandom',
    body: 'Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.',
    img: { src: '#', alt: '' },
  },
];

export function BenefitBannerContainer() {
  return (
    <div>
      {BENEFITS.map(
        benefit => <BenefitBanner key={benefit.id} benefit={benefit} />
      )}
    </div>
  );
}