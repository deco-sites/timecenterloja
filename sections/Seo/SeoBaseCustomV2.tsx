import { AppContext } from 'apps/website/mod.ts';
import Seo, {
  SEOSection,
  Props as SeoDecoProps,
} from 'apps/website/components/Seo.tsx';
import { loader as seoV2Loader } from 'apps/website/sections/Seo/SeoV2.tsx';

/** @title Base Custom V2 */
export function loader(props: SeoDecoProps, req: Request, ctx: AppContext) {
  const seo_base_deco = seoV2Loader(props, req, ctx);
  const url = new URL(req.url);
  const new_canonical = `${url.origin}${url.pathname}`;

  return {
    ...seo_base_deco,
    canonical: new_canonical,
  };
}

export function LoadingFallback(props: Partial<SeoDecoProps>) {
  return <Seo {...props} />;
}

export default function Section(props: SeoDecoProps): SEOSection {
  return <Seo {...props} />;
}

export { default as Preview } from 'apps/website/components/_seo/Preview.tsx';
