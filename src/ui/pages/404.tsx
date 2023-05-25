import MainLayout from "./_layouts/main-layout";

export default function A404Page() {
  return (
    <MainLayout>
      <section className="text-base prose mx-a text-center">
        <h2>404!</h2>
        <p>요청하신 페이지를 찾을 수 없어요.</p>
      </section>
    </MainLayout>
  );
}
