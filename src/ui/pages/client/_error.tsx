import { useRouteError } from "react-router-dom";
import MainLayout from "../_layouts/main-layout";

interface ClientErrorPageProps {
  noRoute?: boolean;
}

export default function ClientErrorPage({
  noRoute = false,
}: ClientErrorPageProps) {
  const error = useRouteError() as Response;

  return (
    <MainLayout>
      <section className="text-base prose mx-a py-6 text-center">
        <p className="text-xl font-bold">{`이런! 문제가 발생했어요 :(`}</p>
        <div>
          {noRoute || error.status === 404 ? (
            <p>존재하지 않는 페이지예요</p>
          ) : (
            <p>오류가 발생했어요 (에러코드: {error.status})</p>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
