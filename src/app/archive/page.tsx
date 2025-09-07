import { Suspense } from 'react';
import { PostCard } from '@/components/PostCard';
import { getAllPosts, Post } from '@/lib/posts';
import { ArchiveClient } from '@/components/ArchiveClient';

export default function ArchivePage() {
  const allPosts = getAllPosts();
  
  return (
    <ArchiveClient posts={allPosts} />
  );
}
