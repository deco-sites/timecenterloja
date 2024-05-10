import type { SocialIcons } from "$store/components/ui/Icon.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { SemanticColors } from "$store/components/ui/BannerGrid.tsx";

export type TextAlign = "Left" | "Center" | "Right" | "Justify";

export const TEXT_ALIGMENT: Record<TextAlign, string> = {
  "Left": "text-left",
  "Center": "text-center",
  "Right": "text-right",
  "Justify": "text-justify",
};

export interface Links {
  label: string;
  href: string;
  icon: SocialIcons;
}

export interface Props {
  title: string;
  /**
   * @description Title Color
   * @default secondary
   */
  titleColor?: SemanticColors;
  caption?: string;
  /**
   * @description Caption Color
   * @default secondary
   */
  captionColor?: SemanticColors;
  /**
   * @title Description
   * @format html
   */
  html?: string;
  textAlign?: TextAlign;
  links?: Links[];
}

const TEXT_COLORS = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  neutral: "text-neutral",
  base: "text-base",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
};

export default function InfoCard(
  { html, caption, title, textAlign, links, titleColor, captionColor }: Props,
) {
  const textAlignment = TEXT_ALIGMENT[textAlign ? textAlign : "Center"];

  return (
    <section class={`${textAlignment} pt-8`}>
      <h6
        class={`font-bold text-xs uppercase 
          ${titleColor ? TEXT_COLORS[titleColor] : "text-primary"}`}
      >
        {caption}
      </h6>
      <h3
        class={`uppercase text-xl lg:text-2xl font-bold mb-5 
         ${captionColor ? TEXT_COLORS[captionColor] : "text-primary"}
      `}
      >
        {title}
      </h3>
      {links?.length
        ? (
          <ul class="flex gap-4 items-center justify-center">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} class="btn btn-primary gap-3 min-h-0 h-8">
                  <Icon id={link.icon} size={16} strokeWidth={1} />
                  <span class="md:block hidden text-xs uppercase">
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )
        : null}
      {html
        ? (
          <div
            dangerouslySetInnerHTML={{ __html: html }}
            class="text-neutral font-normal text-sm max-w-5xl m-auto pb-12"
          />
        )
        : null}
    </section>
  );
}
