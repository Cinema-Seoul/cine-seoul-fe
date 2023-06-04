import { useForm } from "@/hooks/form";
import axios, { AxiosError } from "axios";
import MainLayout from "../_layouts/main-layout";
import { Button } from "@/ui/components/ui";

type SignUpPageForm = {
  id: string;
  pw: string;
  pwConfirm: string;
  name: string;
  phoneNum: string;
  residentNum: string;
};

export default function SignUpPage() {
  const {
    inputValues,
    inputErrors,
    handleOnSubmit,
    handleValueChanged,
    loadingOnSubmit,
  } = useForm<SignUpPageForm>(
    {
      id: "",
      pw: "",
      pwConfirm: "",
      name: "",
      phoneNum: "",
      residentNum: "",
    },
    (values) =>
      axios
        .post("/user", {
          ...values,
          // TODO: 현재 백엔드 오류로 인해 이름을 null로만 받음
          name: null,
          role: 'M',
        })
        .catch((e: AxiosError<{ message: string }>) => {
          alert(e.response?.data.message);
        })
        .then((res) => {
          alert(res);
        }),
    (id, value) => {
      console.log("Validate", id, value);

      if (id === "id") {
        const result = /^[A-Za-z]/.test(value);
        console.log("RESULT: ", result);
        return {
          result: result ? "ok" : "reject",
          message: result ? undefined : "아이디는 영문(a-z)으로 시작해야 해요.",
        };
      } else if (id === "pwConfirm") {
        // const result = value === inputValues.pw;
        // return {
        //   result: result ? "ok" : "reject",
        //   message: result ? undefined : "앞서 쓴 비밀번호와 달라요.",
        // };
      } else if (id === "phoneNum") {
        const result = /^[0-9]{0,11}$/.test(value);
        return {
          result: result ? "ok" : "reject",
          message: result
            ? undefined
            : "'-' 없이 숫자로만, 최대 11자리 입력해주세요.",
        };
      }

      return {
        result: "ok",
      };
    }
  );

  return (
    <MainLayout>
      <div className="container py-16">
        <form onSubmit={handleOnSubmit}>
          <table className="table-fixed w-full max-w-196 mx-a border-separate border-spacing-4">
            <tr>
              <th>
                <label htmlFor="id">아이디</label>
              </th>
              <td>
                <input type="text" name="id" onChange={handleValueChanged} />
              </td>
              <td>
                <span className="text-sm text-red-4">
                  {inputErrors.id?.message}
                </span>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="pw">비밀번호</label>
              </th>
              <td>
                <input
                  type="password"
                  name="pw"
                  onChange={handleValueChanged}
                />
              </td>
              <td>
                <span className="text-sm text-red-4">
                  {inputErrors.pw?.message}
                </span>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="pwConfirm">비밀번호 확인</label>
              </th>
              <td>
                <input
                  type="password"
                  name="pwConfirm"
                  onChange={handleValueChanged}
                />
              </td>
              <td>
                <span className="text-sm text-red-4">
                  {inputErrors.pwConfirm?.message}
                </span>
              </td>
            </tr>
            <hr />
            <tr>
              <th>
                <label htmlFor="name">이름</label>
              </th>
              <td>
                <input type="text" name="name" onChange={handleValueChanged} />
              </td>
              <td>
                <span className="text-sm text-red-4">
                  {inputErrors.name?.message}
                </span>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="phoneNum">전화 번호</label>
              </th>
              <td>
                <input
                  type="tel"
                  name="phoneNum"
                  onChange={handleValueChanged}
                />
              </td>
              <td>
                <span className="text-sm text-red-4">
                  {inputErrors.phoneNum?.message}
                </span>
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="residentNum">주민등록번호</label>
              </th>
              <td>
                <input
                  type="tel"
                  name="residentNum"
                  onChange={handleValueChanged}
                />
              </td>
              <td>
                <span className="text-sm text-red-4">
                  {inputErrors.residentNum?.message}
                </span>
              </td>
            </tr>
          </table>
          <div className="mt-24">
            <Button
              as="button"
              type="submit"
              variant="contained"
              tint="primary"
            >
              가입하기
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
