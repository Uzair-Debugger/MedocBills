import type { ButtonHTMLAttributes } from 'react';
import { mergeClass } from '../../utils/classUtils';
import { buttonBase } from '../../theme/classes';
import type { ButtonVariant } from '../../constants/types';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  roundedFull?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-secondary transition-colors',
  secondary: 'bg-secondary text-white hover:bg-secondary-hover transition-colors',
  outline: 'border border-primary text-primary bg-transparent hover:bg-primary/10 transition-colors',
  ghost: 'bg-transparent text-primary hover:bg-primary/10 transition-colors',
};

const sizeClasses: Record<NonNullable<CustomButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function CustomButton({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  roundedFull = false,
  className,
  ...props
}: CustomButtonProps) {
  return (
    <button
      {...props}
      className={mergeClass(
        buttonBase,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        roundedFull ? 'rounded-full' : 'rounded-md',
        className,
        className = 'cursor-pointer'
      )}
    />
  );
}