import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui";
import MainLayout from "../_layouts/main-layout";
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import { useGetApi, useSetApi } from "@/services/api";
import axios, { AxiosError } from "axios";
import { useForm } from "@/hooks/form";
import { useUserStore } from "@/stores/user.store";
import { UserSignInMember, UserSignInNonmember } from "@/types";
import { useUserActions } from "@/services/user/user.application";
import { useAlertDialog } from "@/components/ui/modal/dialog-alert";
import { signUpNonmember } from "@/services/user/user.service";

const $ = {
  inputClasses: "block w-full bg-neutral-1 out-1 outline-neutral-7 leading-6 focus:outline-primary-8 rounded h-8 p-2",
};

export default function SignInNonmemberPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({
    redirect: "/",
  });

  const alertDialog = useAlertDialog();

  const { currentUser, setCurrentUser } = useUserStore();
  const { signInUpNonmember } = useUserActions();

  useEffect(() => {
    if (currentUser) {
      navigate(searchParams.get("redirect") || "/");
    }
  }, [currentUser, navigate, searchParams]);

  const submitForm = async ({ name, pw, phoneNum }: UserSignInNonmember) => {
    await signInUpNonmember(name, pw, phoneNum).catch((e) => {
      alertDialog("기존 등록된 정보가 있습니다. 전화번호 또는 비밀번호를 확인해주세요.");
    });
  };

  const { inputValues, inputErrors, handleOnSubmit, handleValueChanged, loadingOnSubmit } =
    useForm<UserSignInNonmember>(
      {
        name: "",
        phoneNum: "",
        pw: "",
      },
      submitForm
    );

  return (
    <MainLayout>
      <div className="container py-24">
        <div className="out-1 outline-neutral-6 bg-neutral-2 mx-a rounded col-6">
          <div className="w-full p-6">
            <h2 className="text-xl font-bold text-center">비회원 로그인</h2>
          </div>
          <div className="w-full p-6">
            <form onSubmit={handleOnSubmit}>
              <div className="max-w-96 mx-a space-y-2">
                <p>
                  <label htmlFor="name">이름</label>
                  <input type="text" name="name" onChange={handleValueChanged} className={$.inputClasses} />
                </p>
                <p>
                  <label htmlFor="phoneNum">전화번호</label>
                  <input type="text" name="phoneNum" onChange={handleValueChanged} className={$.inputClasses} />
                </p>
                <p>
                  <label htmlFor="pw">비밀번호</label>
                  <input type="password" name="pw" onChange={handleValueChanged} className={$.inputClasses} />
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-solid border-neutral-6">
                <Button
                  as="button"
                  type="submit"
                  variant="contained"
                  tint="primary"
                  className="block col-6 mx-a"
                  disabled={loadingOnSubmit}
                >
                  로그인
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="text-center p-6">
          <p>시네마 서울 회원이 아니신가요?</p>
          <p className="space-x-4">
            <Link to="/signup" className="text-lg underline">
              회원 가입
            </Link>
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
