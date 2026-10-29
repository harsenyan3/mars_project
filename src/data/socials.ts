import type { ComponentType } from 'react';
import { Link } from 'lucide-react';
import { InstagramIcon, TikTokIcon } from '../components/common/SocialIcons';

export interface SocialLink {
  key: string;
  label: string;
  handle: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
}

export const socialLinks: SocialLink[] = [
  {
    key: 'instagram',
    label: 'Instagram',
    handle: '@marsprojectatl',
    href: 'https://instagram.com/marsprojectatl',
    Icon: InstagramIcon,
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    handle: '@marsprojectatl',
    href: 'https://tiktok.com/@marsprojectatl',
    Icon: TikTokIcon,
  },
  {
    key: 'links',
    label: 'All Links',
    handle: 'All Links',
    href: 'https://linktr.ee/marsprojectatl',
    Icon: Link,
  },
];
