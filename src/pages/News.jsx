import { Link } from 'react-router-dom';
import Section from '../components/Section.jsx';

const samplePosts = [
  {
    slug: 'summer-outreach',
    title: 'Summer outreach & food distribution',
    date: 'July 2025',
    summary:
      'Sharing meals, backpacks, and prayer with families in East Los Angeles during the summer months.',
  },
  {
    slug: 'missions-abroad',
    title: 'Supporting missions abroad',
    date: 'May 2025',
    summary:
      'Partnering with local leaders in other regions to provide food, supplies, and spiritual support.',
  },
  {
    slug: 'holiday-blessing',
    title: 'Holiday blessing project',
    date: 'December 2024',
    summary:
      'Preparing special meals and gifts so families can experience joy and hope during the holidays.',
  },
];

export default function News() {
  return (
    <Section
      title="Stories &amp; updates"
      subtitle="News"
    >
      <p className="text-sm text-slate-700 max-w-2xl">
        Use this page to share testimonies, photos, and updates from food programs, missions trips,
        and special events. For now, here are sample posts you can replace with real stories.
      </p>

      <div className="mt-8 grid gap-4">
        {samplePosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-base font-semibold text-slate-900">
                <Link to={`/news/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h3>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                {post.date}
              </p>
            </div>
            <p className="mt-2 text-sm text-slate-700">{post.summary}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
