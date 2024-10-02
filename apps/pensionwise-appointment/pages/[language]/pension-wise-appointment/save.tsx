import { GetServerSideProps, NextPage } from 'next';
import Cookies from 'cookies';
import {
  PensionwisePageLayout,
  PensionWisePageProps,
} from '@maps-react/pwd/layouts/PensionwisePageLayout';
import {
  mapJsonRichText,
  JsonRichText,
} from '@maps-react/vendor/utils/RenderRichText';
import { H2 } from '@maps-react/common/components/Heading';
import { Button } from '@maps-react/common/components/Button';
import { Errors } from '@maps-react/common/components/Errors';
import { fetchSave, fetchShared } from '../../../utils';

type ApptSaveModel = {
  title: string;
  pageDescription: JsonRichText;
  labelText: string;
  labelSubText: string[];
  errorMessageEmail: string;
  errorMessageSend: string[];
  submitButtonText: string;
};

type ApptSaveProps = {
  data: ApptSaveModel;
};

const Page: NextPage<PensionWisePageProps & ApptSaveProps> = ({
  data,
  ...pageProps
}) => {
  const {
    route: { query },
  } = pageProps;
  const {
    title,
    pageDescription,
    labelText,
    labelSubText,
    errorMessageEmail,
    errorMessageSend,
    submitButtonText,
  } = data;

  const { language, error } = query;

  const borderColour = error ? 'border-red-700' : 'border-gray-400';

  return (
    <PensionwisePageLayout {...pageProps}>
      <H2 className="mt-10 mb-6" data-testid="section-title">
        {title}
      </H2>
      <div className="mb-6">{mapJsonRichText(pageDescription.json)}</div>
      <form method="POST" noValidate>
        <input type="HIDDEN" name="language" defaultValue={language} />
        <Errors errors={error ? [error] : []}>
          <label className="block mb-1 text-lg" htmlFor="email">
            {labelText}
          </label>
          <p id="email-hint" className="text-gray-400 mb-1">
            {labelSubText}
          </p>
          {error && (
            <p id="email-error" className="text-red-700 mb-1">
              Error:{' '}
              {error === 'email'
                ? `${errorMessageEmail}`
                : `${errorMessageSend}`}
            </p>
          )}

          <input
            className={`${borderColour} border rounded focus:outline-purple-700 focus:shadow-focus-outline h-10 m-px mt-1 px-3 w-full md:w-80`}
            id="email"
            name="email"
            type="email"
            aria-describedby={`email-hint ${error ? 'email-error' : ''}`}
          />
        </Errors>

        <Button
          className="w-full md:w-auto mt-6"
          formAction="/api/save-and-return"
          data-testid="save-and-return"
        >
          {submitButtonText}
        </Button>
      </form>
    </PensionwisePageLayout>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  res,
}) => {
  const data = await fetchSave(query);
  const sharedContent = await fetchShared(query);

  if (!data) {
    return { notFound: true };
  }

  const cookies = new Cookies(req, res);
  const BASE_URL = `/${query.language}/${process.env.appUrl}`;

  // split the the url at the app name
  const backUrlArray = req.headers.referer?.split(
    process.env.appUrl ?? BASE_URL,
  );

  // get the second part of the array (after the app name)
  const backUrlPath =
    backUrlArray && backUrlArray[1] !== '' ? backUrlArray[1] : '/';

  // remove the query params
  // if there are no params you have come from the appointment page
  const backUrl =
    backUrlPath.split('?')[0] !== '' ? backUrlPath.split('?')[0] : '/';

  let backLink;

  if (backUrl !== '/save' && backUrl !== '/progress-saved') {
    // not coming from progress-saved or itself
    // set the set saveBack cookie for future reference and backUrl
    cookies.set('saveBack', backUrl, {
      httpOnly: true,
    });
    backLink = backUrl;
  } else {
    //coming from progress-saved or itself
    // set backUrl to the saveBack cookie value or '/' if no cookie set
    backLink = cookies.get('saveBack') ?? '/';
  }

  return {
    props: {
      data,
      sharedContent,
      pageTitle: data.browserPageTitle,
      route: {
        query,
        back: backLink,
        app: process.env.appUrl,
      },
    },
  };
};
