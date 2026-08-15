import type { ReactNode, HTMLAttributes } from 'react';
import { mergeClass } from '../../utils/classUtils';
import { containerBase } from '../../theme/classes';
import type { ContainerSize } from '../../constants/types';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  className?: string;
  children: ReactNode;
  flex?: boolean;
  grid?: boolean;
  justify?: 'center' | 'start' | 'end' | 'between';
  items?: 'center' | 'start' | 'end';
}

const sizeMap: Record<ContainerSize, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-6xl',
  lg: 'max-w-7xl',
  xl: 'max-w-8xl',
  full: 'max-w-full',
};

export function Container({
  size = 'lg',
  className,
  children,
  flex,
  grid,
  justify,
  items,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={mergeClass(
        containerBase,
        sizeMap[size],
        flex ? 'flex' : '',
        grid ? 'grid' : '',
        justify ? `justify-${justify}` : '',
        items ? `items-${items}` : '',
        className
      )}
      {...rest} // allows role, aria-* or other div props
    >
      {children}
    </div>
  );
}