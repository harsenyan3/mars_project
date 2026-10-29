import type { ReactNode } from 'react';
import './SectionTitle.css';

interface SectionTitleProps {
  as?: 'h2' | 'h3';
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
  children: ReactNode;
}

export function SectionTitle({
  as: Tag = 'h2',
  subtitle,
  align = 'center',
  className = '',
  children,
}: SectionTitleProps) {
  return (
    <div className={`section-heading section-heading--${align} ${className}`}>
      <Tag className={Tag === 'h2' ? 'section-title' : 'section-title section-title--sub'}>{children}</Tag>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
