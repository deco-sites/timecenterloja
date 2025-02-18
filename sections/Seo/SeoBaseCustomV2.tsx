import { Head } from '$fresh/runtime.ts';
import { AppContext } from 'apps/commerce/mod.ts';
import { stripHTML } from 'apps/website/utils/html.ts';
import {
  type Props as SeoDecoProps,
  renderTemplateString,
  SEOSection,
} from 'apps/website/components/Seo.tsx';

export interface AllProps extends SeoDecoProps {
  /** @ignore true */
  has_url_query_string?: boolean;
}

type Props = Omit<AllProps, 'canonical'>;

/** @title Base Custom V2 */
export function loader(props: Props, req: Request, _ctx: AppContext) {
  const url_formatted = new URL(req.url);
  const has_url_query_string = url_formatted.search !== '';

  return {
    ...props,
    has_url_query_string,
  };
}

export default function SeoBaseCustomV2({
  title: t = '',
  titleTemplate = '%s',
  description: desc,
  descriptionTemplate = '%s',
  type,
  image,
  favicon,
  themeColor,
  noIndexing,
  has_url_query_string,
  jsonLDs = [],
}: Props): SEOSection {
  const twitterCard = type === 'website' ? 'summary' : 'summary_large_image';
  const description = stripHTML(desc || '');
  const title = stripHTML(t);

  return (
    <Head>
      <title>{renderTemplateString(titleTemplate, title)}</title>
      <meta
        name="description"
        content={renderTemplateString(descriptionTemplate, description)}
      />
      <meta name="theme-color" content={themeColor} />
      <link rel="icon" href={favicon} />

      {/* Twitter tags */}
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:card" content={twitterCard} />

      {/* OpenGraph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />

      {/* No index, no follow */}
      <meta
        name="robots"
        content={`${noIndexing || has_url_query_string ? 'noindex' : 'index'} ${
          noIndexing ? 'nofollow' : 'follow'
        }`}
      />

      {jsonLDs.map((json) => (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              // @ts-expect-error Trust me, I'm an engineer
              ...json,
            }),
          }}
        />
      ))}
    </Head>
  );
}
