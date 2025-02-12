import { AppContext } from 'apps/commerce/mod.ts';
import Seo, { SEOSection } from 'apps/website/components/Seo.tsx';
import {
  loader as seoPdpV2Loader,
  Props as SeoPdpV2Props,
} from 'apps/commerce/sections/Seo/SeoPDPV2.tsx';
import { fix_data_struct_by_pix_payment } from 'deco-sites/timecenter/sdk/schema_org.ts';

export interface Props extends SeoPdpV2Props {}

/** @title PDP Custom V2 */
export function loader(props: Props, req: Request, ctx: AppContext) {
  const pdp_seo_deco = seoPdpV2Loader(props, req, ctx);
  const pdp_seo_with_pix_discount = pdp_seo_deco.jsonLDs.map((json_ld) => {
    if (json_ld && json_ld.product) {
      const new_json_ld = {
        ...json_ld,
        product: fix_data_struct_by_pix_payment(json_ld.product),
      };
      json_ld = new_json_ld;
    }
    return json_ld;
  });

  delete pdp_seo_deco.canonical;

  return {
    ...pdp_seo_deco,
    jsonLDs: pdp_seo_with_pix_discount,
  };
}

export function LoadingFallback(props: Partial<Props>) {
  return <Seo {...props} />;
}

export default function Section(props: Props): SEOSection {
  return <Seo {...props} />;
}

export { default as Preview } from 'apps/website/components/_seo/Preview.tsx';
