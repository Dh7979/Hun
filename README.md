# RALLY / AGAIN

배드민턴 여자 단식 입문자를 위한 관전 가이드 랜딩페이지와 홍보용 블로그입니다. HTML, CSS, JavaScript로 구성한 정적 웹사이트입니다.

## 페이지

- 메인: `dist/index.html`
- 블로그 목록: `dist/blog/index.html`
- 홍보 글: `dist/blog/womens-singles-guide.html`

메인에서 기본 규칙, 코스·복귀·템포 관전 포인트, 안세영 선수 소개, FAQ와 출처를 확인할 수 있습니다. 블로그에는 관전 가이드 글 1편이 있으며, 마지막 CTA는 메인 관전 가이드로 연결됩니다. 영상 링크는 SBS / CHZZK의 8강·결승 하이라이트로 이동합니다.

## 로컬 실행

Node.js가 설치된 환경에서 저장소 루트에서 실행합니다.

```sh
node serve.mjs
```

브라우저에서 http://127.0.0.1:4187 을 엽니다. 실제 웹페이지 파일은 `dist/`에 있습니다.

## 구성

- `dist/`: HTML, CSS, JavaScript 및 이미지
- `build-blog.mjs`: 블로그 HTML과 관전 개념도 생성 스크립트
- `serve.mjs`: 로컬 정적 파일 서버
- `BLOG-RESEARCH.md`: 키워드 선정과 글 구성·출처 조사 기록
- `audit-links.mjs`, `link-audit.json`: 외부 링크 점검 스크립트와 이전 점검 기록
- `.openai/hosting.json`: 기존 Sites 배포 설정

## 이미지와 출처

- 대표 코트 이미지: OpenAI ImageGen으로 제작한 AI 이미지
- 랜딩 선수 사진: 사용자 제공
- 블로그 안세영 경기 사진: 연합뉴스. 사용자 제공 원본의 비율과 워터마크를 유지하고 사진 아래에 출처를 표기했습니다.
- 관전 개념도: RALLY / AGAIN 자체 제작

규칙·대회·선수·영상의 출처는 각 페이지 안에 기재했습니다.

## 측정과 검증

PC 1280px와 모바일 390px에서 사진·레이아웃과 가로 넘침을 확인했습니다. 로컬 링크, 앵커, H1, 구조화 데이터를 점검했습니다.

`dataLayer` 이벤트는 메인 방문, 가이드 선택, FAQ, 하이라이트 링크, 블로그 방문과 메인 이동을 기록하도록 준비돼 있습니다. GA4·GTM·Meta Pixel 설치와 실제 수집은 완료하지 않았습니다.

기존 배포 주소: https://rally-again-womens-singles.team-4d-1408.chatgpt.site/
