import { useForm } from "@/hooks/form";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui";
import Form, { FormInputPattern, FormRoot, FormRootProps, FormSubmitFunc } from "@/components/form/primitive";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAlertDialog } from "@/components/ui/modal/dialog-alert";
import { useUser } from "@/services/user/user.application";
import { signUpAdmin, signUpMember } from "@/services/user/user.service";
import { UserCreation } from "@/types";

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

const SIGN_UP_PAGE_FORM_PATTERNS: Partial<Record<keyof SignUpPageForm, FormInputPattern[] | FormInputPattern>> = {
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
  residentNum: [
    {
      test: /^[0-9]{13}$/,
      errorMessage: "숫자 13자리를 정확히 입력해주세요",
    },
  ],
};

export default function AdminSignUpPage() {
  const [loading, setLoading] = useState<boolean>(false);

  const alertDialog = useAlertDialog();

  const doOnSubmit: FormSubmitFunc<SignUpPageForm> = (e, values) => {
    e.preventDefault();
    setLoading(true);
    signUpAdmin(values)
      .then(() => {
        alertDialog("새로운 관리자가 등록되었습니다.");
      })
      .catch((e: AxiosError<{ message: string }>) => {
        alertDialog("" + e.response?.data.message, "오류");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container py-16">
      <Form
        initialValues={{
          id: "",
          pw: "",
          pwConfirm: "",
          name: "",
          phoneNum: "",
          residentNum: "",
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
          <tr>
            <td>
              <hr />
            </td>
          </tr>
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
                placeholder="010 1234 1234"
                patterns={SIGN_UP_PAGE_FORM_PATTERNS.phoneNum}
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="residentNum">주민등록번호</label>
            </td>
            <td>
              <Form.Input
                type="text"
                inputId="residentNum"
                patterns={SIGN_UP_PAGE_FORM_PATTERNS.residentNum}
                required
              />
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
                관리자 계정 등록하기
              </Button>
            )}
          />
        </div>
      </Form>
    </div>
  );
}
