import { useParams, Link } from 'react-router-dom';
import Section from '../components/Section.jsx';

const samplePosts = {
  'summer-outreach': {
    title: 'Summer outreach & food distribution',
    body: [
      'Here you can share a full story about how Monte Sión Center served families during the summer.',
      'Describe the meals that were prepared, the volunteers who helped, and the ways God answered prayer.',
    ],
  },
  'missions-abroad': {
    title: 'Supporting missions abroad',
    body: [
      'Share details about missions trips and partnerships in other regions, including photos and testimonies.',
    ],
  },
  'holiday-blessing': {
    title: 'Holiday blessing project',
    body: [
      'Write about special holiday gatherings, gifts for children, and how the community came together.',
    ],
  },
};

export default function NewsArticle() {
  const { slug } = useParams();
  const post = slug && samplePosts[slug];

  if (!post) {
    return (
      <Section title="Story not found">
        <p className="text-sm text-slate-700">
          We couldn&apos;t find that story. Please return to the{' '}
          <Link to="/news" className="font-semibold text-slate-900 underline underline-offset-4">
            news page
          </Link>{' '}
          to view all updates.
        </p>
      </Section>
    );
  }

  return (
    <Section title={post.title} subtitle="Story">
      <div className="space-y-3 text-sm text-slate-700 leading-relaxed max-w-2xl">
        {post.body.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
      <p className="mt-8 text-xs text-slate-500">
        On the real site, you can connect this page to a CMS or simple JSON file to store real stories and photos.
      </p>
    </Section>
  );
}
