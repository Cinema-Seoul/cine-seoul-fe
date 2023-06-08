import Form from "@/ui/components/form/primitive";
import MainLayout from "../../_layouts/main-layout";
import clsx from "clsx";

function EditForm({ className }: BaseProps) {
  const userNum = /* TODO: userNum */ 0;

  return <Form initialValues={{
    name: "",
    phoneNum: "",
    pw: "",
  }} onSubmit={() => undefined}>
    <table className={clsx(className, "table-fixed")}>
      <tr>
        <th>이름</th>
        <td>
          <Form.Input type="text" inputId="name" />
        </td>
      </tr>
      <tr>
        <th>이름</th>
        <td>
          <Form.Input type="text" inputId="name" />
        </td>
      </tr>
      <tr>
        <th>이름</th>
        <td>
          <Form.Input type="text" inputId="name" />
        </td>
      </tr>
    </table>
  </Form>;
}

export default function MyProfileEditPage() {
  return <MainLayout></MainLayout>;
}
