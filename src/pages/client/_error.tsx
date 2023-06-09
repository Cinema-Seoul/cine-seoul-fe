import { useRouteError } from "react-router-dom";
import MainLayout from "../_layouts/main-layout";
import { NeedSignError } from "@/services/user/user.application";
import { IoLockClosed } from "react-icons/io5";
import { Link } from "react-router-dom";

interface ClientErrorPageProps {
  noRoute?: boolean;
}

export default function ClientErrorPage({ noRoute = false }: ClientErrorPageProps) {
  const error = useRouteError() as any;

  if (error === NeedSignError) {
    return (
      <MainLayout>
        <section className="container text-center py-16">
          <div>
            <div className="text-4xl flex justify-center">
              <IoLockClosed />
            </div>
            <h4 className="text-2xl font-bold">로그인이 필요한 서비스예요</h4>
          </div>
          <div>
            <Link to="/signin">로그인하러 가기</Link>
          </div>
        </section>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="text-base prose mx-a py-6 text-center">
        <p className="text-xl font-bold">{`이런! 문제가 발생했어요 :(`}</p>
        <div className="pb-64">
          {noRoute || error.status === 404 ? (
            <p>존재하지 않는 페이지예요</p>
          ) : (
            <p>{(error as Error).message ? error.message : `오류가 발생했어요 (에러코드: ${error.status})`}</p>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
