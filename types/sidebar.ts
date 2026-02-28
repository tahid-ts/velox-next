import { ReactElement, MouseEvent } from "react";

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ElementType;
  href?: string;
  badge?: number | string;
  disabled?: boolean;
  subItems?: SidebarItem[];
  onClick?: (e: MouseEvent) => void;
}

export interface SidebarSection {
  id?: string;
  title?: string;
  items: SidebarItem[];
}

export interface SidebarUser {
  name: string;
  avatar: string;
}

export interface MobileSidebarControls {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

/* Props for the Sidebar component */
export interface SidebarProps {
  sections: SidebarSection[];
  activeItemId: string;
  onItemClick: (id: string, item: SidebarItem) => void;
  user?: SidebarUser;
  showProfile?: boolean;
  className?: string;
  header?: ReactElement;
  variant?: "default" | "compact" | "floating";
  showActiveIndicator?: boolean;
  hideOnDesktop?: boolean;
  mobileBreakpoint?: number;
}
