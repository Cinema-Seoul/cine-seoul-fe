import Form, { FormSubmitFunc } from "@/components/form/primitive";
import MainLayout from "../../../_layouts/main-layout";
import clsx from "clsx";
import { useUser } from "@/services/user/user.application";
import { useGetApi, useSetApi } from "@/services/api";
import { editMyDetail, getMe, getUserDetail } from "@/services/user/user.service";
import { Button } from "@/components/ui";
import { UserEditing } from "@/types";
import { MouseEventHandler, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAlertDialog } from "@/components/ui/modal/dialog-alert";

type EditProfileFormValues = {
  name?: string;
  phoneNum?: string;
  pw?: string;
};

function EditForm({ className }: BaseProps) {
  const currentUser = useUser();

  if (!currentUser) {
    throw Error("로그인이 필요한 서비스예요.");
  }

  const navigate = useNavigate();
  const alertDialog = useAlertDialog();

  const GetInitial = useGetApi(() => getMe());
  const Edit = useSetApi((body: UserEditing) => editMyDetail(body));

  const doOnSubmit: FormSubmitFunc<EditProfileFormValues> = useCallback(
    (e, values) => {
      e.preventDefault();
      const hasPw = values.pw ? values.pw.length > 0 : false;
      Edit.apiAction({
        name: values.name,
        phoneNum: values.phoneNum,
        pw: hasPw ? values.pw : undefined,
      })
        .then(() => {
          navigate("/my");
        })
        .catch((e) => {
          alertDialog(
            <>
              오류가 발생했어요
              <br />
              {e.response?.data?.message}
            </>
          );
        });
    },
    [Edit, alertDialog, navigate]
  );

  if (!GetInitial.data) {
    return null;
  }

  return (
    <Form
      initialValues={
        {
          ...GetInitial.data,
          pw: undefined,
        } as EditProfileFormValues
      }
      onSubmit={doOnSubmit}
    >
      <table className={clsx(className, "hq-form-table")}>
        <tr>
          <th>이름</th>
          <td>
            <Form.Input type="text" inputId="name" />
          </td>
        </tr>
        <tr>
          <th>전화 번호</th>
          <td>
            <Form.Input type="text" inputId="phoneNum" />
          </td>
        </tr>
        <tr>
          <th>비밀번호 변경</th>
          <td>
            <Form.Input type="password" inputId="pw" />
          </td>
        </tr>
        <tr>
          <th>비밀번호 변경 확인</th>
          <td>
            <Form.Input type="password" inputId="pwConfirm" />
          </td>
        </tr>
      </table>
      <div>
        <Button className="mx-a" variant="contained" tint="primary" disabled={Edit.loading}>
          수정 완료
        </Button>
      </div>
    </Form>
  );
}

export default function MyProfileEditPage() {
  return (
    <MainLayout>
      <div className="container py-32">
        <EditForm className="mx-a" />
      </div>
    </MainLayout>
  );
}
