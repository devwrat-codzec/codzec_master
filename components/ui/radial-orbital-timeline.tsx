'use client';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: 'completed' | 'in-progress' | 'pending';
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const getRelatedItems = (itemId: number): number[] => {
    const item = timelineData.find((i) => i.id === itemId);
    return item ? item.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const toggleItem = (id: number) => {
    const isCurrentlyOpen = expandedItems[id];

    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      Object.keys(prev).forEach((key) => { newState[parseInt(key)] = false; });
      newState[id] = !isCurrentlyOpen;
      return newState;
    });

    if (!isCurrentlyOpen) {
      setActiveNodeId(id);
      setAutoRotate(false);
      const relatedItems = getRelatedItems(id);
      const newPulse: Record<number, boolean> = {};
      relatedItems.forEach((relId) => { newPulse[relId] = true; });
      setPulseEffect(newPulse);
      centerViewOnNode(id);
    } else {
      setActiveNodeId(null);
      setAutoRotate(true);
      setPulseEffect({});
    }
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  useEffect(() => {
    if (!autoRotate) return;
    const timer = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(timer);
  }, [autoRotate]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, angle, zIndex, opacity };
  };

  const getStatusColor = (status: TimelineItem['status']) => {
    switch (status) {
      case 'completed': return 'bg-[#50d5b7]/20 text-[#50d5b7] border-[#50d5b7]/40';
      case 'in-progress': return 'bg-[#ff9f43]/20 text-[#ff9f43] border-[#ff9f43]/40';
      default: return 'bg-white/5 text-[#c8c9d5] border-white/10';
    }
  };

  return (
    <div
      className="w-full h-[600px] flex items-center justify-center relative"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div
        ref={orbitRef}
        className="absolute w-full h-full flex items-center justify-center"
        style={{
          perspective: '1000px',
          transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
        }}
      >
        {/* Central hub */}
        <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-[#50d5b7] via-[#3dc4a8] to-[#ff9f43] animate-pulse flex items-center justify-center z-10 shadow-[0_0_30px_rgba(80,213,183,0.35)]">
          <div className="absolute w-24 h-24 rounded-full border border-[#50d5b7]/20 animate-ping opacity-30" />
          <div className="absolute w-32 h-32 rounded-full border border-[#50d5b7]/10 animate-ping opacity-20" style={{ animationDelay: '0.5s' }} />
          <span className="text-[10px] font-bold text-[#041013] text-center leading-none">AI</span>
        </div>

        {/* Orbit ring */}
        <div className="absolute w-[416px] h-[416px] rounded-full border border-[#50d5b7]/10" />

        {timelineData.map((item, index) => {
          const position = calculateNodePosition(index, timelineData.length);
          const isExpanded = !!expandedItems[item.id];
          const isRelated = isRelatedToActive(item.id);
          const isPulsing = !!pulseEffect[item.id];
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              ref={(el) => { nodeRefs.current[item.id] = el; }}
              className="absolute cursor-pointer"
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isExpanded ? 200 : position.zIndex,
                opacity: isExpanded ? 1 : position.opacity,
                transition: autoRotate ? 'none' : 'transform 0.7s ease, opacity 0.4s ease',
              }}
              onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
            >
              {isPulsing && (
                <div
                  className="absolute rounded-full animate-pulse pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(80,213,183,0.2) 0%, transparent 70%)',
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${item.energy * 0.25}px`,
                    top: `-${item.energy * 0.25}px`,
                  }}
                />
              )}

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isExpanded
                    ? 'bg-[#50d5b7] text-[#041013] border-[#50d5b7] shadow-[0_0_20px_rgba(80,213,183,0.5)] scale-150'
                    : isRelated
                    ? 'bg-[#50d5b7]/20 text-[#50d5b7] border-[#50d5b7] animate-pulse'
                    : 'bg-[#0c0f18] text-[#c8c9d5] border-white/20 hover:border-[#50d5b7]/50'
                }`}
              >
                <Icon size={16} />
              </div>

              <div
                className={`absolute top-12 whitespace-nowrap text-xs font-semibold tracking-wider transition-colors duration-300 ${
                  isExpanded ? 'text-[#50d5b7]' : 'text-[#c8c9d5]'
                }`}
                style={{ left: '50%', transform: isExpanded ? 'translateX(-50%) scale(1.25)' : 'translateX(-50%)' }}
              >
                {item.title}
              </div>

              {isExpanded && (
                <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-[rgba(12,15,24,0.95)] backdrop-blur-lg border-[#50d5b7]/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-[#50d5b7]/50" />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className={getStatusColor(item.status)}>
                        {item.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-sm text-[#f7f8fb] mt-2">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs text-[#c8c9d5]">
                    <p>{item.content}</p>
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="flex items-center text-[#c8c9d5]">
                          <Zap size={10} className="mr-1 text-[#ff9f43]" />
                          Expertise
                        </span>
                        <span className="font-mono text-[#50d5b7]">{item.energy}%</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#50d5b7] to-[#74f2d6]" style={{ width: `${item.energy}%` }} />
                      </div>
                    </div>
                    {item.relatedIds.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-[10px] uppercase tracking-wider font-medium text-[#c8c9d5] mb-2">Related services</p>
                        <div className="flex flex-wrap gap-1">
                          {item.relatedIds.slice(0, 3).map(relId => {
                            const rel = timelineData.find(i => i.id === relId);
                            return (
                              <Button
                                key={relId}
                                variant="outline"
                                size="sm"
                                className="flex items-center h-6 px-2 py-0 text-[10px] rounded-full border-[#50d5b7]/20 bg-transparent hover:bg-[#50d5b7]/10 text-[#c8c9d5] hover:text-[#50d5b7] transition-all"
                                onClick={(e) => { e.stopPropagation(); toggleItem(relId); }}
                              >
                                {rel?.title}
                                <ArrowRight size={8} className="ml-1" />
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
