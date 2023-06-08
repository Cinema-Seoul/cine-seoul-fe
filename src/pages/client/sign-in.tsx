import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/ui/components/ui";
import MainLayout from "../_layouts/main-layout";
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from "react";
import { useGetApi, useSetApi } from "@/services/api";
import axios, { AxiosError } from "axios";
import { useForm } from "@/hooks/form";
import { useUserStore } from "@/stores/user.store";
import { requestSignInUser } from "@/services/user/user.service";
import { UserSignInMember } from "@/types";

const $ = {
  inputClasses: "block w-full bg-neutral-1 out-1 outline-neutral-7 leading-6 focus:outline-primary-8 rounded h-8 p-2",
};

export default function SignInPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useUserStore();

  useEffect(() => {
    if (currentUser) {
      navigate(-1);
    }
  }, [currentUser]);

  const submitForm = async (values: UserSignInMember) => {
    await axios
      .post("/user/login", values, {
        params: { isMember: true },
      })
      .then((res) => {
        alert(res.data.message);
        setCurrentUser({
          accessToken: res.data.data,
          isMember: true,
          userId: values.id,
          userNum: 0,
          name: "",
        });
      })
      .catch((e: AxiosError<{ message: string }>) => {
        alert("로그인에 실패하였어요\n" + (e.response?.data.message ?? e.response?.data));
      });
  };

  const { inputValues, inputErrors, handleOnSubmit, handleValueChanged, loadingOnSubmit } = useForm<UserSignInMember>(
    {
      id: "",
      pw: "",
    },
    submitForm
  );

  return (
    <MainLayout>
      <div className="container py-24">
        <div className="out-1 outline-neutral-6 bg-neutral-2 mx-a rounded col-6">
          <div className="w-full p-6">
            <h2 className="text-xl font-bold text-center">로그인</h2>
          </div>
          <div className="w-full p-6">
            <form onSubmit={handleOnSubmit}>
              <div className="max-w-96 mx-a space-y-2">
                <p>
                  <label htmlFor="id">아이디</label>
                  <input type="text" name="id" onChange={handleValueChanged} className={$.inputClasses} />
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
            <Link to="/signup" className="text-lg underline">
              비회원 예매 조회
            </Link>
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
