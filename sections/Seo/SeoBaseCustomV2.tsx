import { AppContext } from 'apps/commerce/mod.ts';
import Seo, {
  SEOSection,
  Props as SeoDecoProps,
} from 'apps/website/components/Seo.tsx';

export interface Props extends SeoDecoProps {}

/** @title Base Custom V2 */
export function loader(props: Props, req: Request, _ctx: AppContext) {
  const url = new URL(req.url);
  const new_canonical = props.canonical || `${url.origin}${url.pathname}`;

  return {
    ...props,
    canonical: new_canonical,
  };
}

export function LoadingFallback(props: Partial<Props>) {
  return <Seo {...props} />;
}

export default function Section(props: Props): SEOSection {
  return <Seo {...props} />;
}

export { default as Preview } from 'apps/website/components/_seo/Preview.tsx';
