import { useForm } from "@/hooks/form";
import axios, { AxiosError } from "axios";
import MainLayout from "../_layouts/main-layout";
import { Button } from "@/ui/components/ui";
import Form, {
  FormInputPattern,
  FormRoot,
  FormRootProps,
} from "@/ui/components/form/primitive";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type SignUpPageForm = {
  id: string;
  pw: string;
  pwConfirm: string;
  name: string;
  phoneNum: string;
  residentNum: string;
};

const initialSignUpPageForm: SignUpPageForm = {
  id: "",
  pw: "",
  pwConfirm: "",
  name: "",
  phoneNum: "",
  residentNum: "",
};

const SIGN_UP_PAGE_FORM_PATTERNS: Partial<
  Record<keyof SignUpPageForm, FormInputPattern[] | FormInputPattern>
> = {
  id: [
    {
      test: /^[A-Za-z]/,
      errorMessage: "영문으로 시작해야 해요",
    },
  ],
  pwConfirm: [
    {
      test: (value, { pw }) => value === pw,
      errorMessage: "앞서 써주신 것과 달라요",
    },
  ],
  residentNum: [],
  phoneNum: [
    {
      test: /^[^-]+$/,
      errorMessage: "'-'를 포함하지 않고 숫자로만 써주세요",
    },
    {
      test: /^[0-9]{1,11}$/,
      errorMessage: "숫자로만 최대 11자리로 써주세요",
    },
  ],
};

export default function SignUpPage() {
  // const {
  //   inputValues,
  //   inputErrors,
  //   handleOnSubmit,
  //   handleValueChanged,
  //   loadingOnSubmit,
  // } = useForm<SignUpPageForm>(
  //   {
  //     id: "",
  //     pw: "",
  //     pwConfirm: "",
  //     name: "",
  //     phoneNum: "",
  //     residentNum: "",
  //   },
  //   (values) =>
  //     axios
  //       .post("/user", {
  //         ...values,
  //         // TODO: 현재 백엔드 오류로 인해 이름을 null로만 받음
  //         name: null,
  //         role: "M",
  //       })
  //       .catch((e: AxiosError<{ message: string }>) => {
  //         alert(e.response?.data.message);
  //       })
  //       .then((res) => {
  //         alert(res);
  //       }),
  //   (id, value) => {
  //     console.log("Validate", id, value);

  //     if (id === "id") {
  //       const result = /^[A-Za-z]/.test(value);
  //       console.log("RESULT: ", result);
  //       return {
  //         result: result ? "ok" : "reject",
  //         message: result ? undefined : "아이디는 영문(a-z)으로 시작해야 해요.",
  //       };
  //     } else if (id === "pwConfirm") {
  //       // const result = value === inputValues.pw;
  //       // return {
  //       //   result: result ? "ok" : "reject",
  //       //   message: result ? undefined : "앞서 쓴 비밀번호와 달라요.",
  //       // };
  //     } else if (id === "phoneNum") {
  //       const result = /^[0-9]{0,11}$/.test(value);
  //       return {
  //         result: result ? "ok" : "reject",
  //         message: result
  //           ? undefined
  //           : "'-' 없이 숫자로만, 최대 11자리 입력해주세요.",
  //       };
  //     }

  //     return {
  //       result: "ok",
  //     };
  //   }
  // );

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const doOnSubmit: FormRootProps["onSubmit"] = (e, values) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/user", {
        ...values,
        // TODO: 현재 백엔드 오류로 인해 이름을 null로만 받음
        name: null,
        role: "M",
      })
      .catch((e: AxiosError<{ message: string }>) => {
        alert(e.response?.data.message);
      })
      .then((res) => {
        alert(res);
        navigate("/signin");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <MainLayout>
      <div className="container py-16">
        <Form
          initialValues={{
            id: "",
            pw: "",
            pwConfirm: "",
            name: "",
            phoneNum: "",
          }}
          onSubmit={doOnSubmit}
        >
          <table className="table-auto w-full max-w-148 mx-a border-separate border-spacing-8">
            <tr>
              <td className="w-32">
                <label htmlFor="id">아이디</label>
              </td>
              <td className="">
                <Form.Input
                  className="w-full"
                  type="text"
                  inputId="id"
                  patterns={SIGN_UP_PAGE_FORM_PATTERNS.id}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="pw">비밀번호</label>
              </td>
              <td>
                <Form.Input type="password" inputId="pw" required />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="pwConfirm">비밀번호 확인</label>
              </td>
              <td>
                <Form.Input
                  type="password"
                  inputId="pwConfirm"
                  patterns={SIGN_UP_PAGE_FORM_PATTERNS.pwConfirm}
                  required
                />
              </td>
            </tr>
            <hr />
            <tr>
              <td>
                <label htmlFor="name">이름</label>
              </td>
              <td>
                <Form.Input type="text" inputId="name" required />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="phoneNum">전화 번호</label>
              </td>
              <td>
                <Form.Input
                  type="tel"
                  inputId="phoneNum"
                  placeholder="01012345678"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="residentNum">주민등록번호</label>
              </td>
              <td>
                <Form.Input type="number" inputId="residentNum" required />
              </td>
            </tr>
          </table>
          <div className="my-16">
            <Form.Conditional
              render={({ errors }) => (
                <Button
                  className="mx-a"
                  as="button"
                  type="submit"
                  variant="contained"
                  tint="primary"
                  disabled={loading || Object.values(errors).some((o) => o)}
                >
                  가입하기
                </Button>
              )}
            />
          </div>
        </Form>
      </div>
    </MainLayout>
  );
}
