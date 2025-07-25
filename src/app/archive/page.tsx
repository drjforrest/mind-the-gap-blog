"use client";

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PostCard } from '@/components/PostCard';
import { getAllPosts, Post } from '@/lib/posts';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

function ArchiveContent() {
  const allPosts = getAllPosts();
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get('filter') || '';

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  const allFilters = useMemo(() => {
    const categories = [...new Set(allPosts.map(p => p.category))];
    const tags = [...new Set(allPosts.flatMap(p => p.tags))];
    return ['All', ...categories, ...tags];
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesFilter = activeFilter === 'All' || 
                            activeFilter === '' || 
                            post.category === activeFilter || 
                            post.tags.includes(activeFilter);

      return matchesSearch && matchesFilter;
    });
  }, [allPosts, searchTerm, activeFilter]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tighter mb-4">Blog Archive</h1>
        <p className="text-muted-foreground">Browse all our articles or use the filters to find what you're looking for.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {allFilters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              activeFilter === filter 
                ? 'bg-primary text-primary-foreground border-primary' 
                : 'bg-transparent hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))
        ) : (
          <p className="md:col-span-2 lg:col-span-3 text-center text-muted-foreground">No posts found.</p>
        )}
      </div>
    </div>
  );
}

export default function ArchivePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ArchiveContent />
        </Suspense>
    )
}
