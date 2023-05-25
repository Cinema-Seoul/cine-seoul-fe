import { Link } from "react-router-dom";
import { Button } from "../components/ui";
import MainLayout from "./_layouts/main-layout";

export default function SignInPage() {
  return (
    <MainLayout>
      <div className="container pt-16">
        <div className="out-1 outline-neutral-6 bg-neutral-2 mx-a rounded col-6">
          <div className="w-full p-6">
            <h2 className="text-xl font-bold text-center">로그인</h2>
          </div>
          <div className="w-full p-6">
            <form method="POST">
              <div className="max-w-96 mx-a space-y-2">
                <p>
                  <label htmlFor="userId">아이디</label>
                  <input
                    type="text"
                    name="userId"
                    className="block w-full bg-neutral-1 out-1 outline-neutral-7 leading-6 focus:outline-primary-8 rounded h-8 p-2"
                  />
                </p>
                <p>
                  <label htmlFor="password">비밀번호</label>
                  <input
                    type="password"
                    name="password"
                    className="block w-full bg-neutral-1 out-1 outline-neutral-7 leading-6 focus:outline-primary-8 rounded h-8 p-2"
                  />
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-solid border-neutral-6">
                <Button
                  as="button"
                  type="submit"
                  variant="contained"
                  tint="primary"
                  className="block col-6 mx-a"
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
