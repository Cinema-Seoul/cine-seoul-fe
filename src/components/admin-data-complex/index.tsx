import { useGetApiWithPagination } from "@/services/api";
import { ListResponse } from "@/types";
import clsx from "clsx";
import { DependencyList, ReactNode, useCallback } from "react";
import { IoAdd, IoRefresh } from "react-icons/io5";
import PaginationBar from "../pagination/pagination-bar";
import { Button, Loader } from "../ui";
import { useDetailDialog } from "./detail";
import { useEditDialog } from "./edit";

export type OnGetListFunc<T> = (page: number, size: number) => Promise<ListResponse<T>>;
export type OnGetDetailFunc<L, D> = (item: L) => Promise<D>;
export type OnSetEdited<E> = (result: E) => Promise<unknown>;
export type OnSetCreated<C> = OnSetEdited<C>;

export type ListHeadEntry<L extends object> = {
  label?: string;
  key: keyof L;
  value?: (item: L) => ReactNode;
  sortBy?: string;
};

type DetailHeadEntryBase<D extends object> = {
  label: string;
  key: keyof D;
  value?: (item: D) => ReactNode;
};
export type DetailHeadEntry<D extends object> = DetailHeadEntryBase<D> | ((item: D) => ReactNode);

export type EditHeadEntry<E extends object> = DetailHeadEntryBase<E> & {
  setValue?: (value: any) => string | number | Array<string | number>;
  editType: "text" | "number" | "image_url" | "date" | "datetime" | "inherit" | { value: string; display: string }[];
};

export type CreationHeadEntry<C extends object> = EditHeadEntry<C>;

export type AdminDataComplexProps<
  L extends object,
  D extends object,
  E extends object,
  C extends object
> = BaseProps & {
  //List
  listHead: ListHeadEntry<L>[];
  onGetList: OnGetListFunc<L>;
  listDeps?: DependencyList;
  onClickListItem?: (item: L) => void | PromiseLike<any>;

  //DetailDialog
  detailHead?: DetailHeadEntry<D>[];
  onGetDetail?: OnGetDetailFunc<L, D>;

  //Edit
  editHead?: EditHeadEntry<E>[];
  onSubmitEdit?: OnSetEdited<E>;

  //Create
  creationHead?: CreationHeadEntry<C>[];
  onSubmitCreate?: OnSetCreated<C>;
};

export default function AdminDataComplex<L extends object, D extends object, E extends object, C extends object>({
  className,
  //L
  listHead,
  onGetList,
  listDeps,
  onClickListItem,
  //D
  detailHead,
  onGetDetail,
  //E
  editHead,
  onSubmitEdit,
  //C
  creationHead,
  onSubmitCreate,
}: AdminDataComplexProps<L, D, E, C>) {
  /* --------------------------------- Create --------------------------------- */

  const showCreateRaw = useEditDialog<C>();

  const showCreate = useCallback(() => {
    if (creationHead && onSubmitCreate) {
      showCreateRaw(creationHead, onSubmitCreate, {} as any);
    }
  }, [creationHead, onSubmitCreate, showCreateRaw]);

  /* ---------------------------------- Edit ---------------------------------- */

  const showEditRaw = useEditDialog<E>();

  const showEdit = useCallback(
    (item: D) => {
      if (editHead && onSubmitEdit) {
        showEditRaw(editHead, onSubmitEdit, { ...item } as any);
      }
    },
    [editHead, onSubmitEdit, showEditRaw]
  );

  /* --------------------------------- Detail --------------------------------- */

  const showDetailRaw = useDetailDialog<L, D>(onSubmitEdit && showEdit);

  const showDetail = useCallback(
    (item: L) => {
      if (detailHead && onGetDetail) {
        showDetailRaw(item, detailHead, onGetDetail, "상세 정보");
      }
    },
    [detailHead, onGetDetail, showDetailRaw]
  );

  /* ---------------------------------- List ---------------------------------- */

  const List = useGetApiWithPagination(onGetList, { initialPage: 0, pageSize: 20 }, listDeps);

  const doOnClickListItem = useCallback(
    async (item: L) => {
      onClickListItem && (await onClickListItem(item));
      detailHead && showDetail(item);
    },
    [detailHead, onClickListItem, showDetail]
  );

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
      <div className="p-2 flex flex-row space-x-2">
        <Button onClick={List.invalidate} className="ml-a" variant="tonal" tint="primary" iconStart={<IoRefresh />} />
        {creationHead && onSubmitCreate && (
          <Button onClick={showCreate} className="ml-a" variant="contained" tint="primary" iconStart={<IoAdd />}>
            추가
          </Button>
        )}
      </div>
      <table className="hq-data-table flex-1 w-full h-full">
        <thead>
          {listHead.map(({ key, label }) => (
            <th key={key.toString()}>{label}</th>
          ))}
        </thead>
        <tbody className={clsx()}>
          {List.data?.list.map((item, i) => (
            <tr key={i} className="pressable-opacity" onClick={() => doOnClickListItem(item)}>
              {listHead.map(({ key, value }) => (
                <td key={key.toString()}>{value ? value(item) : `${item[key]}`}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="py-4">
        <PaginationBar
          currentPageIndex={List.page}
          pageCount={List.data?.totalPages ?? 0}
          onPageSelected={List.setPage}
        />
      </div>
    </div>
  );
}
