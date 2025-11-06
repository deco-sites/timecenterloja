import { Head } from "$fresh/runtime.ts";

interface Props {
  apiKey: string;
}

export default function Dito({ apiKey }: Props) {
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(d,e,id){
                if (window.dito) return; // prevent double-injection
                window.dito={};window._ditoTemp=[];
                window.dito.generateID=function(str){return '_dito_sha1_'+str;}
                var m=['init','identify','alias','unalias','track'],s=d.createElement('script'),
                x=d.getElementsByTagName(e)[0];s.type='text/javascript';s.async=true;s.id=id;
                s.src='//storage.googleapis.com/dito/sdk.js';x.parentNode.insertBefore(s,x);
                for(var i=0;i<m.length;i++){window.dito[m[i]]=function(i){
                  return function(){window._ditoTemp.push({methodName:m[i],params:arguments});}
                }(i)}
              })(document,'script','dito-jssdk');

              // Initialize SDK
              window.dito.init({ apiKey: ${JSON.stringify(apiKey)} });
            `,
          }}
        />
      </Head>
    </>
  );
}

declare global {
  interface Window {
    dito: {
      init: (config: { apiKey: string }) => void;
      track: (
        payload: {
          action: string;
          data?: Record<string, unknown>;
          revenue?: number;
        },
      ) => void;
      identify: (user: Record<string, unknown>) => void;
      generateID: (str: string) => string;
    };
    _ditoTemp: Array<{ methodName: string; params: IArguments }>;
    ditoTrackWithContext: (
      action: string,
      data?: Record<string, unknown>,
    ) => void;
    ditoIdentifyByEmail: (
      name: string,
      email: string,
      extra?: Record<string, unknown>,
    ) => void;
  }
}