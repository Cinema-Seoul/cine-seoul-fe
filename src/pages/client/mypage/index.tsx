import clsx from "clsx";
import MainLayout from "../../_layouts/main-layout";
import { IoChevronForward, IoPencil } from "react-icons/io5";
import { Button } from "@/components/ui";
import { Link } from "react-router-dom";
import { createContext, useContext } from "react";
import { getMe } from "@/services/user/user.service";
import { useUser } from "@/services/user/user.application";
import { useGetApi } from "@/services/api";
import { User } from "@/types";

function LocalHeader({ title }: { title: string }) {
  return (
    <header className="bg-neutral-2">
      <div className="container pt-32">
        <div className="py-6">
          <h2 className="text-2xl font-bold text-primary-11">{title}</h2>
        </div>
      </div>
    </header>
  );
}

function ProfileSection({ className }: BaseProps) {
  const { UserDetail } = useContext(MyPageContext);

  if(!UserDetail) return null;

  return (
    <section className={clsx(className, "rounded bg-primary-2 out-1 outline-primary-6")}>
      <div className="p-4 text-right text-2xl bg-primary-9 text-primary-1">
        <p>안녕하세요,</p>
        <p>
          <strong>{UserDetail.data?.name ?? "고객"}</strong>님!
        </p>
      </div>
      <div className="p-4">
        <ul className="flex flex-col text-right items-end">
          <li className="col-12 md:col-6">
            <span className="float-left">포인트</span>
            <span className="font-bold">{UserDetail.data?.point.toLocaleString()}</span>원
          </li>
        </ul>
      </div>
    </section>
  );
}

function ProfileMenuSection({ className }: BaseProps) {
  return (
    <div className={className}>
      <div className="flex flex-row justify-end">
        <Button as={Link} to="/my/edit" variant="text" iconStart={<IoPencil />}>
          내 정보 수정
        </Button>
      </div>
    </div>
  );
}

function TicketsSection({ className }: BaseProps) {
  return (
    <section className={clsx(className, "rounded bg-neutral-2 out-1 outline-neutral-6")}>
      <div className="p-4 border-b border-solid border-neutral-6">
        <h2 className="text-xl font-bold">내 티켓</h2>
      </div>
      <div className="">
        <ul className="">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="border-b border-solid border-neutral-6 pressable-opacity">
              <div className="cursor-pointer p-4 flex flex-row items-center">
                <div className="flex-1">
                  <div className="font-bold">미드소마</div>
                  <div className="text-sm space-x-4">
                    <span>
                      상영관 <strong>A</strong>
                    </span>
                    <span>
                      상영 시각 <strong>wer</strong>
                    </span>
                    <span>
                      상영 시각 <strong>wer</strong>
                    </span>
                  </div>
                </div>
                <div className="flex-0">
                  <IoChevronForward />
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="p-4">
          <Button as={Link} to="/my/ticket" variant="text">더 보기</Button>
        </div>
      </div>
    </section>
  );
}

type MyPageContextProps = {
  UserDetail?: ReturnType<typeof useGetApi<User>>
}

const MyPageContext = createContext<MyPageContextProps>({});

export default function MyPage() {
  const currentUser = useUser();

  if (!currentUser) {
    throw Error("로그인이 필요한 서비스예요");
  }

  const UserDetail = useGetApi(() => getMe(currentUser.userNum));

  return (
    <MainLayout>
      <MyPageContext.Provider value={{ UserDetail }}>
      <LocalHeader title="내 정보" />
      <main className="bg-neutral-1 py-6 border-t border-solid border-neutral-6">
        <div className="container">
          <div className="row">
            <div className="col">
              <ProfileSection />
              <ProfileMenuSection className="mt-6" />
            </div>
            <div className="col">
              <TicketsSection />
            </div>
          </div>
        </div>
      </main>
      </MyPageContext.Provider>
    </MainLayout>
  );
}
