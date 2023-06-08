import Form from "@/components/form/primitive";
import MainLayout from "../../../_layouts/main-layout";
import clsx from "clsx";
import { useUser } from "@/services/user/user.application";
import { useGetApi, useSetApi } from "@/services/api";
import { editUserDetail, getUserDetail } from "@/services/user/user.service";

function EditForm({ className }: BaseProps) {
  const currentUser = useUser();

  if (!currentUser) {
    throw Error("로그인이 필요한 서비스예요.");
  }

  

  const { apiAction } = useSetApi(() => editUserDetail({
    "name": "바꾼 이름",
  }))

  return <Form initialValues={{
    name: "",
    phoneNum: "",
    pw: "",
  }} onSubmit={(e, values) => {
    e.preventDefault();
    console.log(values);
    apiAction();
    }}>
    <table className={clsx(className, "table-fixed")}>
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
    <input type="submit" />
  </Form>;
}

export default function MyProfileEditPage() {
  return <MainLayout>
    <EditForm />
  </MainLayout>;
}
