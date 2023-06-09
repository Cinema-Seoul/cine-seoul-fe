import Form from "@/components/form/primitive";
import { Button } from "@/components/ui";
import { useAlertDialog } from "@/components/ui/modal/dialog-alert";
import { useUserActions } from "@/services/user/user.application";
import { UserRole } from "@/types";
import { FormEventHandler, MouseEventHandler, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminSignInPage() {

  const alertDialog = useAlertDialog();
  const navigate = useNavigate();
  const { loading, signInMember } = useUserActions();

  const doOnSubmit: FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const [id, pw] = [formData.get("id")?.toString() ?? "", formData.get("pw")?.toString() ?? ""];
    signInMember(id, pw).then(() => {
        alertDialog("로그인이 완료되었습니다.");
        navigate("/admin");
    });
  }, [alertDialog, navigate, signInMember]);

  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center">
      <div className="card shadow-xl p-8">
        <h2 className="text-2xl font-bold text-primary-11">
          시네마서울<small className="ml-2">관리자</small>
        </h2>
        <form className="mt-8 space-y-2" onSubmit={doOnSubmit}>
          <div>
            <input type="text" name="id" placeholder="아이디" />
          </div>
          <div>
            <input type="password" name="pw" placeholder="비밀번호" />
          </div>
          <div className="pt-4">
            <Button type="submit" disabled={loading} className="ml-a" variant="contained" tint="primary">로그인</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
