import { useRouteError } from "react-router-dom";

interface AdminErrorPageProps {
  noRoute?: boolean;
}

export default function AdminErrorPage({
  noRoute = false,
}: AdminErrorPageProps) {
  const error = useRouteError() as Response;

  return (
    <div>
      <p>{`이런! 문제가 발생했어요 :(`}</p>
      <div>
        {noRoute || error.status === 404 ? (
          <p>존재하지 않는 페이지예요</p>
        ) : (
          <p>오류가 발생했어요 (에러코드: {error.status})</p>
        )}
      </div>
    </div>
  );
}
