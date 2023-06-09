import { Button } from "@/components/ui";
import { Link } from "react-router-dom";

export default function NeedSignPage() {
  return (
    <section className="py-32">
      <div className="text-center font-bold text-2xl">
        <p>예매를 진행하기 위해서는 로그인이 필요해요</p>
      </div>
      <div className="container py-8">
        <p className="col-6 mx-a mb-8">많은 혜택을 누릴 수 있는</p>
        <p>
          <Button as={Link} variant="contained" tint="primary" to="/signin" className="col-6 mx-a py-4">회원으로 예매하기</Button>
        </p>
      </div>
      <div>
        <p className="text-center mb-2">혹은</p>
        <p>
          <Button as={Link} className="col-4 mx-a" variant="text">비회원으로 예매하기</Button>
        </p>
      </div>

    </section>
  );
}
