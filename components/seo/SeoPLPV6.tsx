import ScriptLDJson from "$store/components/seo/ScriptLDJson.tsx";
import type { ProductListingPage } from "apps/commerce/types.ts";
import BaseSeo from "./SeoBase.tsx";
import { type LoaderReturnType, type SectionProps } from "@deco/deco";
/** @title {{{title}}}  */
interface SeoPage {
  title?: string;
  description?: string;
  url?: string;
}
export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  themeColor?: string;
  /**
   * @title SEO URL Page
   * @description Add SEO by URL Page
   */
  seoByUrl?: SeoPage[];
}
function SeoPLP({ page, ...baseSeo }: SectionProps<ReturnType<typeof loader>>) {
  const breadcrumbList = page?.breadcrumb;
  let title = baseSeo?.title;
  let description = baseSeo?.description;
  const seoUrl = baseSeo?.seoUrl;
  if (page?.seo) {
    title = page?.seo?.title ?? baseSeo?.description;
    description = page?.seo?.description ?? baseSeo?.description;
  }
  if (seoUrl) {
    title = seoUrl?.title ?? baseSeo?.description;
    description = seoUrl?.description ?? baseSeo?.description;
  }
  return (
    <>
      <BaseSeo
        {...{
          ...baseSeo,
          title,
          description,
        }}
      />
      <ScriptLDJson {...breadcrumbList} />
    </>
  );
}
export const loader = ({ seoByUrl = [], ...baseSeo }: Props, req: Request) => {
  const seoUrl = seoByUrl.find(({ url }) =>
    new URLPattern({ pathname: url }).test(req.url)
  );
  return { seoUrl, ...baseSeo };
};
export default SeoPLP;
