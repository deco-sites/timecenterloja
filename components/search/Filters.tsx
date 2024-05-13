import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const IconArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
  >
    <path
      d="M10 3L4.5 8.5L2 6"
      stroke="#191919"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem({ url, selected, label, quantity }: FilterToggleValue) {
  return (
    <a href={`${url}&page=1`} rel="nofollow" class="flex items-center gap-2">
      <div
        aria-checked={selected}
        class={`checkbox bg-[#F7F7F7] flex justify-center items-center aria-checked:border-none aria-checked:bg-none aria-checked:bg-primary rounded-md
        `}
      >
        {/* {selected && <Icon id="checkIcon" width={42} height={42} />} */}
        {selected && <IconArrow />}
      </div>
      <span
        class={`text-sm font-normal 
        ${selected ? "text-base-content" : "text-secondary"}
      `}
      >
        {label}
      </span>
      {/* {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>} */}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-col"
    : "flex-col";

  const sortedValues = key === "price"
    ? values.sort((a, b) => {
      const numA = parseInt(a.value.split(":")[0]);
      const numB = parseInt(b.value.split(":")[0]);

      return numA - numB;
    })
    : values;
  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {sortedValues.map((item) => {
        if (key === "price") {
          const range = parseRange(item.value);

          return (
            range && (
              <ValueItem
                {...item}
                label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
              />
            )
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  const _filters = filters.filter(isToggle).filter((filter) =>
    !filter.key.includes("category-")
  );
  const selectedFilters = _filters.reduce<FilterToggleValue[]>(
    (initial, filter) => {
      const selected = filter.values.find((value) => value.selected);
      if (!selected) return initial;

      return [...initial, selected];
    },
    [],
  );

  return (
    <ul class="flex flex-col gap-2">
      <li>
        <p class="font-medium text-base uppercase mb-4 text-[#06005B]">
          Filtrar por:
        </p>
        {selectedFilters.length > 0 && (
          selectedFilters.map((filter) => (
            <div class="mb-2">
              <ValueItem {...filter} />
            </div>
          ))
        )}
      </li>
      {_filters.map((filter) => (
        <li class="flex flex-col gap-4">
          <details class="collapse collapse-plus" open>
            <summary class="collapse-title uppercase text-base-content text-base font-medium min-h-0 px-0 py-2.5 border-b mb-4 border-primary-content">
              {filter.label}
            </summary>
            <div class="collapse-content px-0">
              <FilterValues {...filter} />
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}

export default Filters;
