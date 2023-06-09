import { useGetApiWithPagination } from "@/services/api";
import { ListResponse } from "@/types";
import clsx from "clsx";
import { ReactNode, useCallback } from "react";
import { IoAdd } from "react-icons/io5";
import PaginationBar from "../pagination/pagination-bar";
import { Button, Loader } from "../ui";
import { useDetailDialog } from "./detail";
import { useEditDialog } from "./edit";

export type OnGetListFunc<T> = (page: number, size: number) => Promise<ListResponse<T>>;
export type OnGetDetailFunc<L, D> = (item: L) => Promise<D>;
export type OnSetEdited<E, D> = (result: E, detail: D) => Promise<unknown>;
export type OnSetCreated<C, D> = OnSetEdited<C, D>;

export type EditableEntry = {
  label: string;
  inputId: string;
  input?: ReactNode;
};

export type ListHeadEntry<L extends object> = {
  label: string;
  key: keyof L;
  value?: (item: L) => ReactNode;
  sortBy?: string;
};

export type DetailHeadEntry<D extends object> = {
  label: string;
  key: keyof D;
  value?: (item: D) => ReactNode;
  editable?: boolean;
  editType?: "text" | "number" | "image_url" | { value: string; display: string }[];
};

export type CreationHeadEntry<C extends object> = DetailHeadEntry<C>;

export type AdminDataComplexProps<
  L extends object,
  D extends object,
  E extends object,
  C extends object
> = BaseProps & {
  //List
  listHead: ListHeadEntry<L>[];
  onGetList: OnGetListFunc<L>;
  onClickListItem?: (item: L) => void;

  //DetailDialog
  detailHead?: DetailHeadEntry<D>[];
  onGetDetail?: OnGetDetailFunc<L, D>;

  //Edit
  onSubmitEdit?: OnSetEdited<E, D>;

  //Create
  creationHead?: CreationHeadEntry<C>[];
  onSubmitCreate?: OnSetCreated<C, D>;
};

export default function AdminDataComplex<L extends object, D extends object, E extends object, C extends object>({
  className,
  onGetList,
  listHead,
  onClickListItem,
  detailHead,
  onGetDetail,
  onSubmitEdit,
  creationHead,
  onSubmitCreate,
}: AdminDataComplexProps<L, D, E, C>) {
  /* --------------------------------- Create --------------------------------- */

  const showCreateRaw = useEditDialog<D, C>();

  const showCreate = useCallback(() => {
    if (creationHead && onSubmitCreate) {
      showCreateRaw(creationHead, onSubmitCreate, {} as any);
    }
  }, [creationHead, onSubmitCreate, showCreateRaw]);

  /* ---------------------------------- Edit ---------------------------------- */

  const showEditRaw = useEditDialog<D, E>();

  const showEdit = useCallback(
    (item: D) => {
      if (detailHead && onSubmitEdit) {
        showEditRaw(detailHead, onSubmitEdit, { ...item } as any);
      }
    },
    [detailHead, onSubmitEdit, showEditRaw]
  );

  /* --------------------------------- Detail --------------------------------- */

  const showDetailRaw = useDetailDialog<L, D>(onSubmitEdit && showEdit);

  const showDetail = useCallback(
    (item: L) => {
      if (!detailHead || !onGetDetail) {
        return;
      } else {
        showDetailRaw(item, detailHead, onGetDetail, "상세 정보");
      }
    },
    [detailHead, onGetDetail, showDetailRaw]
  );

  /* ---------------------------------- List ---------------------------------- */

  const List = useGetApiWithPagination(onGetList, { initialPage: 0, pageSize: 20 });

  const doOnClickListItem = useCallback(
    (item: L) => {
      onClickListItem && onClickListItem(item);
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
      {creationHead && onSubmitCreate && (
        <div className="p-2">
          <Button onClick={showCreate} className="ml-a" variant="contained" tint="primary" iconStart={<IoAdd />}>
            추가
          </Button>
        </div>
      )}
      <table className="hq-data-table flex-1 w-full h-full">
        <thead>
          {listHead.map(({ key, label, sortBy }) => (
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
