import { ChangeEvent, forwardRef } from 'react';
import { RadioButton } from '../RadioButton';
import { twMerge } from 'tailwind-merge';

export type QuestionRadioButtonProps = {
  children?: string;
  options: QuestionOption[];
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  defaultChecked?: string;
  testId?: string;
  className?: string;
};

export interface QuestionOption {
  text: string;
  value: string;
  disabled?: boolean;
}

export const QuestionRadioButton = forwardRef(
  (
    {
      options,
      children,
      onChange,
      name,
      defaultChecked,
      testId = 'question-radio',
      className,
    }: QuestionRadioButtonProps,
    ref,
  ) => {
    return (
      <div data-testid={testId} className={twMerge(className)}>
        {children ? (
          <legend className="mb-2 text-lg text-gray-800 font-bold">
            {children}
          </legend>
        ) : null}
        {options.map(({ text, value, disabled }, index) => {
          return (
            <div
              key={name + value}
              className={twMerge('mt-3', disabled && ['opacity-25'])}
            >
              <RadioButton
                ref={ref}
                defaultChecked={defaultChecked === value && !disabled}
                required
                disabled={disabled}
                onChange={onChange}
                name={name}
                value={value}
                id={name + '-' + index}
              >
                {text}
              </RadioButton>
            </div>
          );
        })}
      </div>
    );
  },
);
