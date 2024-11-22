import ScriptLDJson from "$store/components/seo/ScriptLDJson.tsx";
import type { ProductListingPage } from "apps/commerce/types.ts";
import BaseSeo from "./SeoBase.tsx";
import { type LoaderReturnType } from "@deco/deco";
export interface Props {
    page: LoaderReturnType<ProductListingPage | null>;
    /**
     * @title Title template
     * @description add a %s whenever you want it to be replaced with the product name
     * @default %s | Fashion Store
     */
    titleTemplate: string;
    title?: string;
    description?: string;
    url?: string;
    imageUrl?: string;
    themeColor?: string;
}
function SeoPLP({ page, ...baseSeo }: Props) {
    const breadcrumbList = page?.breadcrumb;
    let title = baseSeo?.title;
    if (page?.seo?.title) {
        title = baseSeo?.titleTemplate?.replace("%s", page?.seo?.title || "") ||
            page?.seo?.title;
    }
    return (<>
      <BaseSeo {...{
        ...baseSeo,
        title,
        description: page?.seo?.description ?? baseSeo?.description,
    }}/>
      <ScriptLDJson {...breadcrumbList}/>
    </>);
}
export default SeoPLP;
