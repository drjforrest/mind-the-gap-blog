"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { drawAiMetroLine } from '@/ai/flows/draw-ai-metro-line';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface MetroMapProps {
  categories: string[];
  tags: string[];
}

const lineColors = ['#003688', '#4CAF50', '#FFC107', '#9C27B0', '#795548'];

export function MetroMap({ categories, tags }: MetroMapProps) {
  const [aiLine, setAiLine] = useState<{ start: string; end: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const nodes = useMemo(() => {
    const nodeMap: Map<string, { x: number; y: number; type: 'category' | 'tag'; color: string; }> = new Map();
    const width = 800;
    const height = 400;

    categories.forEach((category, i) => {
      const y = (i + 1) * (height / (categories.length + 1));
      nodeMap.set(category, { x: 50, y, type: 'category', color: lineColors[i % lineColors.length] });
      
      const categoryTags = tags.filter(tag => tag.toLowerCase().includes(category.substring(0,2).toLowerCase()) || i === tags.indexOf(tag) % categories.length); // simple distribution logic
      categoryTags.forEach((tag, j) => {
        if(!nodeMap.has(tag)) {
            const x = 150 + j * ((width - 200) / Math.max(1, categoryTags.length-1));
            nodeMap.set(tag, { x, y, type: 'tag', color: lineColors[i % lineColors.length] });
        }
      });
    });

    // Place remaining tags
    let yIndex = 0;
    tags.forEach(tag => {
        if(!nodeMap.has(tag)) {
            const y = (yIndex + 1) * (height / (categories.length + 1));
            const existingOnLine = Array.from(nodeMap.values()).filter(n => n.y === y).length;
            const x = 150 + existingOnLine * 150;
            nodeMap.set(tag, { x, y: y+10, type: 'tag', color: '#888'});
            yIndex = (yIndex + 1) % categories.length;
        }
    })

    return nodeMap;
  }, [categories, tags]);

  useEffect(() => {
    async function getAiLine() {
      try {
        setLoading(true);
        const line = await drawAiMetroLine({ availableCategories: categories, availableTags: tags });
        if(nodes.has(line.start) && nodes.has(line.end)) {
            setAiLine(line);
        }
      } catch (error) {
        console.error("Failed to draw AI line:", error);
      } finally {
        setLoading(false);
      }
    }
    getAiLine();
  }, [categories, tags, nodes]);
  
  const aiLineCoords = useMemo(() => {
    if (!aiLine || !nodes.has(aiLine.start) || !nodes.has(aiLine.end)) return null;
    const startNode = nodes.get(aiLine.start);
    const endNode = nodes.get(aiLine.end);
    if (!startNode || !endNode) return null;
    return { x1: startNode.x, y1: startNode.y, x2: endNode.x, y2: endNode.y };
  }, [aiLine, nodes]);

  if (loading) {
    return <Skeleton className="w-full h-[400px]" />
  }

  return (
    <TooltipProvider>
      <div className="relative w-full">
        <svg viewBox="0 0 800 400" className="w-full h-auto" aria-labelledby="map-title" role="img">
          <title id="map-title">Interactive map of blog content</title>
          {/* Lines */}
          {categories.map((category, i) => {
              const lineNodes = Array.from(nodes.entries()).filter(([,node]) => node.y === nodes.get(category)?.y && node.type === 'tag');
              const categoryNode = nodes.get(category);
              if (!categoryNode) return null;
              
              const allNodes = [categoryNode, ...lineNodes.map(([name, node]) => node)].sort((a,b) => a.x-b.x);
              
              let pathData = `M ${allNodes[0].x} ${allNodes[0].y}`;

              // Revert to mostly straight lines, introduce curves at specific points
              for (let j = 0; j < allNodes.length - 1; j++) {
                const start = allNodes[j];
                const end = allNodes[j + 1];

                // Simple logic to introduce a curve around a hypothetical intersection area
                // This is a basic example and might need adjustment based on your actual node positions
                if (start.x < 400 && end.x > 400 && Math.abs(start.y - end.y) < 50) { // Check if crossing a vertical center line and nodes are relatively close vertically
                   const midX = (start.x + end.x) / 2;
                   const midY = (start.y + end.y) / 2;
                   // Create a gentle curve passing through the approximate center
                   pathData += ` Q ${midX} ${midY + (start.y < end.y ? 50 : -50)}, ${end.x} ${end.y}`;

                } else if (Math.abs(start.x - end.x) < 50 && start.y < 200 && end.y > 200) { // Check if crossing a horizontal center line and nodes are relatively close horizontally
                    const midX = (start.x + end.x) / 2;
                    const midY = (start.y + end.y) / 2;
                     // Create a gentle curve passing through the approximate center
                    pathData += ` Q ${midX + (start.x < end.x ? 50 : -50)} ${midY}, ${end.x} ${end.y}`;
                }
                
                else {
                  // Default to a straight line
                  pathData += ` L ${end.x} ${end.y}`;
                }
              }
              
              return (
                  <path
                    key={`line-${category}`}
                    d={pathData}
                    stroke={categoryNode.color}
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
              );
          })}

          {/* AI Line */}
          {aiLineCoords && (
            <path
              d={`M ${aiLineCoords.x1} ${aiLineCoords.y1} L ${aiLineCoords.x2} ${aiLineCoords.y2}`}
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5 5"
              className="animate-draw-line"
              style={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
            />
          )}

          {/* Nodes */}
          {Array.from(nodes.entries()).map(([name, { x, y, type, color }]) => (
            <Tooltip key={name}>
              <TooltipTrigger asChild>
                <Link href={`/archive?filter=${encodeURIComponent(name)}`} className="group" aria-label={`Find posts about ${name}`}>
                  <g transform={`translate(${x}, ${y})`}>
                    {type === 'category' ? (
                      <>
                        <rect x="-10" y="-10" width="20" height="20" fill="hsl(var(--background))" stroke={color} strokeWidth="3" rx="4" className="transition-transform group-hover:scale-110"/>
                        <text fill="hsl(var(--foreground))" x="-15" y="8" textAnchor="end" className="font-headline text-lg select-none" dominantBaseline="middle">{name}</text>
                      </>
                    ) : (
                      <>
                       <circle r="6" fill="hsl(var(--background))" stroke={color} strokeWidth="3" className="transition-transform group-hover:scale-125" />
                       <text fill="hsl(var(--foreground))" y="-12" textAnchor="middle" className="text-xs select-none">{name}</text>
                      </>
                    )}
                  </g>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Explore posts about "{name}"</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </svg>
        <div className="absolute bottom-2 right-2 flex items-center gap-2 text-sm text-muted-foreground bg-background/70 p-2 rounded-md">
            <Sparkles className="h-4 w-4 text-primary"/>
            <span>AI suggested route</span>
        </div>
      </div>
    </TooltipProvider>
  );
}
