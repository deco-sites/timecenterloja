import { Head } from "$fresh/runtime.ts";
import { Section } from "deco/blocks/section.ts";

import TextContent from "$store/sections/Institutional/TextContent.tsx";
import AccordionsContent from "$store/sections/Institutional/AccordionsContent.tsx";
import CardsContent from "$store/sections/Institutional/CardsContent.tsx";
import Form from "$store/sections/Institutional/Form.tsx";
import ContactForm from "$store/sections/Institutional/ContactForm.tsx";


export interface Props {
  title: string;
  asideMenu: Section;
  content: Section<ReturnType<typeof TextContent>> 
  | Section<ReturnType<typeof AccordionsContent>>
  | Section<ReturnType<typeof CardsContent>>
  | Section<ReturnType<typeof Form>>
  | Section<ReturnType<typeof ContactForm>>
}

function InstitutionalPage({
  asideMenu: { Component: AsideComponent, props: asideProps },
  content: { Component: ContentComponent, props: contentProps },
  title,
}: Props) {
  return (
    <>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .markdown-body h2 {
              font-size: 20px;
              font-weight: 700;
              line-height: 1.4;
              margin: 0 0 20px 0;
            }
            .markdown-body h3 {
              font-size: 18px;
              font-weight: 700;
              line-height: 1.4;
              margin: 0 0 20px 0;
            }
            .markdown-body p:empty {
              display: none;
            }
            .markdown-body p:last-child {
              margin-bottom: 20px;
            }
            .markdown-body p {
              color: #8E8E9F;
              font-size: 14px;
              font-weight: 400;
              line-height: 20px;
            }
          `,
          }}
        />
      </Head>
      <div>
        {/* Banner Institucional | Suporte */}
      </div>
      <div class="flex flex-col md:flex-row justify-between mt-[15px]">
        <AsideComponent {...asideProps} />
        <article class="md:pl-[30px] w-full">
          <h3 class="hidden text-secondary text-[28px] font-medium leading-[36.4px] mb-5 border-b border-neutral-100 pb-[10px] md:block">
            {title}
          </h3>
          {/* @ts-ignore opting for a ignore here so we can use a union type for the content section prop, and display it nicely in the admin panel */}
          <ContentComponent {...contentProps} />
        </article>
      </div>
    </>
  );
}

export default InstitutionalPage;
