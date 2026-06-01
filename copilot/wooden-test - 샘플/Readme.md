# [프로젝트] Cafe24 스킨 커스터마이징
본 프로젝트는 GitHub Copilot을 활용하여 Cafe24 쇼핑몰의 스킨을 헤더, 메인 섹션, 푸터 등 전체 레이아웃을 디자인 시안에 맞춰 커스터마이징하는 것을 목표로합니다. AI 에이전트와의 협업을 통해 정적 디자인을 Cafe24 서버사이드 템플릿으로 변환하는 전 과정을 실습합니다.


## 1. 프로젝트 비전 및 목표 (Product Vision)
- 모듈별 정밀 구현: 각 영역(header, main, footer 등)의 기획 이미지를 분석하여 픽셀 단위로 구현합니다.
- 컴포넌트 기반 아키텍처: 각 기능을 독립적인 모듈로 개발하여 관리 효율을 높입니다.
- 플랫폼 최적화: Cafe24 고유의 모듈 시스템과 변수 체계를 완벽히 유지하면서 HTML 구조를 개선합니다.
- AI 협업 숙달: 컨텍스트 엔지니어링과 브라우저 에이전트 도구를 활용한 AI 기반 워크플로우를 경험합니다.

## 2. 프로젝트 유형 및 작업자 환경
- 정적 카페24(Cafe24) 테마 템플릿 및 쇼핑몰 레이아웃 파일입니다.
- 이 저장소에는 Node/npm 빌드 시스템이나 테스트 프레임워크가 존재하지 않습니다.
- 사용자는 Python, PHP 가 설정되지 않은 컴퓨터를 사용합니다.
- HTML은 Live Preview , Live Server 확장프로그램을 이용하여 브라우저에서 확인합니다.
  

## 3. 작업 구조 및 파일 관리(Sandbox)
파일이 많아지는 문제를 해결하기 위해 /work 폴더 하위에 모듈별 공간을 분리하여 운영합니다.
- /work/header/: 헤더 구현용 테스트 및 렌더링 파일
- /work/main/: 각 메인 섹션별(Hero, List 등) 작업 폴더
- /work/footer/: 푸터 구현용 작업 폴더
- /layout/basic/: 실제 카페24 서버에 적용되는 최종 배포 템플릿 위치로, 로컬 테스트 완료 후 `/work/[모듈]/[모듈].html`을 복사하여 업데이트합니다.
- /wooden-myfolder/: 전 영역 공통으로 사용하는 커스텀 CSS/JS 자산

본 프로젝트는 Cafe24의 서버사이드 렌더링 구조를 따르며, 다음 주요 파일들을 중심으로 운영됩니다

- 로컬 템플릿 원본(`/work/footer/footer.html`) : 테스트 서버 업로드용 로컬 최종 템플릿입니다. AI가 최종 결과물을 출력해야 하는 **'최종 목적지'** 형태로 작성하되, 최종 배포는 `/layout/basic/footer.html`에 반영됩니다. module 속성과 {$variable} 변수가 포함되어 있어 AI가 변환 규칙을 배울 때 참조합니다.
- 렌더링 결과물(footer-렌더링.html) :  서버에서 실제 데이터가 채워져 브라우저에 뿌려진 HTML입니다. AI가 구조적 기준으로 삼으며, 특히 정적 HTML을 다시 서버용으로 변환할 때 어떤 변수가 어디에 있었는지 대조하는 '정답지' 역할을 합니다.
- 로컬 작업 파일(footer-test.html) : 실질적인 코딩이 일어나는 **'샌드박스'** 입니다. Live Preview 등으로 실시간 확인이 가능하도록 경로를 수정한 파일이며, 디자인 시안과 픽셀 단위로 대조하는 **'검수용 파일'** 입니다.
- 레이아웃 쉘(layout.html) 전체 프로젝트의 **'환경 설정 파일'** 입니다. 공통 CSS/JS 임포트 경로를 담고 있어 AI가 스타일 상속 관계를 파악하는 데 필수적입니다.

- 명명 규칙 통일: [모듈명]-test.html, [모듈명]-렌더링.html 식으로 이름을 통일하여 AI가 파일명만 보고도 역할을 알 수 있게 합니다. 
- 모듈별 폴더 격리: /work/header/header-test.html, /work/footer/footer-test.html 식으로 폴더를 관리합니다.
- 로컬 테스트는 항상 -test.html 파일에서 수행하고, 최종 제출은 .html 원본에 변수를 매핑합니다. 


## 4. 기술 스택 및 개발 규칙 (Development Guidelines)

AI가 코드를 생성할 때 반드시 준수해야 할 기술적 제약 사항입니다

- CSS 및  디자인 시스템 참조 규칙
    - /layout/basic/layout.html 과 연결된 기본 스타일을 상속받으며
    - /wooden-myfolder/css/ub-grid-system.css의 그리드 시스템과 변수를 우선 참조합니다.
- JavaScript:
    - **라이브러리 버전 정의:** 현재 카페24 스킨이 사용하는 **`jQuery` 버전은 3.6.0**, **`swiper.js` 버전은 4.5.1** 입니다. (스크립트 구현 및 플러그인 연동 시 해당 버전의 API 스펙을 엄수해야 합니다.)
    - Vanilla JS 사용 (jQuery 의존성 배제).
    - 전역 오염 방지를 위한 IIFE(즉시 실행 함수) 패턴 적용.
    - document.readyState를 확인하여 DOMContentLoaded 시점에 실행.
    - 기존에 작성된 jquery, Vanilla JS는 수정 변경하지 않습니다.
- Cafe24 전용 모듈 및 변수 처리 규칙
    - 카페24 위젯의 동작이나 데이터 바인딩을 의도적으로 수정하는 것이 아니라면, `data-ez-*` 또는 `data-ez-role` 마크업을 변경하지 마세요.
    - 작업 완료 후 서버사이드 템플릿 변환시 Cafe24 지시문 외부 파일 연결 시 <!--@css(...)-->, <!--@js(...)--> 형식을 엄수합니다.
    - 서버 사이드 템프릿으로 변환 시 {$mall_name}과 같은 템플릿 변수가 누락되지 않도록 footer.html, footer-렌더링.htm를 비교하여  기존 변수 리스트를 먼저 체크합니다.
- 이미지 및  접근성 가이드라인 
    - 이미지 `src`나 링크 `href`가  제공되지 않은 경우, 명확한 주석(예: `<!-- TODO: 이미지 URL 삽입 -->`)이나 짧은 자리표시자(`/path/to/image.png` 또는 `#`)를 남기고 나중에 실제 URL로 교체합니다.
    - **경로 지정 규칙 (중요):** - 쇼핑몰 솔루션의 특성상 `layout/basic/css/...`와 같은 상대 경로는 절대 금지합니다.
        - HTML 내에서 CSS, JS, 이미지, 링크 등의 경로를 지정할 때는 반드시 루트부터 시작하는 절대 경로인 **`/layout/basic/...`** 또는 **`/wooden-myfolder/...`** 형태로 작성해야 합니다. (맨 앞에 슬래시 `/` 필수 적용)
- 파일 수정
    -단계에 해당되는 html외에 다른 HTML을 수정하지 않습니다.
    -footer-test.html 작업 단계에서 footer-렌더링.html footer.html 은 수정 하지 않습니다.  html파일은 단계에 맞게 수정합니다.


## 5. AI 협업 워크플로우 (AI-Assisted Workflow)

이 저장소에는 AI 효율을 극대화하기 위한 지침이 설정되어 있습니다

1. 지침 자동 적용: .github/copilot-instructions.md를 통해 모든 대화에 프로젝트 규칙이 자동 포함됩니다.
2. 구현 계획 수립: @plan 에이전트를 호출하여 구현 전 footer-plan.md 기반의 상세 계획을 수립합니다.
3. 시각적 검수: Live Preview(확장프로그램)를 사용하여 생성된 HTML과 디자인 시안 간의 오차를 분석하고 수정합니다.

## 6. 예상 작업 순서

0단계. Cafe24 모듈/변수 학습
   - footer.html(서버사이드 템플릿)과 
     footer-렌더링.html(렌더링 결과물)을 함께 제공
   - 두 파일을 비교하여   <div module="모듈명">과{$변수}  모듈과  모듈에 종속된 변수들이 실제 HTML로 어떻게 변환되는지 Copilot에게 학습시킴
   - 학습 확인: "이 프로젝트에서 사용 중인 Cafe24 변수 목록을 정리해줘" 로 검증
1단계.  프로젝트 .github/copilot-instructions.md 생성  
2단계. @plan 에이전트 호출하여 footer-plan.md 에 계획서를 작성하여 AI가 작업을 진행할 때 참고할 수 있도록 합니다.
3단계. 코드구현
    -  footer 디자인된 이미지(/work/footer/문서/footer기획-1.jpg, /work/footer/문서/footer기획-2.jpg)와 과 footer-test.html을  제공하여 작업 요청
    -  디자인이미지(/work/footer/문서/footer기획-1.jpg, /work/footer/문서/footer기획-2.jpg) 기반으로 footer-test.html과 ub-footer.css, ub-footer.js 로  작업
4단계. 수정된 footer-test.html을 확인 후 통합브라우저 통해 검수와 수정
5단계. 확정된 footer-test.html을  기반으로 footer-렌더링.html 파일을 수정합니다.
6단계  footer-렌더링.html 파일 기반으로 카페24 모듈 및 변수에 맞게 로컬 `/work/footer/footer.html`을 수정합니다. 테스트 서버에서 확인 후 완료되면 `/layout/basic/footer.html`에 반영합니다.


## Cafe24 footer 모듈 학습

footer 작업 시작 전, 아래 프롬프트로 Copilot에게 Cafe24 모듈/변수 규칙을 학습시킵니다.

> footer.html과 footer-렌더링.html을 비교 분석해서
> /work/footer/문서/footer-module.md 파일을 작성해줘.
>
> 작성 내용:
> 1. 사용된 Cafe24 모듈과 모듈에 종속된 변수들의 렌더링 결과값 / 위치
> 3. data-ez-* 속성 목록 — 속성명 / 위치 / 역할
> 4. 작업 시 수정 금지 항목 요약