export interface CardDataType {
  id: number;
  title: string;
  icon: string;
  description?: string;
}
export interface CardPositionConfig {
  opacity: number;
  scale: number;
  zIndex: number;
  isActive: boolean;
  showGradient: boolean;
  notchWidth: number;
  notchHeight: number;
  showCornerContent: boolean;
  growOnHover?: boolean;
  effect?: "hover" | "active" | "always";
  margin?: string;
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  translateY: number;
  height?: number;
  width?: number | string;
  topWithInfoPills?: boolean;
}

export interface CardProps {
  title?: string;
  description?: string;
  link?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;

  shapePosition?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  shapeEffect?: "hover" | "active" | "always";
  shapeProps?: Partial<{
    height?: number | string;
    width?: number | string;
    notchWidth: number;
    notchHeight: number;
    notchRadius: number;
    borderRadius: number;
  }>;
}
