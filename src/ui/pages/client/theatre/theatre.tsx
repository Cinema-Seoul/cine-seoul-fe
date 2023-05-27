import ReactMarkdown from 'react-markdown';

import MainLayout from "../../_layouts/main-layout";

const infoContent = `
  # 시네마 서울

  *시네마 서울*은 어쩌고 저쩌고....

  [구글](https://google.com)

  ![](/vite.svg)
`;

export default function TheatreInfoPage() {
  return (
    <MainLayout>
      <div className="container">
        <article className="prose">
          <ReactMarkdown>{infoContent}</ReactMarkdown>
        </article>
      </div>
    </MainLayout>
  )
}