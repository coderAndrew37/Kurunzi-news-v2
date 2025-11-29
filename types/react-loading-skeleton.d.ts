declare module "react-loading-skeleton" {
  import * as React from "react";

  export interface SkeletonProps {
    count?: number;
    duration?: number;
    width?: number | string;
    height?: number | string;
    circle?: boolean;
    containerClassName?: string;
    containerTestId?: string;
    style?: React.CSSProperties;
    className?: string;
    baseColor?: string;
    highlightColor?: string;
    enableAnimation?: boolean;
    borderRadius?: string | number;
  }

  const Skeleton: React.FC<SkeletonProps>;

  export default Skeleton;
}
