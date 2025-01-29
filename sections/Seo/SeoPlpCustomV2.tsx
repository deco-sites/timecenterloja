import { AppContext } from 'apps/commerce/mod.ts';
import Seo, { SEOSection } from 'apps/website/components/Seo.tsx';
import {
  Props as SeoPlpV2Props,
  loader as seoPlpV2Loader,
} from 'apps/commerce/sections/Seo/SeoPLPV2.tsx';
import { fix_data_struct_by_pix_payment } from 'deco-sites/timecenter/sdk/schema_org.ts';

export interface Props extends SeoPlpV2Props {}

/** @title PLP Custom V2 */
export function loader(props: Props, req: Request, ctx: AppContext) {
  const plp_seo_deco = seoPlpV2Loader(props, req, ctx);
  const plp_seo_with_pix_discount = plp_seo_deco.jsonLDs.map((json_ld) => {
    if (json_ld && json_ld.products && json_ld.products.length > 0) {
      const new_products = json_ld.products.map((product) =>
        fix_data_struct_by_pix_payment(product),
      );
      json_ld.products = new_products;
    }
    return json_ld;
  });

  return {
    ...plp_seo_deco,
    jsonLDs: plp_seo_with_pix_discount,
  };
}

export function LoadingFallback(props: Partial<Props>) {
  return <Seo {...props} />;
}

export default function Section(props: Props): SEOSection {
  return <Seo {...props} />;
}

export { default as Preview } from 'apps/website/components/_seo/Preview.tsx';
