import { ReactNode } from 'react';
import { Button, H4, Paragraph, ToolIntro } from '@maps-digital/shared/ui';
import { Container } from '@maps-react/core/components/Container';
import { twMerge } from 'tailwind-merge';

export type Props = {
  intro: string;
  timeToComplete?: string;
  content: ReactNode;
  actionLink: string;
  actionText: string;
  additionalInformation?: string | ReactNode;
  className?: string;
};

export const Landing = ({
  intro,
  timeToComplete,
  content,
  actionLink,
  actionText,
  additionalInformation,
  className,
}: Props) => {
  return (
    <Container className="pb-16">
      <div className={twMerge('lg:max-w-[840px] space-y-8', className)}>
        {timeToComplete && (
          <div className="text-blue-800 space-y-6 text-[22px]">
            {timeToComplete}
          </div>
        )}
        <ToolIntro className="mb-8 text-[24px]">{intro}</ToolIntro>
        <div className="text-gray-800 space-y-6">{content}</div>
        <div className="space-y-4">
          <Button
            variant="primary"
            type="button"
            as="a"
            href={actionLink}
            data-testid="landing-page-button"
            data-cy="landing-page-button"
            className="w-full sm:w-auto"
          >
            {actionText}
          </Button>
        </div>
        {additionalInformation && (
          <div className="text-gray-800 space-y-6">
            <H4>Additional Information</H4>
            <Paragraph>{additionalInformation}</Paragraph>
          </div>
        )}
      </div>
    </Container>
  );
};
