"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  MdExpandMore,
  MdChevronLeft,
  MdChevronRight,
  MdClose,
} from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import clsx from "clsx";

import Link from "next/link";
import Image from "next/image";
import { logo } from "@/data/data";
import { HiOutlineMenu } from "react-icons/hi";

// Type definitions (ensure these match your @/types/sidebar file)
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
  user?: {
    name: string;
    role?: string;
    avatar: string;
  };
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

interface StyleConfig {
  container: string;
  item: string;
  iconSize: number;
  width: string;
  collapsedWidth: string;
}

/* -------------------------
   Style configs
   ------------------------- */
const STYLE_CONFIGS: Record<SidebarVariant, StyleConfig> = {
  default: {
    container: "bg-white shadow-lg border border-gray-100",
    item: "px-4 py-3",
    iconSize: 18,
    width: "w-72",
    collapsedWidth: "w-20",
  },
  compact: {
    container: "bg-white shadow border border-gray-100",
    item: "px-3 py-2",
    iconSize: 16,
    width: "w-48",
    collapsedWidth: "w-16",
  },
  floating: {
    container: "bg-white shadow-xl border border-gray-200",
    item: "px-4 py-3",
    iconSize: 18,
    width: "w-64",
    collapsedWidth: "w-20",
  },
  fullscreen: {
    container: "bg-primary",
    item: "px-6 py-4",
    iconSize: 20,
    width: "w-full",
    collapsedWidth: "w-24",
  },
  "default-overlay": {
    container: "bg-white shadow-2xl border border-gray-200",
    item: "px-4 py-3",
    iconSize: 18,
    width: "w-90",
    collapsedWidth: "w-20",
  },
};

/* -------------------------
   Z-index scale (FIXED: Proper stacking hierarchy)
   ------------------------- */
const Z = {
  BASE: "z-10", // Page content baseline
  TOP: "z-30", // Header/navbar
  OVERLAY: "z-40", // Backdrop overlay
  SIDEBAR: "z-99", // Sidebar (topmost)
};

/* -------------------------
   Hooks
   ------------------------- */
const useMobileDetection = (breakpoint: number): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    update();

    let timeout: ReturnType<typeof setTimeout>;
    const throttled = () => {
      clearTimeout(timeout);
      timeout = setTimeout(update, 150);
    };

    window.addEventListener("resize", throttled);
    return () => {
      window.removeEventListener("resize", throttled);
      clearTimeout(timeout);
    };
  }, [breakpoint]);

  return isMobile;
};

const usePositionClasses = (position: SidebarPosition, isOpen: boolean) =>
  useMemo(
    () => ({
      mobile: {
        container: position === "left" ? "left-0" : "right-0",
        transform: isOpen
          ? "translate-x-0"
          : position === "left"
            ? "-translate-x-full"
            : "translate-x-full",
      },
      desktop: position === "left" ? "left-0" : "right-0",
      toggleBtn: position === "left" ? "left-4" : "right-4",
      collapseBtn: position === "left" ? "right-3.5" : "left-3.5",
    }),
    [position, isOpen],
  );

const useToggleDeskBtnClasses = (
  btnPos: SidebarProps["toggleDeskBtnPosition"] = "top-left",
  fixed = true,
) =>
  useMemo(() => {
    const map = {
      "top-left": "top-4 left-4",
      "top-center": "top-4 left-1/2 -translate-x-1/2",
      "top-right": "top-4 right-4",
      "bottom-left": "bottom-4 left-4",
      "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
      "bottom-right": "bottom-4 right-4",
    };
    return `${fixed ? "fixed" : "absolute"} ${map[btnPos]}`;
  }, [btnPos, fixed]);

const useSubmenuPosition = (sidebarPosition: SidebarPosition) =>
  useMemo(
    () =>
      sidebarPosition === "left"
        ? { floating: "left-full ml-2", indent: "pl-8" }
        : { floating: "right-full mr-2", indent: "pr-8" },
    [sidebarPosition],
  );

const useSlideAnimation = (
  isVisible: boolean,
  position: SidebarPosition,
  isFullScreen: boolean,
) =>
  useMemo(() => {
    if (isFullScreen) {
      return clsx(
        "transition-all duration-500 ease-out",
        isVisible
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-95 pointer-events-none",
      );
    }

    const baseTransition = "transition-all duration-300 ease-out";

    if (isVisible) {
      return clsx(
        baseTransition,
        "translate-x-0 opacity-100 pointer-events-auto",
      );
    } else {
      return clsx(
        baseTransition,
        position === "left" ? "-translate-x-full" : "translate-x-full",
        "opacity-0 pointer-events-none",
      );
    }
  }, [isVisible, position, isFullScreen]);

interface SubmenuState {
  isOpen: boolean;
  isAnimating: boolean;
  height: number;
}

/* Submenu manager */
const useSubmenuManager = (sections: SidebarSection[]) => {
  const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(null);
  const [submenuStates, setSubmenuStates] = useState<Map<string, SubmenuState>>(
    new Map(),
  );

  const submenuRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const initialSubmenuStates = useMemo(() => {
    const states = new Map<string, SubmenuState>();

    sections.forEach((section) => {
      section.items.forEach((item) => {
        if (item.subItems && item.subItems.length > 0) {
          states.set(item.id, {
            isOpen: false,
            isAnimating: false,
            height: 0,
          });
        }
      });
    });

    return states;
  }, [sections]);

  useEffect(() => {
    setSubmenuStates(initialSubmenuStates);
  }, [initialSubmenuStates]);

  const toggleSubmenu = useCallback((id: string) => {
    setOpenSubmenuId((prev) => (prev === id ? null : id));
  }, []);

  useEffect(() => {
    if (!openSubmenuId) {
      // Close all
      setSubmenuStates((prev) => {
        const next = new Map(prev);
        next.forEach((state, id) => {
          next.set(id, { ...state, isOpen: false, height: 0 });
        });
        return next;
      });
      return;
    }

    const el = submenuRefs.current.get(openSubmenuId);
    if (el) {
      setSubmenuStates((prev) => {
        const next = new Map(prev);
        // Open target
        next.set(openSubmenuId, {
          isOpen: true,
          isAnimating: false,
          height: el.scrollHeight,
        });
        // Close others
        next.forEach((_, id) => {
          if (id !== openSubmenuId) {
            next.set(id, { isOpen: false, height: 0, isAnimating: false });
          }
        });
        return next;
      });
    }
  }, [openSubmenuId]);

  return {
    openSubmenuId,
    submenuStates,
    submenuRefs,
    toggleSubmenu,
  };
};

const Sidebar_two: React.FC<SidebarProps> = (props) => {
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

  const { submenuStates, submenuRefs, toggleSubmenu } =
    useSubmenuManager(sections);

  const cfg = STYLE_CONFIGS[variant];
  const pos = usePositionClasses(position, isMobileOpen);
  const toggleDeskBtnCls = useToggleDeskBtnClasses(
    toggleDeskBtnPosition,
    toggleDeskBtnFixed,
  );
  const submenuPos = useSubmenuPosition(position);
  const isFullScreen = variant === "fullscreen" && toggleDesk;
  const slideAnimation = useSlideAnimation(
    isDesktopVisible,
    position,
    isFullScreen,
  );
  const hasOverlay = variant === "default-overlay" && isDesktopVisible;
  const widthCls = collapsed ? cfg.collapsedWidth : cfg.width;

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
          className="shrink-0 text-primary transition-transform duration-200 cursor-pointer w-5 h-5"
        />
      ) : null,
    [cfg.iconSize],
  );

  const renderBadge = useCallback(
    (badge?: number | string) =>
      badge !== undefined && badge !== null ? (
        <span className="ml-auto bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium min-w-5 text-center animate-pulse cursor-pointer">
          {badge}
        </span>
      ) : null,
    [],
  );

  const getItemClass = useCallback(
    (item: SidebarItem) => {
      const isActive = activeItemId === item.id;
      const base = `
        group flex items-center w-full text-sm rounded-lg ${cfg.item}
        transition-all duration-300 ease-out cursor-pointer ${itemClassName}
        ${collapsed ? "justify-center" : ""} 
      `;
      const state = item.disabled
        ? "opacity-50 cursor-not-allowed"
        : isActive
          ? showActiveIndicator
            ? `${activeItemClassName}`
            : activeItemClassName
          : "hover:text-gray-800 text-gray-600 hover:bg-gray-50";
      return clsx(base, state);
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
        const isOpen = subState?.isOpen;
        const itemCls = getItemClass(item);
        const indent = depth > 0 ? submenuPos.indent : "";

        const content = (
          <div
            className={`flex items-center justify-between w-full ${indent} transition-all duration-200 cursor-pointer`}
          >
            <div className="flex items-center gap-4">
              {renderIcon(item.icon)}
              {!collapsed && (
                <span className="truncate font-medium text-md">
                  {item.label}
                </span>
              )}
              {!collapsed && renderBadge(item.badge)}
            </div>
            {hasSub && !collapsed && (
              <MdExpandMore
                size={cfg.iconSize}
                className={clsx(
                  "transition-transform duration-300 ease-in-out",
                  isOpen && "rotate-180",
                )}
                aria-hidden
              />
            )}
          </div>
        );

        // Link if href exists and no submenu
        if (item.href && !hasSub) {
          return (
            <Link
              key={item.id}
              href={item.href}
              prefetch={true}
              className={itemCls}
            >
              {content}
            </Link>
          );
        }

        // Handle submenu
        if (hasSub) {
          return (
            <div key={item.id} className="relative group cursor-pointer">
              <button
                onClick={() => !item.disabled && toggleSubmenu(item.id)}
                disabled={item.disabled}
                className={itemCls}
                aria-expanded={!!isOpen}
                aria-controls={`submenu-${item.id}`}
              >
                {content}
              </button>

              {/* Submenu */}
              <div
                id={`submenu-${item.id}`}
                ref={(el) => {
                  if (el) submenuRefs.current.set(item.id, el);
                  else submenuRefs.current.delete(item.id);
                }}
                className={clsx(
                  "transition-all duration-300 ease-in-out overflow-hidden",
                  isOpen && !collapsed
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0",
                  isMobile ? "ml-8" : "ml-6",
                )}
                style={{
                  maxHeight: isOpen && !collapsed ? subState?.height || 0 : 0,
                }}
              >
                <div className=" py-2 pl-4 border-l-2 border-gray-100">
                  {item.subItems!.map((sub) =>
                    sub.href ? (
                      <Link
                        key={sub.id}
                        href={sub.href}
                        className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-600 hover:text-gray-900 transition-all duration-200"
                        prefetch={true}
                        onClick={() => onItemClick?.(sub.id, sub)}
                      >
                        {sub.icon && <sub.icon size={16} className="mr-3" />}
                        <span>{sub.label}</span>
                      </Link>
                    ) : (
                      <button
                        key={sub.id}
                        onClick={() =>
                          !sub.disabled && onItemClick?.(sub.id, sub)
                        }
                        disabled={sub.disabled}
                        className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-600 hover:text-gray-900 transition-all duration-200 w-full text-left"
                      >
                        {sub.icon && <sub.icon size={16} className="mr-3" />}
                        <span>{sub.label}</span>
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>
          );
        }

        // Default button fallback
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
      submenuPos,
      getItemClass,
      collapsed,
      renderIcon,
      renderBadge,
      cfg.iconSize,
      submenuRefs,
      onItemClick,
      toggleSubmenu,
      isMobile,
    ],
  );

  const renderSections = useCallback(
    (secs: SidebarSection[]) =>
      secs.map((section, idx) => (
        <div key={section.id ?? idx} className="">
          {!collapsed && section.title && (
            <div
              className={clsx(
                "text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2 transition-all duration-300",
                sectionTitleClassName,
              )}
            >
              {section.title}
            </div>
          )}
          <div className="">{renderItems(section.items)}</div>
        </div>
      )),
    [collapsed, sectionTitleClassName, renderItems],
  );

  /* Fullscreen renderers */
  const renderFullscreenItems = useCallback(
    (items: SidebarItem[]): React.ReactNode =>
      items.map((item) => {
        const hasSub = !!item.subItems?.length;
        const isOpen = submenuStates.get(item.id)?.isOpen;

        const content = (
          <div className="flex items-center w-full">
            <div className="flex items-center">
              {renderIcon(item.icon)}
              <span className="truncate font-medium">{item.label}</span>
              {renderBadge(item.badge)}
            </div>

            {hasSub && (
              <Image
                width={50}
                height={2}
                src={"/image/icon/ArrowWhite1.svg"}
                alt="arrow"
                className={clsx(
                  "transition-transform duration-300 ease-in-out mt-6 ml-0.5",
                  isOpen && "rotate-180",
                )}
              />
            )}
          </div>
        );

        if (item.href && !hasSub) {
          return (
            <Link
              key={item.id}
              href={item.href}
              className="block text-4xl font-cormorant text-white hover:text-gray-200 transition-colors duration-200"
              onClick={() => {
                onItemClick?.(item.id, item);
                setIsDesktopVisible(false);
              }}
              prefetch={true}
            >
              {content}
            </Link>
          );
        }

        if (hasSub) {
          return (
            <div key={item.id} className="relative">
              <button
                onClick={() => !item.disabled && toggleSubmenu(item.id)}
                disabled={item.disabled}
                className="text-4xl font-cormorant my-2 cursor-pointer text-black hover:text-gray-200 transition-colors duration-200"
              >
                {content}
              </button>

              <div
                ref={(el) => {
                  if (el) submenuRefs.current.set(item.id, el);
                  else submenuRefs.current.delete(item.id);
                }}
                className={clsx(
                  "transition-all duration-300 overflow-hidden scrollbar-thumb-gray-500 scrollbar-track-primary scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full",
                  isOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0",
                )}
              >
                {item.subItems?.map((sub) =>
                  sub.href ? (
                    <Link
                      key={sub.id}
                      href={sub.href}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-4xl ml-40 text-white hover:text-gray-200 font-medium cursor-pointer transition-colors duration-200"
                      onClick={() => {
                        onItemClick?.(sub.id, sub);
                        setIsDesktopVisible(false);
                      }}
                      prefetch={true}
                    >
                      {sub.icon && (
                        <sub.icon size={16} className="text-white" />
                      )}
                      <span>{sub.label}</span>
                    </Link>
                  ) : (
                    <button
                      key={sub.id}
                      onClick={() => {
                        onItemClick?.(sub.id, sub);
                        setIsDesktopVisible(false);
                      }}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-7xl ml-40 text-white hover:text-gray-200 font-medium transition-colors duration-200"
                    >
                      {sub.icon && (
                        <sub.icon size={16} className="text-white" />
                      )}
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
            className="text-4xl font-cormorant text-white hover:text-gray-200 transition-colors duration-200"
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
      setIsDesktopVisible,
    ],
  );

  const renderFullscreenSections = useCallback(
    (sections: SidebarSection[]): React.ReactNode =>
      sections.map((section) => (
        <div
          key={section.id}
          className="flex flex-col items-start gap-2 mb-8 last:mb-0 "
        >
          {section.title && (
            <div className="text-sm font-semibold text-gray-300 uppercase mb-2">
              {section.title}
            </div>
          )}
          {renderFullscreenItems(section.items)}
        </div>
      )),
    [renderFullscreenItems],
  );

  /* --------------------- Desktop Sidebar ----------------------- */
  const DesktopSidebar = useMemo(
    () => (
      <>
        {/* Overlay for default-overlay variant */}
        {hasOverlay && overlayClickClose && (
          <div
            className={clsx(
              Z.OVERLAY,
              "fixed inset-0 transition-all duration-300 will-change-opacity",
              isDesktopVisible
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none",
              overlayClassName,
            )}
            style={{
              backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})`,
            }}
            onClick={() => setIsDesktopVisible(false)}
          />
        )}

        <aside
          className={clsx(
            isFullScreen
              ? `fixed inset-0 ${Z.SIDEBAR} overflow-y-auto will-change-transform`
              : `fixed inset-y-0 ${widthCls} ${Z.SIDEBAR} will-change-transform`,
            cfg.container,
            containerClassName,
            className,
            "flex flex-col",
            position === "left" ? "left-0" : "right-0",
            slideAnimation,
            !isFullScreen && "shadow-xl",
          )}
        >
          <div className="flex justify-between p-4">
            <Link href="/">
              <div className="flex gap-2 cursor-pointer items-center">
                <Image
                  src={logo.logo1}
                  width={50}
                  height={25}
                  alt="logo"
                  className="object-contain"
                />
                <h1 className="text-2xl md:text-4xl font-bold text-black">
                  Velox
                </h1>
              </div>
            </Link>

            <button
              onClick={() => setIsDesktopVisible(false)}
              className="hover:opacity-80 transition-opacity duration-200"
              aria-label="Close sidebar"
            >
              <RxCross2 size={28} className="text-black cursor-pointer" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* Collapse toggle */}
            {collapsible && !isFullScreen && (
              <div
                className={clsx(
                  "absolute",
                  collapseTogglePosition === "top" ? "top-4" : "bottom-6",
                  pos.collapseBtn,
                )}
              >
                <button
                  onClick={toggleCollapse}
                  className={clsx(
                    "w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 ease-out hover:shadow-lg",
                    collapseToggleClassName,
                  )}
                  aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  {position === "left" ? (
                    collapsed ? (
                      <MdChevronRight className="text-gray-600" size={20} />
                    ) : (
                      <MdChevronLeft className="text-gray-600" size={20} />
                    )
                  ) : collapsed ? (
                    <MdChevronLeft className="text-gray-600" size={20} />
                  ) : (
                    <MdChevronRight className="text-gray-600" size={20} />
                  )}
                </button>
              </div>
            )}

            {/* User profile */}
            {showProfile && user && !isFullScreen && (
              <div
                className={clsx(
                  "p-4 border-b border-gray-200 flex items-center gap-4 transition-all duration-300 bg-white",
                  collapsed ? "justify-center" : "",
                  profileClassName,
                )}
              >
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={collapsed ? 40 : 48}
                  height={collapsed ? 40 : 48}
                  className="rounded-full ring-2 ring-gray-200 transition-all duration-300 object-cover cursor-pointer"
                />
                {!collapsed && (
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 truncate">
                      {user.name}
                    </p>
                    {user.role && (
                      <p className="text-sm text-gray-500 truncate">
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
                "flex-1 flex flex-col transition-all duration-500 ease-out overflow-y-auto p-4",
                collapsed ? "items-center" : "items-start",
                isFullScreen
                  ? "justify-center bg-primary text-black"
                  : "justify-start bg-white",
                navClassName,
              )}
            >
              {isFullScreen ? (
                <div className="flex flex-col items-center justify-start min-h-screen w-full px-6 py-12">
                  {/* Fullscreen Menu */}
                  <div className="w-full max-w-3xl mx-auto mt-10 text-black">
                    {renderFullscreenSections(sections)}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col w-full">
                  {renderSections(sections)}
                </div>
              )}
            </nav>
          </div>
        </aside>
      </>
    ),
    [
      hasOverlay,
      overlayClickClose,
      isDesktopVisible,
      overlayClassName,
      overlayOpacity,
      isFullScreen,
      widthCls,
      cfg.container,
      containerClassName,
      className,
      position,
      slideAnimation,
      collapsible,
      collapseTogglePosition,
      pos.collapseBtn,
      toggleCollapse,
      collapsed,
      collapseToggleClassName,
      showProfile,
      user,
      profileClassName,
      navClassName,
      renderFullscreenSections,
      sections,
      renderSections,
      setIsDesktopVisible,
    ],
  );

  /* --------------------- Mobile Sidebar ------------------------ */
  const MobileSidebar = useMemo(
    () => (
      <>
        {/* Header with proper z-index */}
        <div
          className={clsx(
            "flex items-center justify-between px-4 py-2  m-2 absolute top-0 left-0 right-0  pointer-events-auto",
            Z.TOP,
            `${toggleDeskNavCls ? "border-white" : "border-primary"}`,
          )}
        >
          <Link href="/" className="shrink-0 flex items-center gap-2">
            <Image
              src={logo.logo1}
              width={47}
              height={15}
              alt="Logo"
              style={{ height: "auto", width: "auto" }}
              className="object-contain"
            />
            <h1
              className={`text-2xl font-bold ${
                toggleDeskNavCls ? "text-white" : "text-primary"
              }`}
            >
              Velox
            </h1>
          </Link>
          <button
            onClick={mobileControls.onToggle}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-2 transition-transform duration-200 hover:scale-105"
          >
            {isMobileOpen ? (
              <MdClose size={30} className="text-black" />
            ) : (
              <HiOutlineMenu
                size={30}
                className={`${
                  toggleDeskNavCls ? "text-white" : "text-primary"
                }`}
              />
            )}
          </button>
        </div>

        {/* Overlay */}
        <div
          className={clsx(
            `${Z.OVERLAY} fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden will-change-opacity`,
            isMobileOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          )}
          onClick={mobileControls.onClose}
        />

        <aside
          className={clsx(
            `${Z.SIDEBAR} fixed top-0 h-screen w-4/5 max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out transform md:hidden will-change-transform`,
            "flex flex-col",
            pos.mobile.container,
            pos.mobile.transform,
          )}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-5 shrink-0 border-b border-gray-200">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={logo.logo1}
                width={47}
                height={15}
                alt="Logo"
                className="object-contain"
                style={{ height: "auto", width: "auto" }}
              />
              <h1 className="text-2xl font-bold text-primary">Velox</h1>
            </Link>
            <button
              onClick={mobileControls.onToggle}
              className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              aria-label="Close menu"
            >
              <MdClose size={30} className="text-gray-800" />
            </button>
          </div>

          {/* Scrollable Area */}
          <div className="flex-1 overflow-y-auto overscroll-contain py-4">
            {/* User Profile */}
            {showProfile && user && (
              <div className="px-5 py-6 border-b border-gray-200 bg-linear-to-r from-blue-50 to-transparent">
                <div className="flex items-center gap-4">
                  <Image
                    src={user.avatar || "/default-avatar.png"}
                    alt={user.name}
                    width={56}
                    height={56}
                    style={{ height: "auto", width: "auto" }}
                    className="rounded-full ring-4 ring-white shadow-md object-cover"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 truncate">
                      {user.name}
                    </p>
                    {user.role && (
                      <p className="text-sm text-gray-600 truncate">
                        {user.role}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Menu */}
            <nav className="py-4 px-4">{renderSections(sections)}</nav>
          </div>
        </aside>
      </>
    ),
    [
      toggleDeskNavCls,
      mobileControls,
      isMobileOpen,
      showProfile,
      user,
      renderSections,
      sections,
      pos.mobile.container,
      pos.mobile.transform,
    ],
  );

  /* --------------------- Final Render Logic (FIXED) -------------------- */
  if (isMobile) return MobileSidebar;

  if (toggleDesk) {
    return (
      <>
        {toggleDeskNavBar ? (
          <div className={clsx("relative", Z.TOP, "pointer-events-none")}>
            <div className="flex justify-center pointer-events-auto">
              <div
                className={clsx(
                  "flex justify-between items-center w-full absolute desktop-lg:max-w-380  desktop:min-w-330  laptop-xl:max-w-285 laptop-lg:max-w-240 laptop:max-w-180 tab:max-w-135  max-w-full   laptop:px-8 desktop-xl:mt-12.5 desktop-xl:px-11 bg-artboard desktop-lg:bg-transparent py-4 desktop-lg:py-4.5 border border-secondary rounded-xl",
                  Z.TOP,
                  `${toggleDeskNavCls ? "border-white" : "border-gray-600"}`,
                )}
              >
                <Link href={"/"} className="cursor-pointer">
                  <div className="flex  items-center cursor-pointer">
                    <Image
                      src={logo.logo1}
                      width={48}
                      height={48}
                      alt="logo"
                      className="object-contain h-12 w-12 cursor-pointer"
                    />
                    <span className="heading-lg text-white">elox</span>
                  </div>
                </Link>
                <div className={`flex gap-6.25 items-center ${Z.TOP} `}>
                  <div>
                    <h1 className="paragraph-md uppercase  text-white">Menu</h1>
                  </div>
                  <button
                    onClick={() => setIsDesktopVisible((p) => !p)}
                    aria-label={
                      isDesktopVisible ? "Hide sidebar" : "Show sidebar"
                    }
                    className={clsx(
                      "rounded-full h-10 w-10 flex justify-center items-center transition-all duration-300 ease-out cursor-pointer",
                      toggleDeskBtnClass,
                    )}
                  >
                    {isDesktopVisible
                      ? (toggleDeskIconClose ?? null)
                      : (toggleDeskIconOpen ?? (
                          <svg
                            width="30"
                            height="19"
                            viewBox="0 0 30 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M28.8349 2.11111L1.16505 2.11111C0.524272 2.11111 0 1.63611 0 1.05556C0 0.475 0.524272 0 1.16505 0L28.8349 0C29.4757 0 30 0.475 30 1.05556C30 1.63611 29.4757 2.11111 28.8349 2.11111ZM30 17.9444C30 17.3639 29.4757 16.8889 28.8349 16.8889H1.16505C0.524272 16.8889 0 17.3639 0 17.9444C0 18.525 0.524272 19 1.16505 19H28.8349C29.4757 19 30 18.525 30 17.9444ZM26.068 9.5C26.068 8.91945 25.5437 8.44444 24.9029 8.44444H5.09709C4.45631 8.44444 3.93204 8.91945 3.93204 9.5C3.93204 10.0806 4.45631 10.5556 5.09709 10.5556H24.9029C25.5437 10.5556 26.068 10.0806 26.068 9.5Z"
                              fill="#ffff"
                            />
                          </svg>
                        ))}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsDesktopVisible((p) => !p)}
            aria-label={isDesktopVisible ? "Hide sidebar" : "Show sidebar"}
            className={clsx(
              toggleDeskBtnCls,
              Z.TOP,
              "p-3 rounded-full transition-all duration-300 ease-out bg-white shadow-lg hover:shadow-xl hover:bg-gray-50 pointer-events-auto",
              toggleDeskBtnClass,
            )}
          >
            {isDesktopVisible ? (
              toggleDeskIconClose ? (
                toggleDeskIconClose
              ) : (
                <RxCross2 size={24} className="text-gray-700" />
              )
            ) : position === "left" ? (
              toggleDeskIconOpen ? (
                toggleDeskIconOpen
              ) : (
                <HiOutlineMenu size={24} className="text-gray-700" />
              )
            ) : toggleDeskIconOpen ? (
              toggleDeskIconOpen
            ) : (
              <HiOutlineMenu size={24} className="text-gray-700" />
            )}
          </button>
        )}

        {/* Overlay for fullscreen variant */}
        {isFullScreen && (
          <div
            className={clsx(
              `${Z.OVERLAY} fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 will-change-opacity`,
              isDesktopVisible
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none",
            )}
            onClick={() => setIsDesktopVisible(false)}
          />
        )}

        {/* FIX: Wrap DesktopSidebar in a container that controls visibility */}
        <div
          className={clsx(
            "fixed inset-0 pointer-events-none",
            Z.SIDEBAR,
            isDesktopVisible ? "opacity-100" : "opacity-0",
          )}
          style={{
            transition: "opacity 300ms ease-out",
          }}
        >
          {DesktopSidebar}
        </div>
      </>
    );
  }

  return hideOnDesk ? null : DesktopSidebar;
};

export default Sidebar_two;
