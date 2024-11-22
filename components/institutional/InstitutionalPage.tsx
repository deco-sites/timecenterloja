import { Head } from "$fresh/runtime.ts";
import { type Section } from "@deco/deco/blocks";
export interface Props {
    title: string;
    asideMenu: Section;
    content: Section;
}
function InstitutionalPage({ asideMenu: { Component: AsideComponent, props: asideProps }, content: { Component: ContentComponent, props: contentProps }, title, }: Props) {
    return (<>
      <Head>
        <style dangerouslySetInnerHTML={{
            __html: `
            .linha-divs {
              background-color: #c41c17;
              height: 2px;
              width: 60%;
              position: relative;
              top: -2%;
            }

            .bloco-text-technos li {
              line-height: 22px;
              padding-left: 20px;
              list-style: disc;
              list-style: disc;
            }

            p.paragf {
              font-family: 'Montserrat', sans-serif;
              font-style: normal;
              font-weight: 400;
              font-size: 16px;
              line-height: 140%;
              color: #2e2e2e;
              padding-bottom: 6px;
            }

            h1.header-text-intitucional {
              font-family: 'Montserrat';
              font-style: normal;
              font-weight: 700;
              font-size: 35px;
              line-height: 100%;
              text-transform: uppercase;
              margin-top: 0;
              color: #2e2e2e;
              margin-bottom: 5%;
            }

            h3.head-text {
              font-family: 'Montserrat', sans-serif;
              font-style: normal;
              font-weight: 700;
              font-size: 16px;
              line-height: 140%;
              color: #2e2e2e;
              padding-bottom: 20px;
            }

            strong {
              font-weight: bold;
            }

            .bloco-text-technos ul {
              line-height: 22px;
              padding-left: 20px;
              list-style: disc;
              padding-top: 20px;
            }

            .fundotext {
              background: #eeeeee;
              border-radius: 5px;
              width: 100%;
              display: flex;
              padding: 2% 5% 2% 3%;
            }

            .head-text-destaque {
              font-family: 'Montserrat', sans-serif;
              font-style: normal;
              font-weight: 700;
              font-size: 18px;
              text-align: center;
              position: relative;
              padding: 0% 20%;
              color: #2e2e2e;
            }

            .destaqueblock {
              margin-top: 5%;
            }

            .linha-divs2 {
              background-color: #c41c17;
              height: 2px;
              width: 33%;
              position: relative;
              right: 10%;
              margin-top: 5%;
              top: -2%;
              margin-bottom: 3%;
            }

            .conteiner-paragraph-intitucional.overflow .bloco-text-technos {
              width: 100%;
              font-size: 14px;
              height: 100vh;
              padding: 2%;
              overflow-y: auto;
              overflow-x: hidden;
            }

            div.bloco-text-technos::-webkit-scrollbar-thumb {
              background: #db0c22;
            }

            ::-webkit-scrollbar-track {
              background-color: #f4f4f4;
              border: 3px solid #fff;
            }

            ::-webkit-scrollbar {
              width: 12px;
              background: #f4f4f4;
            }

            ::-webkit-scrollbar-thumb {
              background: #dad7d7;
            }

            @media (max-width: 1024px) {
              .linha-divs {
                left: -8% !important;
                margin-bottom: 20px;
              }

              h1.header-text-intitucional {
                margin-top: 5%;
                color: #2e2e2e;
                font-size: 26px;
                margin-bottom: 5%;
              }

              .head-text-destaque {
                font-size: 14px;
                padding: 6% 4%;
              }

              .fundotext {
                padding: 0;
              }
            }

          `,
        }}/>
      </Head>
      <div>
        {/* Banner Institucional | Suporte */}
      </div>
      <div class="flex flex-col md:flex-row justify-between mt-[15px]">
        <AsideComponent {...asideProps}/>
        <article class="md:pl-[30px] w-full">
          <h3 class="hidden text-secondary text-[28px] font-medium leading-[36.4px] mb-5 border-b border-neutral-100 pb-[10px] md:block">
            {title}
          </h3>
          {/* @ts-ignore opting for a ignore here so we can use a union type for the content section prop, and display it nicely in the admin panel */}
          <ContentComponent {...contentProps}/>
        </article>
      </div>
    </>);
}
export default InstitutionalPage;
