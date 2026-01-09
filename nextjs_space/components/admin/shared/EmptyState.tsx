'use client';

import * as React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

/**
 * Props for the EmptyState component.
 * @interface EmptyStateProps
 */
export interface EmptyStateProps {
  /** Lucide icon component to display */
  icon?: LucideIcon;
  /** Main heading text */
  heading: string;
  /** Description text */
  description?: string;
  /** Call-to-action button configuration */
  action?: {
    /** Button label */
    label: string;
    /** Button click handler */
    onClick: () => void;
    /** Lucide icon for the button */
    icon?: LucideIcon;
    /** Button variant */
    variant?: 'default' | 'outline' | 'secondary';
  };
  /** Additional CSS classes for the container */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'default' | 'lg';
  /** Visual variant for different contexts */
  variant?: 'default' | 'muted' | 'card';
}

/**
 * EmptyState - A configurable empty state component.
 *
 * Features:
 * - Customizable icon, heading, and description
 * - Optional call-to-action button
 * - Multiple size variants
 * - Multiple visual variants
 * - Accessible with proper semantic structure
 *
 * @example
 * ```tsx
 * // Basic empty state
 * <EmptyState
 *   heading="No products yet"
 *   description="Add your first product to get started"
 * />
 *
 * // With action button
 * <EmptyState
 *   icon={Package}
 *   heading="No products found"
 *   description="Try adjusting your search or filters"
 *   action={{
 *     label: "Clear filters",
 *     onClick: handleClearFilters,
 *   }}
 * />
 *
 * // Search/filter empty state
 * <EmptyState
 *   icon={Search}
 *   heading="No results found"
 *   description={`No results matching "${searchQuery}"`}
 *   variant="muted"
 *   size="sm"
 * />
 * ```
 */
export function EmptyState({
  icon: Icon = Inbox,
  heading,
  description,
  action,
  className,
  size = 'default',
  variant = 'default',
}: EmptyStateProps) {
  const ActionIcon = action?.icon;

  const sizeClasses = {
    sm: {
      container: 'py-8',
      icon: 'h-10 w-10',
      iconWrapper: 'h-16 w-16',
      heading: 'text-base',
      description: 'text-sm',
    },
    default: {
      container: 'py-12',
      icon: 'h-12 w-12',
      iconWrapper: 'h-20 w-20',
      heading: 'text-lg',
      description: 'text-sm',
    },
    lg: {
      container: 'py-16',
      icon: 'h-16 w-16',
      iconWrapper: 'h-24 w-24',
      heading: 'text-xl',
      description: 'text-base',
    },
  };

  const variantClasses = {
    default: {
      container: 'bg-transparent',
      iconWrapper: 'bg-muted/50',
      icon: 'text-muted-foreground',
    },
    muted: {
      container: 'bg-muted/30 rounded-lg border border-dashed border-border/60',
      iconWrapper: 'bg-muted/70',
      icon: 'text-muted-foreground/70',
    },
    card: {
      container: 'bg-card rounded-lg border shadow-sm',
      iconWrapper: 'bg-primary/5',
      icon: 'text-primary/60',
    },
  };

  const sizes = sizeClasses[size];
  const variants = variantClasses[variant];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center px-6',
        sizes.container,
        variants.container,
        className
      )}
      role="status"
      aria-label={heading}
    >
      {/* Icon */}
      <div
        className={cn(
          'flex items-center justify-center rounded-full mb-4',
          'transition-transform duration-300 hover:scale-105',
          sizes.iconWrapper,
          variants.iconWrapper
        )}
      >
        <Icon
          className={cn(sizes.icon, variants.icon)}
          aria-hidden="true"
        />
      </div>

      {/* Heading */}
      <h3
        className={cn(
          'font-semibold text-foreground mb-1',
          sizes.heading
        )}
      >
        {heading}
      </h3>

      {/* Description */}
      {description && (
        <p
          className={cn(
            'text-muted-foreground max-w-sm',
            sizes.description
          )}
        >
          {description}
        </p>
      )}

      {/* Action button */}
      {action && (
        <Button
          variant={action.variant || 'default'}
          onClick={action.onClick}
          className="mt-4"
        >
          {ActionIcon && (
            <ActionIcon className="h-4 w-4 mr-2" aria-hidden="true" />
          )}
          {action.label}
        </Button>
      )}
    </div>
  );
}

EmptyState.displayName = 'EmptyState';
