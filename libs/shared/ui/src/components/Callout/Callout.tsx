import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export enum CalloutVariant {
  DEFAULT = 'default',
  POSITIVE = 'positive',
  WARNING = 'warning',
  NEGATIVE = 'negative',
  INFORMATION = 'information',
  WHITE = 'white',
}

export type CalloutProps = {
  variant?:
    | CalloutVariant.DEFAULT
    | CalloutVariant.POSITIVE
    | CalloutVariant.WARNING
    | CalloutVariant.NEGATIVE
    | CalloutVariant.INFORMATION
    | CalloutVariant.WHITE;
  children: ReactNode;
  testId?: string;
  className?: string;
};

const { DEFAULT, POSITIVE, WARNING, NEGATIVE, INFORMATION, WHITE } =
  CalloutVariant;

export const Callout = ({
  children,
  testId,
  variant = DEFAULT,
  className,
}: CalloutProps) => {
  const getClassname = () => {
    switch (variant) {
      case POSITIVE:
        return 'bg-green-100 before:bg-green-700';
      case WARNING:
        return 'bg-yellow-150 before:bg-yellow-700';
      case NEGATIVE:
        return 'bg-red-100 before:bg-red-700';
      case INFORMATION:
        return 'bg-gray-100 before:bg-teal-400';
      case WHITE:
        return 'bg-white before:bg-teal-400';
      default:
        return 'bg-blue-100 before:bg-blue-800';
    }
  };

  const beforeClasses = `before:content-[""] before:block before:h-[80px] before:w-[8px] before:absolute before:left-0 before:top-0 before:rounded-bl-[8px]`;

  return (
    <div
      className={twMerge(
        'relative min-h-[95px] p-6 rounded-bl-3xl',
        beforeClasses,
        getClassname(),
        className,
      )}
      data-testid={`callout-${variant}${testId ? '-' + testId : ''}`}
    >
      {children}
    </div>
  );
};
