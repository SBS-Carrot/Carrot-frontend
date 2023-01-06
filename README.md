# 당근마켓 클론코딩

## 시연 동영상 링크

[프로젝트 사이트로 이동하기](http://qudgns.site:3000)

[유튜브](https://www.youtube.com/watch?v=tEu6WCS2XUY)

[백엔드 주소](https://github.com/SBS-Carrot/Carrot_Backend)

## 프로젝트 설명

### 기간

2022.10.12 ~ 2022.12.28

### 팀 소개

윤병훈, 송혜림

- 4인 1조였으나, 2명 중도 하차.
- 프론트와 백을 구분짓지 않고 둘이서 모든 작업을 협력함.

### 사용 기술

Frontend <br/>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/fontawesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white">
<img src="https://img.shields.io/badge/axios-2C5BB4?style=for-the-badge&logoColor=white">

Backend <br/>
<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white">
<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/mariaDB-003545?style=for-the-badge&logo=mariaDB&logoColor=white">
<img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">
<img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
<img src="https://img.shields.io/badge/JPA-abd798?style=for-the-badge&logoColor=white">

## 기능

1. 메인페이지

- 당근마켓 사이트에 없는 로그인 버튼, 마이페이지 버튼 추가.
  <img src="https://user-images.githubusercontent.com/109117590/209925829-ca165849-4080-460d-8f47-453ab30d6c22.PNG">

<div>

2. 로그인
<img src="https://user-images.githubusercontent.com/109117590/209928624-b46eb3a0-6edf-4452-89da-57c3d666e4fe.PNG">
</div>
<div>
3. 회원가입

- 회원가입 창
  <br />
  <img src="https://user-images.githubusercontent.com/109117590/209931478-4bbae3af-1a75-436b-b893-92a3389511b8.PNG">

- 아이디 확인
  <img src="https://user-images.githubusercontent.com/109117590/209931496-165617aa-c15e-485c-b688-7330f96a1b77.PNG">

- 비밀번호 유효성 검사
  <br />
  <img src="https://user-images.githubusercontent.com/109117590/209931511-13f82f57-0c31-4e0e-9049-b38263954d08.PNG"> <br />
  <br />
  <img src="https://user-images.githubusercontent.com/109117590/209931517-c86c0a3e-9b45-4d23-8ef6-de0f16bc2329.PNG">
  <br /> <br />
  <img src="https://user-images.githubusercontent.com/109117590/209931521-02ce1ff7-626d-4c0a-a17c-7c7957798e32.PNG"> <br />

</div>

4. 중고거래 페이지

   - 페이징(리액트 페이지네이션을 통한 페이징)
     <br />
     <img src="https://user-images.githubusercontent.com/109117590/209932150-590341f5-efb6-45d4-aab6-37c20d2231fc.PNG">
     <br />
   - 중고거래 글쓰기 (사진은 AWS S3에 저장)
     <br />
     <img src="https://user-images.githubusercontent.com/109117590/209933066-0ede0960-c72b-40be-8234-3c3b7b1fb634.PNG">
     <br />
   - 중고거래 상세페이지 (리액트 슬릭을 통한 이미지 슬라이드)
     <br />
     <img src="https://user-images.githubusercontent.com/109117590/209933069-4ab109a7-5f33-4a16-837a-5434f6809eef.PNG">
     <br />
   - 채팅기능 (STOMP를 활용한 실시간 1:1채팅기능)
     <br />
     <img src="https://i.postimg.cc/25PVcM2r/1.png">

     <br />

   - 후기 작성기능 (채팅방에서 바로, 혹은 채팅리스트에서 유저를 선택해 상대에 대한 후기 작성)

     <img src="https://i.postimg.cc/NFbXzbKD/2.png">
       <br />  
       <br />

   - 후기작성 후 상대에 대한 매너온도 조정과 거래완료로 변경
     <img src="https://i.postimg.cc/dVhC52wR/3.png">
     <br />
     <br />
   - 알림기능 (SSE를 활용해 메세지, 후기작성 등에 대한 알림을 받음)
     <img src="https://i.postimg.cc/wT73z9Zg/44.png">

5. 알바 페이지

   - 메인 페이지  
     <img src="https://i.postimg.cc/FFf4pp6s/image.png">
   - 알바 상세 페이지
     <img src="https://i.postimg.cc/pLKVZCpn/1.png">
     <img src="https://i.postimg.cc/ZR5TJhjr/2.png">
   - 알바 지원하기
     <img src="https://i.postimg.cc/VkmpxWKt/image.png">
   - 지원 알림
     <br/>
     <img src="https://i.postimg.cc/nzyw04sC/image.png">
   - 지원자 보기
     <img src="https://i.postimg.cc/yxhnjw4b/image.png">
   - 알바 공고 쓰기
     <img src="https://i.postimg.cc/yYvyNhVc/image.png">
   - 알바 검색
     <img src="https://i.postimg.cc/9fJh8nVz/image.png">

6. 부동산 직거래

   - 부동산 직거래 페이지
     <img src="https://i.postimg.cc/J0R6X6w5/11.png">
     <br />
   - 부동산 게시글 작성
     <br />
     <img src="https://i.postimg.cc/FKcDB5Nx/22.png">
     <br />
   - 부동산 상세페이지
     <br />
     <img src="https://i.postimg.cc/FsRGQJhz/33.png">
     <img src="https://i.postimg.cc/qR4XDNmk/44.png">
     <br />
   - 부동산 채팅 (후기도 중고거래와 마찬가지로 가능)
     <img src="https://i.postimg.cc/nL0Y5HNB/11.png">
     <br />
   - 부동산 검색기능
     <img src="https://i.postimg.cc/qRBL1tR8/22.png">
     <img src="https://i.postimg.cc/RZrLjphC/33.png">
     <br />

7. 동네 게시판

- 동네 질문
  <img src="https://i.postimg.cc/BvYzTR9g/image.png">
- 동네 카페  
  <img src="https://i.postimg.cc/dVhNPN8L/image.png">
- 나의 동네생활
  <img src="https://i.postimg.cc/XJkQcR0D/image.png">

8. 마이 페이지

- 받은 후기와 매너온도, 프로필 등 나의 정보를 한눈에 확인
  <img src="https://i.postimg.cc/jj2QpDPK/11.png">
  <br />
- 프로필사진과 닉네임도 변경 가능(AWS의 기존 사진을 삭제 후 새로 저장)
  <img src="https://i.postimg.cc/W13k3Q3w/22.png">
  <br />
- 보안 설정은 본인확인을 위해 비밀번호 확인,
  상태값을 세션스토리지에 저장하여, 초기1회만 비밀번호 입력
  <img src="https://i.postimg.cc/hP4JyH9R/1.png">
  <br />
  - 비밀번호 변경 기능
    <img src="https://i.postimg.cc/tCmgr7qF/2.png">
    <br />
  - 내가 쓴 게시글 관리 (클릭으로 펼치고 접을 수 있음)
    <img src="https://i.postimg.cc/DZykkd50/33.png">  
    <img src="https://i.postimg.cc/HxZGpcP2/44.png"> <br />
  - 채팅리스트
    <img src="https://i.postimg.cc/J0HBxXfY/11.png"> <br />

9. 통합 검색기능

- 홈 우측 상단 화면에서 통합검색 가능
  <img src="https://i.postimg.cc/D07wJX2b/22.png">
  <br />
- 검색 사이트로 이동되며 해당 검색어에 대한 결과가 나열
  <img src="https://i.postimg.cc/y6nVpW1v/33.png">
  <br />
  - 모든 항목에 대해 검색 가능(QueryDSL을 이용한 동적쿼리작성)
    <img src="https://i.postimg.cc/bwSpvTQB/44.png">
    <br />

10. 당근마켓 선택 이유

- 비교적 간단해 입문하기에 좋아보여 선택.
- 당근마켓은 핸드폰 앱으로 주 기능들이 이루어지기 때문에 웹을 제작할 때 무겁지 않게 제작할 수 있을거란 생각.

하지만 생성,삭제,수정 등 욕심을 내 기능을 하나씩 추가할때마다 클론코딩이아니라 만들어내야 했기때문에 이 과정에서 많은 것들을 배울 수 있었다.

11. 아쉬운 점

- JWT 토큰을 사용하지 못한것. (시간부족)
- 이미지 수정이 원활하지 못한것. (스프링에서 리액트로부터 이미지 파일을 받을때 MultiPartFile의 형태로 받게되는데 AWS에 저장하려면 받은 MultiPartFile을 File의 형태로 전환해야한다. 수정을 눌렀을때 해당 게시글의 id를 통해 사진파일을 불러와 default값으로 그 사진들을 배치시켜두고 싶었으나 AWS에 저장된 File을 역순으로 전환하여 파일을 리턴하는 것에서 기술적으로 어려움을 느낌. 다른 방법을 찾아보면 가능할것 같으나 시간부족으로, 사진 추가와 삭제만 가능)
- 채팅이나 알림과같은 많은 입출력이 일어나는 사항들에 대해 NoSQL을 사용해보고 싶었으나 익숙한 MySQL을 사용한 것.
- 알림이 새로고침을 하거나 페이지를 이동할 때 도착하는것.
