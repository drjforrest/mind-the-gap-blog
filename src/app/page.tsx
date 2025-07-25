import { MetroMap } from '@/components/MetroMap';
import { getAllCategories, getAllTags } from '@/lib/posts';

export default function Home() {
  const tags = getAllTags();
  const categories = getAllCategories();

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
        Mind the Gap: AI, Health, and Digital Equity
      </h1>
      <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
        Navigating the intersection of technology and fairness in health. Explore topics through our interactive map, ask questions, and discover AI-powered insights.
      </p>
      <div className="w-full max-w-6xl p-4 md:p-8 border rounded-lg shadow-lg bg-card">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Content Map</h2>
        <MetroMap categories={categories} tags={tags} />
      </div>
    </div>
  );
}
