"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { MdExpandMore, MdClose } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { logo } from "@/data/data";
import { HiOutlineMenu } from "react-icons/hi";
import { LuUserRound } from "react-icons/lu";
import { RiMenu3Fill } from "react-icons/ri";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ElementType;
  href?: string;
  badge?: number | string;
  disabled?: boolean;
  subItems?: SidebarItem[];
}

interface SidebarSection {
  id?: string;
  title?: string;
  items: SidebarItem[];
}

type SidebarPosition = "left" | "right";
type SidebarVariant =
  | "default"
  | "compact"
  | "floating"
  | "fullscreen"
  | "default-overlay";

interface SidebarProps {
  sections: SidebarSection[];
  activeItemId?: string;
  onItemClick?: (id: string, item: SidebarItem) => void;
  user?: { name: string; role?: string; avatar: string };
  showProfile?: boolean;
  className?: string;
  containerClassName?: string;
  profileClassName?: string;
  navClassName?: string;
  sectionTitleClassName?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  submenuFloatingClassName?: string;
  collapseToggleClassName?: string;
  toggleDeskBtnClass?: string;
  toggleDeskBtnFixed?: boolean;
  variant?: SidebarVariant;
  showActiveIndicator?: boolean;
  hideOnDesk?: boolean;
  toggleDesk?: boolean;
  mobileBreakpoint?: number;
  position?: SidebarPosition;
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  toggleDeskNavBar?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
  sidebarLogo?: React.ReactNode;
  toggleDeskIconOpen?: React.ReactNode;
  toggleDeskIconClose?: React.ReactNode;
  toggleDeskNavCls?: boolean;
  collapseTogglePosition?: "top" | "bottom";
  toggleDeskBtnPosition?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  overlayClassName?: string;
  overlayOpacity?: number;
  overlayClickClose?: boolean;
}

interface MobileSidebarControls {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

interface SubmenuState {
  isOpen: boolean;
  height: number;
}

interface StyleConfig {
  container: string;
  item: string;
  iconSize: number;
  widthPx: number;
  collapsedWidthPx: number;
}

const STYLE_CONFIGS: Record<SidebarVariant, StyleConfig> = {
  default: {
    container: "bg-white border border-gray-100",
    item: "px-2 py-4",
    iconSize: 20,
    widthPx: 260,
    collapsedWidthPx: 80,
  },
  compact: {
    container: "bg-white  border border-gray-100",
    item: "px-3 py-2",
    iconSize: 16,
    widthPx: 192,
    collapsedWidthPx: 64,
  },
  floating: {
    container: "bg-white border border-gray-200",
    item: "px-4 py-3",
    iconSize: 18,
    widthPx: 256,
    collapsedWidthPx: 80,
  },
  fullscreen: {
    container: "bg-primary",
    item: "px-6 py-4",
    iconSize: 20,
    widthPx: 0,
    collapsedWidthPx: 0,
  },
  "default-overlay": {
    container: "bg-white border border-gray-200",
    item: "px-4 py-3",
    iconSize: 18,
    widthPx: 360,
    collapsedWidthPx: 80,
  },
};

// Z-index constants
const Z = {
  TOP: "z-30",
  OVERLAY: "z-40",
  SIDEBAR: "z-[99]",
};

interface TooltipPortalProps {
  label: string;
  anchorRef: React.RefObject<HTMLElement | null>;
  position: SidebarPosition;
  visible: boolean;
}

const TooltipPortal: React.FC<TooltipPortalProps> = ({
  label,
  anchorRef,
  position,
  visible,
}) => {
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const useIsClient = () =>
    React.useSyncExternalStore(
      () => () => {},
      () => true,
      () => false,
    );
  const isClient = useIsClient();

  useEffect(() => {
    if (!visible || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    setCoords({
      top: rect.top + rect.height / 2,
      left: position === "left" ? rect.right + 12 : rect.left - 12,
    });
  }, [visible, anchorRef, position]);

  if (!isClient || !visible) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: coords.top,
        left: position === "left" ? coords.left : undefined,
        right:
          position === "right" ? window.innerWidth - coords.left : undefined,
        transform: "translateY(-50%)",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      {/* Tooltip bubble */}
      <div className="relative bg-green text-white text-sm font-medium px-4 py-2 rounded-md  whitespace-nowrap font-plus_jakarta">
        {label}
        <span
          className={clsx(
            "absolute top-1/2 -translate-y-1/2 w-0 h-0",
            "border-t-4 border-b-4 border-t-transparent border-b-transparent",
            position === "left"
              ? "right-full border-r-4 border-r-gray-900"
              : "left-full border-l-4 border-l-gray-900",
          )}
        />
      </div>
    </div>,
    document.body,
  );
};

interface SidebarItemRowProps {
  item: SidebarItem;
  collapsed: boolean;
  position: SidebarPosition;
  iconNode: React.ReactNode;
  badgeNode: React.ReactNode;
  hasSub: boolean;
  isOpen: boolean;
  iconSize: number;
}

const SidebarItemRow: React.FC<SidebarItemRowProps> = ({
  item,
  collapsed,
  position,
  iconNode,
  badgeNode,
  hasSub,
  isOpen,
  iconSize,
}) => {
  const [hovered, setHovered] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3 min-w-0">
        {/* Anchor element — the tooltip positions itself relative to this */}
        <div
          ref={anchorRef}
          className="flex items-center justify-center"
          onMouseEnter={() => collapsed && setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {iconNode}

          {/* Portal tooltip — only active when sidebar is collapsed */}
          <TooltipPortal
            label={item.label}
            anchorRef={anchorRef as React.RefObject<HTMLElement | null>}
            position={position}
            visible={collapsed && hovered}
          />
        </div>

        {/* Label — visible only when expanded */}
        {!collapsed && (
          <span className="truncate font-medium">{item.label}</span>
        )}

        {/* Badge — visible only when expanded */}
        {!collapsed && badgeNode}
      </div>

      {/* Chevron for sub-items — visible only when expanded */}
      {hasSub && !collapsed && (
        <MdExpandMore
          size={iconSize}
          className={clsx(
            "shrink-0 transition-transform duration-300 ease-in-out",
            isOpen && "rotate-180",
          )}
          aria-hidden
        />
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────────────────────────

const useMobileDetection = (breakpoint: number): boolean => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < breakpoint);
    update();
    let t: ReturnType<typeof setTimeout>;
    const throttled = () => {
      clearTimeout(t);
      t = setTimeout(update, 150);
    };
    window.addEventListener("resize", throttled);
    return () => {
      window.removeEventListener("resize", throttled);
      clearTimeout(t);
    };
  }, [breakpoint]);
  return isMobile;
};

const useToggleDeskBtnClasses = (
  btnPos: SidebarProps["toggleDeskBtnPosition"] = "top-left",
  fixed = true,
) =>
  useMemo(() => {
    const map: Record<
      NonNullable<SidebarProps["toggleDeskBtnPosition"]>,
      string
    > = {
      "top-left": "top-4 left-4",
      "top-center": "top-4 left-1/2 -translate-x-1/2",
      "top-right": "top-4 right-4",
      "bottom-left": "bottom-4 left-4",
      "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
      "bottom-right": "bottom-4 right-4",
    };
    return `${fixed ? "fixed" : "absolute"} ${map[btnPos]}`;
  }, [btnPos, fixed]);

const useSubmenuManager = (sections: SidebarSection[]) => {
  const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(null);
  const [submenuStates, setSubmenuStates] = useState<Map<string, SubmenuState>>(
    new Map(),
  );
  const submenuRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

  const initialStates = useMemo(() => {
    const m = new Map<string, SubmenuState>();
    sections.forEach((s) =>
      s.items.forEach((item) => {
        if (item.subItems?.length) m.set(item.id, { isOpen: false, height: 0 });
      }),
    );
    return m;
  }, [sections]);

  useEffect(() => {
    setSubmenuStates(initialStates);
  }, [initialStates]);

  const toggleSubmenu = useCallback((id: string) => {
    setOpenSubmenuId((prev) => (prev === id ? null : id));
  }, []);

  useEffect(() => {
    setSubmenuStates((prev) => {
      const next = new Map(prev);
      next.forEach((_, id) => {
        const el = submenuRefs.current.get(id);
        if (!el) return;
        next.set(
          id,
          id === openSubmenuId
            ? { isOpen: true, height: el.scrollHeight }
            : { isOpen: false, height: 0 },
        );
      });
      return next;
    });
  }, [openSubmenuId]);

  return { submenuStates, submenuRefs, toggleSubmenu };
};

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

const Dashboard_Sidebar: React.FC<SidebarProps> = (props) => {
  const {
    sections,
    activeItemId,
    onItemClick,
    user,
    showProfile = true,
    className = "",
    containerClassName = "",
    profileClassName = "",
    navClassName = "",
    sectionTitleClassName = "",
    itemClassName = "",
    activeItemClassName = "bg-gray-100 text-gray-900 font-medium",
    collapseToggleClassName = "",
    toggleDeskBtnClass = "",
    toggleDeskBtnFixed = false,
    variant = "default",
    showActiveIndicator = true,
    hideOnDesk = false,
    toggleDesk = false,
    mobileBreakpoint = 768,
    position = "left",
    collapsible = false,
    collapsed: collapsedControlled,
    defaultCollapsed = false,
    toggleDeskNavBar = false,
    onCollapseChange,
    sidebarLogo,
    toggleDeskIconOpen,
    toggleDeskIconClose,
    toggleDeskNavCls = false,
    collapseTogglePosition = "top",
    toggleDeskBtnPosition = "top-left",
    overlayClassName = "",
    overlayOpacity = 50,
    overlayClickClose = true,
  } = props;

  const isMobile = useMobileDetection(mobileBreakpoint);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopVisible, setIsDesktopVisible] = useState(!hideOnDesk);
  const [collapsedInternal, setCollapsedInternal] = useState(defaultCollapsed);

  const collapsed =
    typeof collapsedControlled === "boolean"
      ? collapsedControlled
      : collapsedInternal;

  const cfg = STYLE_CONFIGS[variant];
  const isFullScreen = variant === "fullscreen" && toggleDesk;

  // ─── Width via inline style ───────────────────────────────────────────────
  // Swapping Tailwind w-* classes forces a layout reflow each toggle.
  // Using inline px values lets CSS interpolate on the compositor thread —
  // no reflow, no intermediate overflow, no scroll flash.
  const targetWidthPx = collapsed ? cfg.collapsedWidthPx : cfg.widthPx;

  const asideWidthStyle: React.CSSProperties = isFullScreen
    ? {}
    : {
        width: targetWidthPx,
        minWidth: targetWidthPx,
        maxWidth: targetWidthPx,
        // Only transition width — NOT "transition-all" which would conflict with
        // the translate/opacity slide animation on the same element.
        transition:
          "width 300ms ease-out, min-width 300ms ease-out, max-width 300ms ease-out",
        overflowX: "hidden",
      };

  // Keep overflow-x hidden on document for the entire collapsible lifetime.
  useLayoutEffect(() => {
    if (!collapsible || isFullScreen) return;
    const root = document.documentElement;
    const body = document.body;
    const prevRoot = root.style.overflowX;
    const prevBody = body.style.overflowX;
    root.style.overflowX = "hidden";
    body.style.overflowX = "hidden";
    return () => {
      root.style.overflowX = prevRoot;
      body.style.overflowX = prevBody;
    };
  }, [collapsible, isFullScreen]);

  const { submenuStates, submenuRefs, toggleSubmenu } =
    useSubmenuManager(sections);

  const toggleDeskBtnCls = useToggleDeskBtnClasses(
    toggleDeskBtnPosition,
    toggleDeskBtnFixed,
  );

  // Position helpers
  const mobileContainerCls = position === "left" ? "left-0" : "right-0";
  const mobileSlideCls = isMobileOpen
    ? "translate-x-0"
    : position === "left"
      ? "-translate-x-full"
      : "translate-x-full";
  const collapseBtnSide = position === "left" ? "right-3.5" : "left-3.5";
  const desktopSide = position === "left" ? "left-0" : "right-0";

  // Slide animation — specific properties only, NOT transition-all, to avoid
  // interfering with the width transition on the same element.
  const desktopSlideCls = isFullScreen
    ? clsx(
        "transition-[opacity,transform] duration-500 ease-out",
        isDesktopVisible
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-95 pointer-events-none",
      )
    : clsx(
        "transition-[opacity,transform] duration-300 ease-out",
        isDesktopVisible
          ? "translate-x-0 opacity-100 pointer-events-auto"
          : position === "left"
            ? "-translate-x-full opacity-0 pointer-events-none"
            : "translate-x-full opacity-0 pointer-events-none",
      );

  const mobileControls: MobileSidebarControls = useMemo(
    () => ({
      isOpen: isMobileOpen,
      onOpen: () => setIsMobileOpen(true),
      onClose: () => setIsMobileOpen(false),
      onToggle: () => setIsMobileOpen((p) => !p),
    }),
    [isMobileOpen],
  );

  const toggleCollapse = useCallback(() => {
    const next =
      typeof collapsedControlled === "boolean"
        ? !collapsedControlled
        : !collapsedInternal;
    if (typeof collapsedControlled === "boolean") {
      onCollapseChange?.(next);
    } else {
      setCollapsedInternal(next);
      onCollapseChange?.(next);
    }
  }, [collapsedControlled, collapsedInternal, onCollapseChange]);

  const renderIcon = useCallback(
    (Icon?: React.ElementType, size?: number) =>
      Icon ? (
        <Icon
          size={size ?? cfg.iconSize}
          className="text-emerald-900 shrink-0 w-5 h-5"
        />
      ) : null,
    [cfg.iconSize],
  );

  const renderBadge = useCallback(
    (badge?: number | string) =>
      badge != null ? (
        <span className="ml-auto bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-medium min-w-5 text-center animate-pulse shrink-0">
          {badge}
        </span>
      ) : null,
    [],
  );

  const getItemClass = useCallback(
    (item: SidebarItem) => {
      const isActive = activeItemId === item.id;
      return clsx(
        "flex items-center w-full text-sm rounded-lg",
        cfg.item,
        "transition-colors duration-200 cursor-pointer",
        itemClassName,
        collapsed && "justify-center",
        item.disabled
          ? "opacity-50 cursor-not-allowed"
          : isActive && showActiveIndicator
            ? activeItemClassName
            : "text-gray-600 hover:text-gray-800 hover:bg-gray-50",
      );
    },
    [
      activeItemId,
      cfg.item,
      itemClassName,
      collapsed,
      showActiveIndicator,
      activeItemClassName,
    ],
  );

  const renderItems = useCallback(
    (items: SidebarItem[], depth = 0): React.ReactNode =>
      items.map((item) => {
        const hasSub = !!item.subItems?.length;
        const subState = submenuStates.get(item.id);
        const isOpen = subState?.isOpen ?? false;
        const itemCls = getItemClass(item);
        const indent = depth > 0 ? (position === "left" ? "pl-8" : "pr-8") : "";

        // SidebarItemRow owns hover state + anchor ref for the portal tooltip.
        // It must be a real component — hooks (useRef, useState) cannot be
        // called inside a plain useCallback.
        const content = (
          <div className={clsx("w-full", indent)}>
            <SidebarItemRow
              item={item}
              collapsed={collapsed}
              position={position}
              iconNode={renderIcon(item.icon)}
              badgeNode={renderBadge(item.badge)}
              hasSub={hasSub}
              isOpen={isOpen}
              iconSize={cfg.iconSize}
            />
          </div>
        );

        if (item.href && !hasSub) {
          return (
            <Link
              key={item.id}
              href={item.href}
              prefetch
              className={itemCls}
              onClick={() => onItemClick?.(item.id, item)}
            >
              {content}
            </Link>
          );
        }

        if (hasSub) {
          return (
            <div key={item.id} className="w-full">
              <button
                onClick={() => !item.disabled && toggleSubmenu(item.id)}
                disabled={item.disabled}
                className={itemCls}
                aria-expanded={isOpen}
                aria-controls={`submenu-${item.id}`}
              >
                {content}
              </button>

              <div
                id={`submenu-${item.id}`}
                ref={(el) => {
                  if (el) submenuRefs.current.set(item.id, el);
                  else submenuRefs.current.delete(item.id);
                }}
                className="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out"
                style={{
                  maxHeight: isOpen && !collapsed ? (subState?.height ?? 0) : 0,
                  opacity: isOpen && !collapsed ? 1 : 0,
                }}
              >
                <div className="py-1 pl-4 ml-6 border-l-2 border-gray-100">
                  {item.subItems!.map((sub) =>
                    sub.href ? (
                      <Link
                        key={sub.id}
                        href={sub.href}
                        prefetch
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-150"
                        onClick={() => onItemClick?.(sub.id, sub)}
                      >
                        {sub.icon && (
                          <sub.icon size={15} className="shrink-0" />
                        )}
                        <span>{sub.label}</span>
                      </Link>
                    ) : (
                      <button
                        key={sub.id}
                        onClick={() =>
                          !sub.disabled && onItemClick?.(sub.id, sub)
                        }
                        disabled={sub.disabled}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-150 w-full text-left"
                      >
                        {sub.icon && (
                          <sub.icon size={15} className="shrink-0" />
                        )}
                        <span>{sub.label}</span>
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => !item.disabled && onItemClick?.(item.id, item)}
            disabled={item.disabled}
            className={itemCls}
          >
            {content}
          </button>
        );
      }),
    [
      submenuStates,
      getItemClass,
      collapsed,
      renderIcon,
      renderBadge,
      cfg.iconSize,
      submenuRefs,
      onItemClick,
      toggleSubmenu,
      position,
    ],
  );

  const renderSections = useCallback(
    (secs: SidebarSection[]) =>
      secs.map((section, idx) => (
        <div key={section.id ?? idx} className="mb-2">
          {!collapsed && section.title && (
            <div
              className={clsx(
                "text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2",
                sectionTitleClassName,
              )}
            >
              {section.title}
            </div>
          )}
          <div className="space-y-0.5">{renderItems(section.items)}</div>
        </div>
      )),
    [collapsed, sectionTitleClassName, renderItems],
  );

  // ── Fullscreen renderers ──────────────────────────────────────────────────

  const renderFullscreenItems = useCallback(
    (items: SidebarItem[]): React.ReactNode =>
      items.map((item) => {
        const hasSub = !!item.subItems?.length;
        const isOpen = submenuStates.get(item.id)?.isOpen ?? false;

        const content = (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              {renderIcon(item.icon)}
              <span className="truncate font-medium">{item.label}</span>
              {renderBadge(item.badge)}
            </div>
            {hasSub && (
              <MdExpandMore
                size={24}
                className={clsx(
                  "shrink-0 transition-transform duration-300 ease-in-out text-white",
                  isOpen && "rotate-180",
                )}
                aria-hidden
              />
            )}
          </div>
        );

        if (item.href && !hasSub) {
          return (
            <Link
              key={item.id}
              href={item.href}
              prefetch
              className="block text-4xl font-cormorant text-white hover:text-white/70 transition-colors duration-200 my-2"
              onClick={() => {
                onItemClick?.(item.id, item);
                setIsDesktopVisible(false);
              }}
            >
              {content}
            </Link>
          );
        }

        if (hasSub) {
          return (
            <div key={item.id} className="w-full">
              <button
                onClick={() => !item.disabled && toggleSubmenu(item.id)}
                disabled={item.disabled}
                className="text-4xl font-cormorant text-white hover:text-white/70 transition-colors duration-200 my-2 w-full text-left"
              >
                {content}
              </button>
              <div
                ref={(el) => {
                  if (el) submenuRefs.current.set(item.id, el);
                  else submenuRefs.current.delete(item.id);
                }}
                className="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out"
                style={{
                  maxHeight: isOpen
                    ? (submenuStates.get(item.id)?.height ?? 0)
                    : 0,
                  opacity: isOpen ? 1 : 0,
                }}
              >
                {item.subItems?.map((sub) =>
                  sub.href ? (
                    <Link
                      key={sub.id}
                      href={sub.href}
                      prefetch
                      className="flex items-center gap-3 px-3 py-2 ml-10 text-2xl font-cormorant text-white/80 hover:text-white transition-colors duration-200"
                      onClick={() => {
                        onItemClick?.(sub.id, sub);
                        setIsDesktopVisible(false);
                      }}
                    >
                      {sub.icon && <sub.icon size={16} />}
                      <span>{sub.label}</span>
                    </Link>
                  ) : (
                    <button
                      key={sub.id}
                      onClick={() => {
                        onItemClick?.(sub.id, sub);
                        setIsDesktopVisible(false);
                      }}
                      className="flex items-center gap-3 px-3 py-2 ml-10 text-2xl font-cormorant text-white/80 hover:text-white transition-colors duration-200 w-full text-left"
                    >
                      {sub.icon && <sub.icon size={16} />}
                      <span>{sub.label}</span>
                    </button>
                  ),
                )}
              </div>
            </div>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => {
              onItemClick?.(item.id, item);
              setIsDesktopVisible(false);
            }}
            disabled={item.disabled}
            className="text-4xl font-cormorant text-white hover:text-white/70 transition-colors duration-200 my-2 w-full text-left"
          >
            {content}
          </button>
        );
      }),
    [
      submenuStates,
      renderIcon,
      renderBadge,
      onItemClick,
      toggleSubmenu,
      submenuRefs,
    ],
  );

  const renderFullscreenSections = useCallback(
    (secs: SidebarSection[]) =>
      secs.map((section) => (
        <div key={section.id} className="flex flex-col gap-1 mb-8 last:mb-0">
          {section.title && (
            <div className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-2">
              {section.title}
            </div>
          )}
          {renderFullscreenItems(section.items)}
        </div>
      )),
    [renderFullscreenItems],
  );

  // ─────────────────────────────────────────────────────────────────────────
  // Desktop Sidebar
  // ─────────────────────────────────────────────────────────────────────────

  const DesktopSidebar = (
    <>
      {/* Overlay for default-overlay variant */}
      {variant === "default-overlay" && overlayClickClose && (
        <div
          className={clsx(
            "fixed inset-0 transition-opacity duration-300",
            Z.OVERLAY,
            isDesktopVisible
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
            overlayClassName,
          )}
          style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity / 100})` }}
          onClick={() => setIsDesktopVisible(false)}
        />
      )}

      <aside
        className={clsx(
          "fixed inset-y-0 flex flex-col",
          Z.SIDEBAR,
          desktopSide,

          desktopSlideCls,
          isFullScreen ? "inset-0 overflow-y-auto" : " overflow-hidden",
          cfg.container,
          containerClassName,
          className,
        )}
        style={isFullScreen ? undefined : asideWidthStyle}
      >
        {/* ── Header ── */}
        {!isFullScreen && (
          <div className="flex items-center justify-center shrink-0 p-5 border-b border-gray-100">
            <Link href="/" className="flex items-end  min-w-0">
              {!collapsed ? (
                <Image
                  src={logo.logo2}
                  width={100}
                  height={35}
                  alt="logo"
                  className="object-contain shrink-0"
                />
              ) : (
                <Image
                  src={logo.logo1}
                  width={80}
                  height={55}
                  alt="logo"
                  className="object-contain shrink-0"
                />
              )}
            </Link>

            {collapsible && collapseTogglePosition === "top" && (
              <button
                onClick={toggleCollapse}
                className={clsx(
                  "shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ml-2",
                  "hover:bg-gray-200 transition-colors duration-200",
                  collapseToggleClassName,
                )}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <RiMenu3Fill className="text-gray-600" size={18} />
              </button>
            )}

            {/* Close button for non-collapsible toggled sidebar */}
            {!collapsible && toggleDesk && (
              <button
                onClick={() => setIsDesktopVisible(false)}
                className="shrink-0 p-1 hover:opacity-70 transition-opacity duration-200 ml-2"
                aria-label="Close sidebar"
              >
                <RxCross2 size={24} className="text-gray-700" />
              </button>
            )}
          </div>
        )}

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {/* User profile */}
          {showProfile && user && !isFullScreen && (
            <div
              className={clsx(
                "p-4 border-b border-gray-100 flex items-center gap-3 transition-all duration-300",
                collapsed && "justify-center",
                profileClassName,
              )}
            >
              <Image
                src={user.avatar}
                alt={user.name}
                width={collapsed ? 38 : 44}
                height={collapsed ? 38 : 44}
                className="rounded-full ring-2 ring-gray-200 object-cover shrink-0"
              />
              {!collapsed && (
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">
                    {user.name}
                  </p>
                  {user.role && (
                    <p className="text-xs text-gray-500 truncate">
                      {user.role}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <nav
            className={clsx(
              "p-3",
              collapsed && "flex flex-col items-center",
              navClassName,
            )}
          >
            {isFullScreen ? (
              <div className="flex flex-col items-center justify-start min-h-screen w-full px-6 py-12">
                <div className="flex w-full max-w-2xl justify-between items-center mb-12">
                  {sidebarLogo ?? (
                    <>
                      <Link
                        href="/"
                        className="flex gap-3 items-center cursor-pointer"
                      >
                        <Image
                          src={logo.logo1}
                          width={60}
                          height={30}
                          alt="logo"
                          className="object-contain"
                        />
                        <h1 className="text-4xl md:text-6xl font-bold text-white">
                          Velox
                        </h1>
                      </Link>
                      <button
                        onClick={() => setIsDesktopVisible(false)}
                        className="hover:opacity-70 transition-opacity duration-200"
                        aria-label="Close fullscreen menu"
                      >
                        <RxCross2 size={40} className="text-white" />
                      </button>
                    </>
                  )}
                </div>
                <div className="w-full max-w-2xl">
                  {renderFullscreenSections(sections)}
                </div>
              </div>
            ) : (
              renderSections(sections)
            )}
          </nav>
        </div>
      </aside>

      {collapsible && !isFullScreen && collapseTogglePosition === "bottom" && (
        <button
          onClick={toggleCollapse}
          style={{
            [position === "left" ? "left" : "right"]: targetWidthPx,
            transition: "left 300ms ease-out, right 300ms ease-out",
          }}
          className={clsx(
            "fixed bottom-6 w-8 h-8 rounded-full bg-white ",
            "flex items-center justify-center",
            " transition-shadow duration-300",
            position === "left" ? "-translate-x-1/2" : "translate-x-1/2",
            collapseBtnSide,
            Z.SIDEBAR,
            collapseToggleClassName,
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <RiMenu3Fill className="text-gray-600" size={18} />
        </button>
      )}
    </>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // Mobile Sidebar
  // ─────────────────────────────────────────────────────────────────────────

  const MobileSidebar = (
    <>
      {/* Mobile header bar */}
      <div
        className={clsx(
          "fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-3 pointer-events-auto",
          Z.TOP,
        )}
      >
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo.logo1}
            width={40}
            height={20}
            alt="Logo"
            className="object-contain"
          />
          <h1
            className={clsx(
              "text-xl font-bold",
              toggleDeskNavCls ? "text-white" : "text-gray-900",
            )}
          >
            Velox
          </h1>
        </Link>
        <button
          onClick={mobileControls.onToggle}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          className="p-2 rounded-md hover:bg-black/10 transition-colors duration-200"
        >
          {isMobileOpen ? (
            <MdClose size={26} className="text-gray-800" />
          ) : (
            <HiOutlineMenu
              size={26}
              className={toggleDeskNavCls ? "text-white" : "text-gray-800"}
            />
          )}
        </button>
      </div>

      {/* Backdrop */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          Z.OVERLAY,
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={mobileControls.onClose}
      />

      {/* Drawer */}
      <aside
        className={clsx(
          "fixed top-0 h-screen w-[80vw] max-w-[320px] bg-white  flex flex-col",
          "transition-transform duration-300 ease-out",
          Z.SIDEBAR,
          mobileContainerCls,
          mobileSlideCls,
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 shrink-0 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logo.logo1}
              width={40}
              height={20}
              alt="Logo"
              className="object-contain"
            />
            <h1 className="text-xl font-bold text-gray-900">Velox</h1>
          </Link>
          <button
            onClick={mobileControls.onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Close menu"
          >
            <MdClose size={24} className="text-gray-700" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          {showProfile && user && (
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-3">
                <Image
                  src={user.avatar || "/default-avatar.png"}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="rounded-full ring-2 ring-white object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">
                    {user.name}
                  </p>
                  {user.role && (
                    <p className="text-xs text-gray-500 truncate">
                      {user.role}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          <nav className="p-3">{renderSections(sections)}</nav>
        </div>
      </aside>
    </>
  );

  // ─────────────────────────────────────────────────────────────────────────
  // Final render
  // ─────────────────────────────────────────────────────────────────────────

  if (isMobile) return MobileSidebar;

  if (toggleDesk) {
    return (
      <>
        {toggleDeskNavBar ? (
          <div
            className={clsx(
              "fixed top-0 left-0 right-0 pointer-events-none",
              Z.TOP,
            )}
          >
            <div
              className={clsx(
                "flex justify-between items-center w-full px-6 py-4 pointer-events-auto",
                toggleDeskNavCls ? "border-white/20" : "border-gray-200",
              )}
            >
              <Link href="/" className="flex gap-2 items-center cursor-pointer">
                <Image
                  src={logo.logo1}
                  width={44}
                  height={44}
                  alt="logo"
                  className="object-contain h-10 w-10"
                />
              </Link>
              <div className="flex gap-4 items-center">
                <LuUserRound className="w-8 h-8 p-1" />
                <button
                  onClick={() => setIsDesktopVisible((p) => !p)}
                  aria-label={
                    isDesktopVisible ? "Hide sidebar" : "Show sidebar"
                  }
                  className={clsx(
                    "rounded-full h-10 w-10 flex justify-center items-center transition-all duration-300 cursor-pointer",
                    toggleDeskBtnClass,
                  )}
                >
                  {isDesktopVisible
                    ? (toggleDeskIconClose ?? (
                        <RxCross2 size={24} className="text-gray-700" />
                      ))
                    : (toggleDeskIconOpen ?? (
                        <svg
                          width="28"
                          height="18"
                          viewBox="0 0 30 19"
                          fill="none"
                        >
                          <path
                            d="M28.8349 2.11111L1.16505 2.11111C0.524272 2.11111 0 1.63611 0 1.05556C0 0.475 0.524272 0 1.16505 0L28.8349 0C29.4757 0 30 0.475 30 1.05556C30 1.63611 29.4757 2.11111 28.8349 2.11111ZM30 17.9444C30 17.3639 29.4757 16.8889 28.8349 16.8889H1.16505C0.524272 16.8889 0 17.3639 0 17.9444C0 18.525 0.524272 19 1.16505 19H28.8349C29.4757 19 30 18.525 30 17.9444ZM26.068 9.5C26.068 8.91945 25.5437 8.44444 24.9029 8.44444H5.09709C4.45631 8.44444 3.93204 8.91945 3.93204 9.5C3.93204 10.0806 4.45631 10.5556 5.09709 10.5556H24.9029C25.5437 10.5556 26.068 10.0806 26.068 9.5Z"
                            fill="currentColor"
                          />
                        </svg>
                      ))}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsDesktopVisible((p) => !p)}
            aria-label={isDesktopVisible ? "Hide sidebar" : "Show sidebar"}
            className={clsx(
              "fixed p-3 rounded-full bg-white  hover:bg-gray-50 transition-all duration-300 pointer-events-auto",
              Z.TOP,
              toggleDeskBtnCls,
              toggleDeskBtnClass,
            )}
          >
            {isDesktopVisible
              ? (toggleDeskIconClose ?? (
                  <RxCross2 size={22} className="text-gray-700" />
                ))
              : (toggleDeskIconOpen ?? (
                  <HiOutlineMenu size={22} className="text-gray-700" />
                ))}
          </button>
        )}

        {isFullScreen && (
          <div
            className={clsx(
              "fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500",
              Z.OVERLAY,
              isDesktopVisible
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none",
            )}
            onClick={() => setIsDesktopVisible(false)}
          />
        )}

        {DesktopSidebar}
      </>
    );
  }

  return hideOnDesk ? null : DesktopSidebar;
};

export default Dashboard_Sidebar;
