import { type Section } from "@deco/deco/blocks";
export type VerticalSpacing = "top" | "bottom" | "both" | "none";
export type ShadowSize = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "inner";
export type OverFlow =
  | "overflow-none"
  | "overflow-auto"
  | "overflow-hidden"
  | "overflow-scroll"
  | "overflow-visible";
export interface Props {
  /** @default "Container" */
  label?: string;
  sections: {
    label: string;
    section: Section;
    withContainer?: boolean;
    /** @default none */
    shadow?: ShadowSize;
    /** @default overflow-none */
    overFlow?: OverFlow;
    /**
     * @description Section background
     */
    backgroundColor?: string;
    /** @default both */
    verticalSpacing?: VerticalSpacing;
    /**
     * @description Vertical margin between sections multiple of 4px
     * @default 0
     */
    spacing?: number;
  }[];
}
function Container({ sections }: Props) {
  return (
    <>
      {sections?.map((
        {
          section: { Component, props },
          withContainer = false,
          backgroundColor = "",
          verticalSpacing = "both",
          shadow = "none",
          overFlow = "overflow-none",
          spacing = 0,
        },
      ) => (
        <div
          class={`w-full
          ${VERTICAL_SPACING[verticalSpacing]} 
          ${SPACING[spacing]}
          ${OVERFLOW[overFlow]}
          ${SHADOW_SIZE[shadow]}`}
          style={backgroundColor && { background: `${backgroundColor}` }}
        >
          {withContainer
            ? (
              <div class="container w-full m-auto px-5">
                <Component {...props} />
              </div>
            )
            : <Component {...props} />}
        </div>
      ))}
    </>
  );
}
const VERTICAL_SPACING: Record<VerticalSpacing, string> = {
  top: "!mb-0",
  bottom: "!mt-0",
  none: "!my-0",
  both: "",
};
const SHADOW_SIZE: Record<ShadowSize, string> = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
  inner: "shadow-inner",
};
const OVERFLOW: Record<OverFlow, string> = {
  "overflow-none": "overflow-none",
  "overflow-auto": "overflow-auto",
  "overflow-hidden": "overflow-hidden",
  "overflow-visible": "overflow-visible",
  "overflow-scroll": "overflow-scroll",
};
const SPACING = [
  "my-0",
  "my-1",
  "my-2",
  "my-3",
  "my-4",
  "my-5",
  "my-6",
  "my-7",
  "my-8",
  "my-9",
  "my-10",
];
export default Container;
