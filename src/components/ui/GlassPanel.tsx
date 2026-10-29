import type { ReactNode } from 'react';
import './GlassPanel.css';

interface GlassPanelProps {
  className?: string;
  children: ReactNode;
}

/** Frosted, translucent surface — the site's basic "liquid glass" container. */
export function GlassPanel({ className = '', children }: GlassPanelProps) {
  return <div className={`glass-panel ${className}`}>{children}</div>;
}
