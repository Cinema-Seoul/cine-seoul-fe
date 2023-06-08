import type { Meta, StoryObj } from "@storybook/react";
import MovieCard from "./movie-card";

const meta = {
  title: "Components/MovieCard",
  component: MovieCard,
} satisfies Meta<typeof MovieCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    className: "w-[256px]",
    data: {
      title: "슈퍼 마리오 브라더스",
      imageUrl: "https://search.pstatic.net/common?type=o&size=480x720&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20230309_3%2F1678329123596Kpcdb_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2",
      grade: "all",
      summary: "따단-딴-따단-딴 전 세계를 열광시킬 올 타임 슈퍼 어드벤처의 등장! 뉴욕의 평범한 배관공 형제 '마리오'와 ‘루이지’는 배수관 고장으로 위기에 빠진 도시를 구하려다 미스터리한 초록색 파이프 안으로 빨려 들어가게 된다. 파이프를 통해 새로운 세상으로 차원 이동하게 된 형제. 형 '마리오'는 뛰어난 리더십을 지닌 '피치'가 통치하는 버섯왕국에 도착하지만 동생 '루이지'는 빌런 '쿠파'가 있는 다크랜드로 떨어지며 납치를 당하고 ‘마리오’는 동생을 구하기 위해 ‘피치’와 ‘키노피오’의 도움을 받아 '쿠파'에 맞서기로 결심한다. 그러나 슈퍼스타로 세상을 지배하려는 그의 강력한 힘 앞에 이들은 예기치 못한 위험에 빠지게 되는데...! 동생을 구하기 위해! 세상을 지키기 위해! '슈퍼 마리오'로 레벨업 하기 위한 '마리오'의 스펙터클한 스테이지가 시작된다!"
    },
    onClick: undefined,
  }
}