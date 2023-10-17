# 📌 5주차 프로젝트[Project1]

## 필수 프로젝트

- 프로젝트 기한
  - 프로젝트 수행 기간 : 2023년 10월 17일(화) ~ 2023년 10월 26일(목)
  - 멘티 코드 리뷰 기간 : 2023년 10월 27일(금) ~ 2023년 10월 30일(월)
  - 멘토 코드 리뷰 기간 : 2023년 10월 27일(금) ~ 2023년 11월 2일(목)
  - 코드 리뷰 반영 기간 : 2023년 11월 3일(금) ~ 2023년 11월 6일(월)
- 내용
  - [Day 21] 노션 클로닝 요구사항을 확인해 주세요.

## 폴더 구조(23.10.17 10:10 UPDATE)

┣ 📂src<br/>
┃ ┣ 📂sidearea<br/>
┃ ┃ ┣ 📜sideAreaPage.js<br/>
┃ ┃ ┗ 📜sideAreaRender.js<br/>
┃ ┣ 📂textarea<br/>
┃ ┃ ┣ 📜textAreaPage.js<br/>
┃ ┃ ┗ 📜textAreaRender.js<br/>
┃ ┣ 📂utils<br/>
┃ ┃ ┣ 📜api.js<br/>
┃ ┃ ┗ 📜storage.js<br/>
┃ ┣ 📜app.js<br/>
┃ ┗ 📜main.js<br/>
┣ 📜README.md<br/>
┣ 📜index.css<br/>
┗ 📜index.html<br/>

## 요구사항

기본적인 레이아웃은 노션과 같으며, 스타일링, 컬러값 등은 원하는대로 커스텀합니다.
글 단위를 Document라고 합니다. Document는 Document 여러개를 포함할 수 있습니다.

- [ ] 화면 좌측에 Root Documents를 불러오는 API를 통해 루트 Documents를 렌더링합니다.
- [ ] Root Document를 클릭하면 오른쪽 편집기 영역에 해당 Document의 Content를 렌더링합니다.
- [ ] 해당 Root Document에 하위 Document가 있는 경우, 해당 Document 아래에 트리 형태로 렌더링 합니다.
- [ ] Document Tree에서 각 Document 우측에는 + 버튼이 있습니다. 해당 버튼을 클릭하면, 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다.
- [ ] 편집기에는 기본적으로 저장 버튼이 없습니다. Document Save API를 이용해 지속적으로 서버에 저장되도록 합니다.
- [ ] History API를 이용해 SPA 형태로 만듭니다.
- [ ] 루트 URL 접속 시엔 별다른 편집기 선택이 안 된 상태입니다.
- [ ] /documents/{documentId} 로 접속시, 해당 Document 의 content를 불러와 편집기에 로딩합니다.

## 보너스 요구사항

- [ ] 기본적으로 편집기는 textarea 기반으로 단순한 텍스트 편집기로 시작하되, 여력이 되면 div와 contentEditable을 조합해서 좀 더 Rich한 에디터를 만들어봅니다.
- [ ] 편집기 최하단에는 현재 편집 중인 Markdown PreviewDocument의 하위 Document 링크를 렌더링하도록 추가합니다.
- [ ] 편집기 내에서 다른 Document name을 적은 경우, 자동으로 해당 Document의 편집 페이지로 이동하는 링크를 거는 기능을 추가합니다.
- [ ] 그외 개선하거나 구현했으면 좋겠다는 부분이 있으면 적극적으로 구현해봅니다!
