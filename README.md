# CinemaSeoul Frontend

## 폴더 구조

```
- src
  - @types    
  - domains   
  - services  
  - stores    
  - utils
  - ui        
    - components  
    - pages       
    - stories     
    - styles      
```

## 라우팅 구조

#### 일반 고객용

- 메인
  - [x] `/`
  - [x] `/movie`
  - [x] `/theatre`
- 사용자
  - [ ] `/user`
  - [ ] `/user/settings`
  - [ ] `/user/settings/adult`
  - [ ] `/user/history`
  - [ ] `/user/tickets`
- 영화 정보
  - [ ] `/movie`
  - [ ] `/movie/:num`
- 극장 정보
  - [x] `/theatre`
  - [ ] `/theatre/schedules`
- 예매 시스템
  - [ ] `/ticketing`
  - [ ] `/ticketing/payment`
- 계정
  - [x] `/signin`
  - [ ] `/signup`

#### 관리자용

- 메인
  - [ ] `/admin`
  - [ ] `/admin/movie`
- 영화
  - [ ] `/admin/movie?p=movie`
  - [ ] `/admin/movie?p=genre`
  - [ ] `/admin/`
- 예매
  - [ ] `/admin/ticketing`: 예매 목록 조회
  - [ ] `/admin/ticketing/detail?id=`: 예매 세부 사항 조회 및 관리
- 사용자 관리
  - [ ] `/admin/user/admin`
  - [ ] `/admin/user/customer`