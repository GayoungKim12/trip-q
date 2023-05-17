# TripQ

- 여행 질문 커뮤니티
- [TripQ](https://trip-q.vercel.app/)로 이동하기

## Installation

- 패키지 관리 툴: `yarn`
- local 실행 방법: `yarn dev`

## Project Doc

### Built With

| package name | version |
| ------------ | ------- |
| React        | 18.2.0  |
| Typescript   | 5.0.2   |
| Router       | 6.10.0  |
| Recoil       | 0.7.7   |
| Vite         | 4.3.2   |
| Firebase     | 9.22.0  |

_자세한 개발 스택은 package.json 참고_

### Pages

1. 메인 페이지(/)

- 무한 스크롤 페이지네이션
- 여행지 검색 기능

2. 로그인 페이지(/login)

- Firebase를 이용한 소셜 로그인(구글)

3. 회원 가입 페이지(/signup)

- 이메일 중복 검사
- 비밀번호 유효성 검사
- 경험한 여행지 선택 모달

4. 프로필 페이지(/profile/:userId)

- 비로그인 유저 사용 불가능
- 해당 유저의 게시글 리스트
- 댓글 보관함 기능

5. 회원 정보 수정 페이지(/edit-profile/:userId)

- Firebase Storage에 Local Storage 이미지 저장하기, 불러오기

6. 게시물 작성 페이지(/post)

- 비로그인 유저 사용 불가능
- 여행지 선택 모달

7. 게시물 페이지(/post/:postId)

- 비로그인 유저 사용 불가능
- 댓글 작성 기능
- 본인의 댓글만 수정, 삭제 가능

8. 게시물 수정 페이지(/edit-post/:postId)

- 게시물의 원본 내용 가져오기

## Information

- [Pre 기획](https://pollen-scapula-cf2.notion.site/Pre-715c064745124284bd38cf24376051f1)

  - 기획 배경
  - 와이어프레임
  - 기술 스택 초안

- [회고 및 진행 상황](https://pollen-scapula-cf2.notion.site/766ed488f6204454a82eeb6661883752)

  - 회고리스트
  - 전체 진행 상황

- [TripQ Project](https://pollen-scapula-cf2.notion.site/TripQ-a08ff011b267420eaefc06db20d3542a)

  - OverView
  - Project
    - 프로젝트 소개
    - 기술 스택
    - 폴더 구조
    - 프로젝트 주요 기능
  - 기술 특장점
  - Trouble Shooting

## Author

- [Gayoung Kim(김가영)](https://github.com/GayoungKim12)
