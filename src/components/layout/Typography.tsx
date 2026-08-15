import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { mergeClass } from '../../utils/classUtils';
import type { TypographyVariant } from '../../constants/types';

interface TypographyProps<T extends ElementType> {
  as?: T;
  size?: string;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  variant?: TypographyVariant;
  color?: 'primary' | 'secondary' | 'white' | 'gray' | 'white/90' | string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<TypographyVariant, string> = {
  h1: 'text-4xl md:text-5xl font-bold tracking-tight',
  h2: 'text-3xl md:text-5xl font-bold tracking-tight',
  h3: 'text-3xl font-semibold tracking-tight',
  h4: 'text-2xl font-semibold tracking-tight',
  h5: 'text-xl font-semibold tracking-tight',
  p: ' leading-relaxed text-lg',
  small: 'text-sm leading-relaxed',
  label: 'text-sm font-medium uppercase tracking-[0.3em]',
};

const colorMap: Record<NonNullable<TypographyProps<'div'>['color']> | 'white/90', string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  white: 'text-white',
  'white/90': 'text-white/90',
  gray: 'text-gray-700',
  inherit: 'text-inherit',
};

const alignMap: Record<NonNullable<TypographyProps<'div'>['align']>, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};
const weightMap: Record<NonNullable<TypographyProps<'div'>['weight']>, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

export function Typography<T extends ElementType = 'p'>({
  as,
  variant = 'p',
  size,
  weight = 'normal',
  color = 'inherit',
  align,
  className,
  children,
  ...rest
}: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>) {
  const Component = (as || 'p') as ElementType;
  return (
    <Component
      className={mergeClass(
        variantClasses[variant],
        weightMap[weight],
        colorMap[color],
        align && alignMap[align],
        size ?? '',
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}