import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons/lib";
import qs from "query-string";
import { title } from "process";

interface CatgeoryItemProps {
  value?: string;
  label: string;
  icon?: IconType;
}
export const CategoryItem = ({
  label,
  value,
  icon: Icon,
}: CatgeoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCatgeoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");
  const isSelected = currentCatgeoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
      )}
      type="button"
    >
      {Icon && <Icon size={20} />} <div className="truncate">{label}</div>
    </button>
  );
};
