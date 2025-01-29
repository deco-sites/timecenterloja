import { AppContext } from 'apps/commerce/mod.ts';
import Seo, { SEOSection } from 'apps/website/components/Seo.tsx';
import {
  Props as SeoPlpV2Props,
  loader as seoPlpV2Loader,
} from 'apps/commerce/sections/Seo/SeoPLPV2.tsx';

export interface Props extends SeoPlpV2Props {}

/** @title PLP Custom V2 */
export function loader(props: Props, req: Request, ctx: AppContext) {
  const plp_seo_deco = seoPlpV2Loader(props, req, ctx);

  if (
    plp_seo_deco.jsonLDs &&
    plp_seo_deco.jsonLDs.length > 0 &&
    plp_seo_deco.jsonLDs[0] &&
    plp_seo_deco.jsonLDs[0].breadcrumb
  ) {
    return {
      ...plp_seo_deco,
      jsonLDs: [plp_seo_deco.jsonLDs[0].breadcrumb],
    };
  }

  return { plp_seo_deco };
}

export function LoadingFallback(props: Partial<Props>) {
  return <Seo {...props} />;
}

export default function Section(props: Props): SEOSection {
  return <Seo {...props} />;
}

export { default as Preview } from 'apps/website/components/_seo/Preview.tsx';
