# API 명세서

## Root Documents 가져오기

### /documents - GET

전체 Document의 구조를 트리 형태로 가져옵니다.

Response의 형태는 아래와 같습니다.

```json
[
  {
    "id": 1, // Document id
    "title": "노션을 만들자", // Document title
    "documents": [
      {
        "id": 2,
        "title": "블라블라",
        "documents": [
          {
            "id": 3,
            "title": "함냐함냐",
            "documents": []
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "title": "hello!",
    "documents": []
  }
]
```

## 특정 Document의 content 조회하기

### /documents/{documentId} - GET

Response의 형태는 아래와 같습니다.

```json
{
  "id": 1,
  "title": "노션을 만들자",
  "content": "즐거운 자바스크립트의 세계!",
  "documents": [
    {
      "id": 2,
      "title": "",
      "createdAt": "",
      "updatedAt": ""
    }
  ],
  "createdAt": "",
  "updatedAt": ""
}
```

## Document 생성하기

### /documents - POST

request body에 JSON 형태로 아래처럼 값을 넣어야 합니다.

```json
{
  "title": "문서 제목",
  // parent가 null이면 루트 Document가 됩니다.
  // 특정 Document에 속하게 하려면 parent에
  // 해당 Document id를 넣으세요.
  "parent": null
}
```

생성에 성공하면 response에 아래처럼 생성된 결과를 내려줍니다.

```json
{
  "id": 6,
  "title": "문서 제목",
  "createdAt": "생성된 날짜",
  "updatedAt": "수정된 날짜"
}
```

## 특정 Document 수정하기
### /documents/{documentId} - PUT

request body에 수정할 내용을 JSON 형태로 넣으면 됩니다.

```json
{
  "title": "제목 수정",
  "content": "내용 수정"
}
```

## 특정 Document 삭제하기
### /documents/{documentId} - DELETE

documentId에 해당하는 Document를 삭제합니다.

만약 하위 documents가 있는 document를 삭제한 경우, 하위 documents 등은 상위 document가 없어지므로 root document로 인식됩니다.