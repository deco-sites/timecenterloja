export interface Props {
  reference_id?: string;
  complete_name: string;
}

export default function ProductCardName(props: Props) {
  return (
    <div class="min-h-14">
      <h2 class="w-full line-clamp-2 text-left text-lg leading-5 font-medium text-base-content">
        {(props.complete_name || "").split("-")[0].trim()}
      </h2>

      {props.reference_id && (
        <p class="w-full text-left text-xs font-normal text-[#C4C4C4]">
          {props.reference_id}
        </p>
      )}
    </div>
  );
}
