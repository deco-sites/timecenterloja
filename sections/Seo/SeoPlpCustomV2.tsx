import { AppContext } from 'apps/commerce/mod.ts';
import {
  loader as seoPlpV2Loader,
  Props as SeoPlpV2Props,
} from 'apps/commerce/sections/Seo/SeoPLPV2.tsx';
import { SEOSection } from 'apps/website/components/Seo.tsx';
import Seo from 'deco-sites/timecenter/sections/Seo/SeoBaseCustomV2.tsx';

/** @title {{{title}}}  */
interface SeoByUrlItem {
  /** @title Título */
  title?: string;
  /** @title Descrição */
  description?: string;
  /** @title URL */
  url?: string;
}

export interface AllProps extends SeoPlpV2Props {
  /** @title SEO por página */
  seo_by_url_list?: SeoByUrlItem[];
}

type Props = Omit<AllProps, 'canonical'>;

/** @title PLP Custom V2 */
export function loader(props: Props, req: Request, ctx: AppContext) {
  const plp_seo_deco = seoPlpV2Loader(props, req, ctx);
  const seo_by_url = props.seo_by_url_list?.find(({ url }) =>
    new URLPattern({ pathname: url }).test(req.url),
  );

  const url_formatted = new URL(req.url);
  const has_url_query_string = url_formatted.search !== '';
  const new_title = seo_by_url?.title || props.title;
  const new_description = seo_by_url?.description || props.title;
  const new_json_lds = plp_seo_deco?.jsonLDs[0]?.breadcrumb
    ? [plp_seo_deco?.jsonLDs[0]?.breadcrumb]
    : [];

  delete plp_seo_deco.canonical;

  return {
    ...plp_seo_deco,
    title: new_title,
    description: new_description,
    jsonLDs: new_json_lds,
    has_url_query_string,
  };
}

export function LoadingFallback(props: Partial<Props>) {
  return <Seo {...props} />;
}

export default function Section(props: Props): SEOSection {
  return <Seo {...props} />;
}

export { default as Preview } from 'apps/website/components/_seo/Preview.tsx';
