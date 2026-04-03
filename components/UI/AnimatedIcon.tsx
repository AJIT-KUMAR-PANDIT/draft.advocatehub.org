'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FolderOpen,
  FileEdit,
  Sparkles,
  Archive,
  Plus,
  HelpCircle,
  LogOut,
  Search,
  Bell,
  Settings,
  TrendingUp,
  Minus,
  BadgeCheck,
  TrendingDown,
  ArrowRight,
  MoreVertical,
  Home,
  FileText,
  User,
  FileSearch,
  Wand2,
  Save,
  Printer,
  ZoomIn,
  Mic,
  Pause,
  FileDown,
  FileType2,
  Scale,
  Paintbrush,
  ClipboardList,
  CheckSquare,
  CircleCheck,
  CircleAlert,
  Circle,
  ChevronDown,
  ArrowLeft,
  Lightbulb,
  HelpCircle as Help,
  type LucideIcon
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  folder_open: FolderOpen,
  edit_note: FileEdit,
  edit: FileEdit,
  auto_awesome: Sparkles,
  inventory_2: Archive,
  add: Plus,
  help_outline: HelpCircle,
  logout: LogOut,
  search: Search,
  notifications: Bell,
  settings: Settings,
  trending_up: TrendingUp,
  horizontal_rule: Minus,
  verified: BadgeCheck,
  trending_down: TrendingDown,
  arrow_forward: ArrowRight,
  more_vert: MoreVertical,
  home: Home,
  description: FileText,
  person: User,
  search_check: FileSearch,
  auto_fix: Wand2,
  auto_fix_high: Wand2,
  save: Save,
  print: Printer,
  zoom_in: ZoomIn,
  keyboard_voice: Mic,
  pause: Pause,
  picture_as_pdf: FileDown,
  format_paint: Paintbrush,
  summarize: ClipboardList,
  add_task: CheckSquare,
  done_all: CheckSquare,
  balance: Scale,
  check_circle: CircleCheck,
  error: CircleAlert,
  radio_button_unchecked: Circle,
  expand_more: ChevronDown,
  arrow_back: ArrowLeft,
  lightbulb: Lightbulb,
  help: Help,
};

// Map icons to specific bespoke hover animations
const getHoverAnimation = (iconKey: string) => {
  switch (iconKey) {
    case 'settings': return { rotate: 90, scale: 1.1 };
    case 'add': return { rotate: 180, scale: 1.2 };
    case 'notifications': return { rotate: [0, -15, 15, -15, 15, 0], scale: 1.1, transition: { duration: 0.5 } };
    case 'arrow_forward': return { x: 5, scale: 1.1 };
    case 'trending_up': return { y: -3, x: 3, scale: 1.1 };
    case 'trending_down': return { y: 3, x: 3, scale: 1.1 };
    case 'auto_awesome': 
    case 'auto_fix':
    case 'auto_fix_high': return { scale: 1.2, rotate: 15 };
    case 'folder_open': return { scale: 1.1, rotate: -5 };
    case 'keyboard_voice': return { scale: 1.2, rotate: [-5, 5, -5, 5, 0], transition: { duration: 0.5 } };
    case 'save':
    case 'print': return { scale: 1.15, y: -2 };
    default: return { scale: 1.15 };
  }
};

interface AnimatedIconProps {
  icon: string;
  className?: string; 
}

export default function AnimatedIcon({ icon, className = '' }: AnimatedIconProps) {
  const IconComponent = ICON_MAP[icon] || HelpCircle;
  
  // Strip the old font-family class so Lucide sizing renders natively
  const cleanClassName = className.replace('material-symbols-outlined', '').trim();

  return (
    <motion.div
      className={`inline-flex items-center justify-center ${cleanClassName}`}
      whileHover={getHoverAnimation(icon)}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <IconComponent strokeWidth={1.5} />
    </motion.div>
  );
}
