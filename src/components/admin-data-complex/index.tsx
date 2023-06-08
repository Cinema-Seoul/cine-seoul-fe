import { useGetApiWithPagination } from "@/services/api";
import clsx from "clsx";
import { ReactNode, useDeferredValue } from "react";
import PaginationBar from "../pagination/pagination-bar";
import { ListResponse } from "@/types";
import { Loader } from "../ui";

export type OnGetListFunc<T> = (page: number, size: number) => Promise<ListResponse<T>>;
export type OnGetDetailFunc<T> = (id: number) => Promise<T>;
export type OnGetEditable = () => EditableEntry[];

export type EditableEntry = {
  label: string;
  inputId: string;
  input?: ReactNode;
};

export type AdminDataComplexProps<L extends Record<string, any>, D extends Record<string, any>> = BaseProps & {
  onGetList: OnGetListFunc<L>;
  onGetDetail?: OnGetDetailFunc<D>;
  onGetEditable?: () => EditableEntry[];
};

export default function AdminDataComplex<L extends Record<string, any>, D extends Record<string, any>>({
  className,
  onGetList,
}: AdminDataComplexProps<L, D>) {
  const List = useGetApiWithPagination(onGetList, { initialPage: 0, pageSize: 20 });

  if (List.loading) {
    return (
      <div className={clsx(className, "flex justify-center items-center")}>
        <Loader className="w-8 h-8" />
      </div>
    );
  } else if (List.error) {
    return (
      <div className={clsx(className, "text-center p-8")}>
        <p>오류 발생!</p>
        <p>{(List.error.response?.data as any)?.message ?? ""}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <table className="hq-data-table flex-1 w-full h-full">
        {/* <thead>
          <th></th>
        </thead> */}
        <tbody>
          {List.data?.list.map((item, i) => (
            <tr key={i}>
              {Object.entries(item).map(([key, value]) => (
                <td key={key}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationBar
        currentPageIndex={List.page}
        pageCount={List.data?.totalPages ?? 0}
        onPageSelected={List.setPage}
      />
    </div>
  );
}
