import type { Movie, Schedule, Screen } from "./domains";



export const fakeScreens: Screen[] = [
  {
    screenNum: 0x10,
    name: '1관',
    seats: [],
    totalSeat: 2,
  },
  {
    screenNum: 0x20,
    name: '2관',
    seats: [],
    totalSeat: 2,
  },
  {
    screenNum: 0x180,
    name: '8관 (IMAX)',
    seats: [],
    totalSeat: 10,
  },
]

export const fakeMovies: Movie[] = [
  {
    movieNum: 12,
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ySLgOnBTgt7a3Sv1qTVJUDMZJvu.jpg",
    title: "트랜짓",
    grade: "12",
    info: "모두가 떠나는 곳에서 그녀를 만났다\n독일군이 파리로 진군하자 ‘게오르그’는 마르세유로 탈출한다. 그는 자살한 ‘바이델’ 작가의 가방을 갖고 있는데 가방에는 작가의 원고와 아내에게서 온 편지, 멕시코 대사관에서 온 비자 허가서가 있다. ‘게오르그’는 ‘바이델’ 작가로 신분을 위조해 멕시코로 떠나려 하지만 신비한 여인 ‘마리’를 만나며 모든 것이 변하게 된다.",
    isShowing: true,
    releaseDate: null,
    runningTime: 150,
  },
  {
    movieNum: 530385,
    poster:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/bAaeuzr7vzf8EWbhVAyXVIMhXZa.jpg",
    title: "미드소마",
    grade: "18",
    info: "이런 축제는 처음이야\n한여름, 낮이 가장 긴 날 열리는 미드소마에 참석하게 된 친구들. 꽃길인 줄 알고 들어간 지옥길, 축제가 끝나기 전까지 절대 빠져나올 수 없다. 큰 상실을 겪은 대니가 남자친구 크리스티안과 비밀스러운 스웨덴의 한 마을에서 한여름 낮이 가장 긴 날 열리는 하지 축제에 참석해 기이한 경험을 겪고 점점 공포에 빠져들게 되는데...",
    isShowing: true,
    releaseDate: new Date(2019, 7, 11),
    runningTime: 148,
  },
];

export const fakeSchedules: Schedule[] = [
  {
    screen: fakeScreens[2],
    movie: fakeMovies[1],
    screenType: null,
    movieType: '자막',
    emptySeat: 1,
    order: 2,
    schedNum: 1,
    schedTime: new Date(2022, 5, 26),
  },
  {
    screen: fakeScreens[2],
    movie: fakeMovies[1],
    screenType: null,
    movieType: '더빙',
    emptySeat: 1,
    order: 2,
    schedNum: 2,
    schedTime: new Date(2022, 5, 26),
  },
  {
    screen: fakeScreens[0],
    movie: fakeMovies[0],
    screenType: null,
    movieType: '자막',
    emptySeat: 1,
    order: 2,
    schedNum: 3,
    schedTime: new Date(2022, 5, 26),
  },
  {
    screen: fakeScreens[1],
    movie: fakeMovies[1],
    screenType: null,
    movieType: '자막',
    emptySeat: 1,
    order: 2,
    schedNum: 4,
    schedTime: new Date(2022, 5, 26),
  },
  {
    screen: fakeScreens[0],
    movie: fakeMovies[0],
    screenType: null,
    movieType: '자막',
    emptySeat: 1,
    order: 2,
    schedNum: 5,
    schedTime: new Date(2022, 5, 26),
  },
];