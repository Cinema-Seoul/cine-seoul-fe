import ReactMarkdown from "react-markdown";

import MainLayout from "../../_layouts/main-layout";

const infoContent = `
  # 시네마 서울
  
  *영화의 감동을 섬세하게 전하는 공간*

  서울시네마는 영화를 사랑하는 이들에게 최상의 관람 경험을 선사하는 도시의 보석입니다. 우리는 고풍스러운 인테리어와 편안한 좌석을 갖춘 아름다운 극장을 제공하며, 다양한 장르와 언어의 영화를 엄선하여 상영합니다. 최신 음향 시스템과 초고화질 스크린으로 몰입감을 높이고, 친절하고 전문적인 스태프들이 최상의 서비스를 제공합니다.

  서울시네마는 영화관람의 새로운 차원을 경험하고자 하는 분들을 위한 최적의 장소입니다. 당신을 서울시네마의 세계로 초대합니다.

  ![](/vite.svg)
`;

export default function TheatreInfoPage() {
  return (
    <MainLayout>
      <div className="container">
        <article className="prose mx-a py-32">
          <ReactMarkdown>{infoContent}</ReactMarkdown>
        </article>
      </div>
    </MainLayout>
  );
}
