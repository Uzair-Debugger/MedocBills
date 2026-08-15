import {
  Menu,
  X,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
  Shield,
  Activity,
  Clock,
  ChevronDown,
  Building2,
  Calendar,
  Search,
  MapPin,
  CheckCircle2,
  Users,
  Heart,
  Award,
  PhoneOutgoing,
  MessageSquare,
  Linkedin,
  Youtube,
} from 'lucide-react';

export type IconName =
  | 'Menu'
  | 'X'
  | 'Phone'
  | 'Mail'
  | 'Instagram'
  | 'Facebook'
  | 'Twitter'
  | 'ArrowRight'
  | 'MenuIcon'
  | 'Shield'
  | 'Activity'
  | 'Clock'
  | 'ChevronDown'
  | 'Building2'
  | 'Calendar'
  | 'Search'
  | 'MapPin'
  | 'CheckCircle2'
  | 'Users'
  | 'Heart'
  | 'Award'
  | 'PhoneOutgoing'
  | 'MessageSquare'
  | 'Linkedin'
  | 'Youtube';

export const IconComponents = {
  Menu,
  X,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
  MenuIcon: Menu,
  Shield,
  Activity,
  Clock,
  ChevronDown,
  Building2,
  Calendar,
  Search,
  MapPin,
  CheckCircle2,
  Users,
  Heart,
  Award,
  PhoneOutgoing,
  MessageSquare,
  Linkedin,
  Youtube,
} as const;

interface IconProps {
  name: IconName;
  size?: number;
  width?: number;
  height?: number;
  className?: string;
}

export const Icon = ({ name, size = 20, width, height, className }: IconProps) => {
  const LucideIcon = IconComponents[name];
  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  return <LucideIcon size={size} width={width} height={height} className={className} />;
};