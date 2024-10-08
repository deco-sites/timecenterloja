import { headerHeight } from "./constants.ts";

export interface INavItem {
  label: string;
  href: string;
  /** @default true */
  showLabel?: boolean;
  highlighted?: boolean;
  children?: INavItem[];
  image?: { src?: string; alt?: string };
}

// function splitNatItems(children: INavItem[], number = 6) {
//   const slices = [];
//   const totalSlices = Math.ceil(children.length / number);

//   for (let i = 0; i < totalSlices; i++) {
//     slices.push(children.slice(i * number, (i + 1) * number));
//   }

//   return slices;
// }

function NavItemDropDown({ elements }: { elements?: INavItem[] }) {
  if (!elements || !elements?.length) {
    return <span />;
  }

  // const navItemsCol = splitNatItems(elements, 6);

  return (
    <div
      class="absolute hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 w-screen bg-opacity-95"
      style={{ top: "0px", left: "0px", marginTop: headerHeight }}
    >
      <div class="max-w-5xl w-full pt-14 pb-12 m-auto px-5 flex items-start justify-start gap-16">
        {elements.map(({ href, label, children, showLabel }) => (
          <ul class="flex items-start justify-start gap-2 flex-col">
            {showLabel
              ? (
                <li class="mb-3">
                  <a
                    class="text-sm text-base-content font-bold hover:text-emphasis transition-all duration-300"
                    href={href}
                  >
                    <span>{label}</span>
                  </a>
                </li>
              )
              : null}
            {children?.map((subItem) => (
              <li class="mb-3">
                <a
                  class="text-sm text-base-content hover:text-emphasis transition-all duration-300 underline decoration-white block w-full h-full"
                  href={subItem?.href}
                >
                  <span>{subItem?.label}</span>
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children, highlighted } = item;

  return (
    <li class="group flex items-center">
      <a href={href} class="px-4 py-7 underline decoration-white">
        <span
          class={`after:absolute after:transition-all after:duration-100 after:-bottom-1 font-montserrat font-bold uppercase relative after:left-0 group-hover:after:w-full after:w-0 after:h-[1px] after:bg-emphasis text-xs group-hover:text-emphasis transition-all duration-300 ${
            highlighted ? "text-primary" : "text-base-content"
          }`}
        >
          {label}
        </span>
      </a>
      <NavItemDropDown elements={children} />
    </li>
  );
}

export default NavItem;
