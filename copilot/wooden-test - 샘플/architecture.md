# 프로젝트 아키텍처 문서

## 📋 프로젝트 개요

**프로젝트명**: Cafe24 쇼핑몰 스킨 커스터마이징  
**목표**: GitHub Copilot을 활용하여 Cafe24 쇼핑몰의 정적 디자인을 서버사이드 템플릿으로 변환  
**범위**: 헤더(Header), 메인 섹션(Main), 푸터(Footer) 등 전체 레이아웃  
**특성**: 정적 HTML/CSS/JS 기반, 빌드 시스템 없음, 브라우저 Live Preview 기반 개발

---

## 🏗️ 디렉토리 구조

```
wooden-test - 샘플/
├── .github/                           # GitHub 설정 폴더
│   └── (copilot-instructions.md 예정)  # Copilot 전역 지침
├── work/                              # 🔴 모듈별 작업 공간 (Sandbox)
│   ├── footer/                        # 푸터 모듈 작업 폴더
│   │   ├── footer.html                # 최종 서버용 템플릿 (module + {$variable})
│   │   ├── footer-test.html           # 로컬 작업 파일 (샌드박스)
│   │   ├── footer-렌더링.html         # 렌더링 결과물 (정답지)
│   │   └── 문서/
│   │       └── footer-module.md       # 모듈/변수 분석 문서
│   ├── header/                        # 헤더 모듈 작업 폴더 (예정)
│   └── main/                          # 메인 섹션 작업 폴더 (예정)
│
├── layout/                            # 최종 배포용 템플릿 위치
│   └── basic/                         # 카페24 서버에 적용될 최종 파일
│       └── (footer.html, header.html 등 예정)
│
├── wooden-myfolder/                   # 🔴 공통 자산 폴더
│   ├── css/                           # 커스텀 CSS
│   │   ├── ub-grid-system.css         # 그리드 시스템
│   │   ├── ub-variables.css           # CSS 변수 정의
│   │   ├── mystyle.css                # 커스텀 스타일
│   │   └── DESIGN.md                  # 설계 문서
│   ├── js/                            # 커스텀 JavaScript
│   └── images/                        # 공통 이미지 자산
│       ├── imgi_15_main_banner01_pc.jpg
│       ├── imgi_16_main_banner02_pc.jpg
│       ├── imgi_17_main_banner03_pc.jpg
│       └── (sns 관련 이미지 등)
│
├── img/                               # 🔴 SkinImg (카페24 기본 리소스)
│   ├── arrow.png
│   ├── btn_page_*.png
│   ├── bt_ew_*.png                    # 구매안전서비스 배너 아이콘
│   ├── checkbox_*.svg
│   ├── hamburger_btn.svg
│   ├── icon_*.svg
│   ├── recent_viewed.svg
│   ├── r_quick_*.svg                  # 우측 퀵메뉴 아이콘
│   ├── top_*.svg                      # 상단 메뉴 아이콘
│   ├── txt_board*.gif                 # 게시판 버튼
│   ├── txt_category*.gif              # 카테고리 버튼
│   └── (총 60+ 리소스 파일)
│
├── SkinImg/                           # 카페24 기본 SkinImg 경로
│   └── img/                           # (런타임 시 카페24에서 제공)
│
├── layout/                            # (현재 비어있음)
│
├── 참고/                              # 📚 참고 문서
│   ├── 단계별 프롬프트.md             # 작업 프롬프트 및 절차
│   └── 로컬테스트-layout.html         # 로컬 테스트용 기본 레이아웃
│
├── Readme.md                          # 프로젝트 개요 및 비전
└── .gitignore
```

---

## 🔄 파일 역할 및 관계도

### 핵심 파일 3종류

```
┌─────────────────────────────────────────────────────────────┐
│ 1️⃣ TEMPLATE (최종 목적지)                                    │
│    /work/footer/footer.html                                 │
│    ├─ Cafe24 module 속성 포함 ✓                              │
│    ├─ {$variable} 변수 포함 ✓                                │
│    └─ 서버에 업로드될 최종 템플릿                             │
│                                                               │
│ 2️⃣ RENDERED (정답지)                                        │
│    /work/footer/footer-렌더링.html                           │
│    ├─ 서버에서 실제 데이터 렌더링된 결과                     │
│    ├─ 변수가 실제 값으로 치환됨                              │
│    └─ AI가 구조와 변수 위치를 학습하는 참고 자료             │
│                                                               │
│ 3️⃣ WORKING (샌드박스)                                       │
│    /work/footer/footer-test.html                            │
│    ├─ 실제 코딩이 일어나는 작업 파일                        │
│    ├─ Live Preview로 실시간 확인                            │
│    ├─ 로컬 경로로 수정되어 있음                              │
│    └─ 디자인과 픽셀 단위로 검수                              │
└─────────────────────────────────────────────────────────────┘
```

### 파일 변환 흐름

```
🎨 디자인 시안 (이미지)
    ↓
[단계 0] footer-module.md 작성
    ├─ Cafe24 모듈 식별
    ├─ 변수 매핑
    └─ data-ez-* 속성 정리
    ↓
[단계 1] architecture.md 작성 ← (현재 단계)
    └─ 전체 구조 파악
    ↓
[단계 2] footer-plan.md 작성
    ├─ 커스터마이징 계획
    └─ /work/footer/문서/footer-plan.md
    ↓
[단계 3] footer-test.html 구현
    ├─ HTML/CSS/JS 작업
    ├─ 로컬 경로 기반
    └─ Live Preview 검수
    ↓
[단계 4] footer-test.html 시각 검수
    ├─ 디자인과 비교
    └─ 수정 반영
    ↓
[단계 5-1] footer-렌더링.html 업데이트
    ├─ footer-test.html 기반
    ├─ Cafe24 디렉토리 경로 적용
    └─ 정적 경로 유지
    ↓
[단계 5-2] footer.html 변환
    ├─ footer-렌더링.html 기반
    ├─ module 속성 추가
    ├─ {$variable} 교체
    └─ 📤 최종 배포용
    ↓
📦 /layout/basic/footer.html에 복사
```

---

## 📁 폴더별 역할 정의

### `/work/` - 모듈별 작업 공간 (🔴 중요)

| 폴더명 | 역할 | 포함 파일 |
|--------|------|----------|
| `/work/footer/` | 푸터 모듈 작업 | footer.html, footer-test.html, footer-렌더링.html |
| `/work/header/` | 헤더 모듈 작업 (예정) | header.html, header-test.html, header-렌더링.html |
| `/work/main/` | 메인 섹션 작업 (예정) | 각 섹션별 폴더 분리 |
| `/work/[module]/문서/` | 모듈 분석 문서 | *-module.md, *-plan.md |

**규칙**: 모듈별로 폴더를 분리하여 관리 효율성 향상

---

### `/wooden-myfolder/` - 공통 자산 (🔴 중요)

```
wooden-myfolder/
├── css/
│   ├── ub-grid-system.css    # 그리드 레이아웃 시스템 (우선 참조)
│   ├── ub-variables.css      # CSS 변수 정의 (색상, 폰트 등)
│   ├── mystyle.css           # 커스텀 스타일 규칙
│   └── DESIGN.md             # 설계 가이드
├── js/
│   └── (JavaScript 자산 폴더)
└── images/
    ├── imgi_15_main_banner01_pc.jpg
    ├── imgi_16_main_banner02_pc.jpg
    ├── imgi_17_main_banner03_pc.jpg
    └── sns-*.png
```

**역할**: 전체 프로젝트에서 공통으로 사용하는 CSS/JS/이미지 자산  
**참조 규칙**: 모든 모듈은 이 폴더의 스타일을 상속받음

---

### `/img/` - 카페24 기본 리소스 (SkinImg)

**포함**: 60개 이상의 리소스 파일
- 페이지네이션 버튼 (`btn_page_*.png`)
- 구매안전서비스 배너 (`bt_ew_*.png`)
- 아이콘 및 SVG (`icon_*.svg`, `checkbox_*.svg`)
- 게시판/카테고리 버튼 (`txt_board*.gif`, `txt_category*.gif`)
- 퀵메뉴 아이콘 (`r_quick_*.svg`)

**역할**: Cafe24 스킨의 기본 이미지 자산 (runtime에 제공됨)  
**참조 경로**: `/SkinImg/img/` (서버 경로)

---

### `/layout/basic/` - 최종 배포용 템플릿

```
layout/basic/
├── footer.html           # 최종 푸터 템플릿 (module + variable)
├── header.html           # 최종 헤더 템플릿 (예정)
└── layout.html           # 전체 레이아웃 쉘
```

**역할**: Cafe24 서버에 업로드될 최종 파일  
**생성 방식**: `/work/[module]/[module].html` 에서 복사/업데이트

---

## 📌 주요 기술 스택 및 제약사항

### HTML/CSS

| 항목 | 설명 |
|------|------|
| **CSS 프레임워크** | ub-grid-system.css 그리드 시스템 |
| **CSS 변수** | ub-variables.css에서 정의 |
| **레이아웃 기본** | /layout/basic/layout.html 상속 |
| **Cafe24 속성** | `module="모듈명"`, `data-ez-*` 속성 필수 |

### JavaScript

| 항목 | 스펙 | 비고 |
|------|------|------|
| **기본 라이브러리** | jQuery 3.6.0 | 버전 고정 (필수) |
| **Swiper** | 4.5.1 | 버전 고정 (슬라이더용) |
| **패턴** | IIFE (즉시 실행 함수) | 전역 오염 방지 |
| **실행 시점** | DOMContentLoaded | document.readyState 확인 |
| **규칙** | 기존 코드 수정 금지 | 새로운 기능만 추가 |

### Cafe24 특화 규칙

| 항목 | 규칙 |
|------|------|
| **모듈** | `<element module="모듈명">` 형식 필수 |
| **변수** | `{$변수명}` 형식 (대소문자 구분) |
| **data-ez 속성** | 절대 수정 금지 |
| **클래스 자동 추가** | module 적용 시 `xans-element- xans-layout xans-layout-{모듈명}` 자동 추가 |
| **SVG 임포트** | `<!--@import(/svg/icon-*.html)-->` 자동 치환 |

---

## 🔐 파일 관리 규칙

### 명명 규칙 (필수)

```
[모듈명]-test.html          # 로컬 작업 파일
[모듈명]-렌더링.html        # 렌더링 결과물
[모듈명].html               # 최종 서버용 템플릿
```

### 경로 관리

| 파일 유형 | CSS/JS 경로 | 이미지 경로 |
|----------|-----------|---------|
| **-test.html** (로컬) | 상대 경로 | 상대 경로 (`/img/`) |
| **-렌더링.html** | 카페24 경로 | 카페24 경로 (`/SkinImg/img/`) |
| **.html** (서버용) | 카페24 경로 | 카페24 경로 + variable |

### 작업 흐름

```
1. -test.html에서 실제 코딩 (로컬 경로 기반)
2. -test.html 검수 완료 후 -렌더링.html 업데이트 (카페24 경로로 변경)
3. -렌더링.html 기반으로 .html 변환 (module + variable 추가)
4. .html을 /layout/basic/에 복사 (최종 배포)
```

---

## 🚫 수정 금지 항목

| 항목 | 이유 | 예시 |
|------|------|------|
| **data-ez-* 속성** | Cafe24 서버 렌더링 필수 | `data-ez="contents-0sn7cig-1"` |
| **module 속성** | 모듈 식별자 | `module="Layout_footer"` |
| **변수명 형식** | 서버 사이드 렌더링 필수 | `{$mall_name}` |
| **구매안전 배너** | 법규 관련 | `.bt_escrow` 섹션 |
| **@import 주석** | SVG 자동 변환 지시문 | `<!--@import(/svg/icon-search.html)-->` |
| **기존 JavaScript** | 안정성 | jQuery 코드 건드리지 않기 |

---

## 📊 프로젝트 상태

### 완료된 작업 ✅
- [x] 프로젝트 초기화 및 폴더 구조 설정
- [x] footer-module.md 작성 (0단계)
- [x] architecture.md 작성 (1단계)

### 예정된 작업 📋
- [ ] copilot-instructions.md 작성 (.github/)
- [ ] footer-plan.md 작성 (2단계)
- [ ] footer-test.html 구현 (3단계)
- [ ] 시각 검수 (4단계)
- [ ] footer-렌더링.html 업데이트 (5-1단계)
- [ ] footer.html 변환 (5-2단계)
- [ ] /layout/basic/footer.html 배포

---

## 🔗 문서 연계

| 문서 | 위치 | 용도 |
|------|------|------|
| **Readme.md** | 루트 | 프로젝트 비전 및 개요 |
| **architecture.md** | 루트 | 🔄 전체 구조 설명 (현재 문서) |
| **copilot-instructions.md** | `.github/` | 💻 AI 전역 지침 (작성 예정) |
| **footer-module.md** | `/work/footer/문서/` | 📚 모듈/변수 분석 (완료) |
| **footer-plan.md** | `/work/footer/문서/` | 📋 구현 계획 (작성 예정) |
| **DESIGN.md** | `/wooden-myfolder/css/` | 🎨 CSS 설계 가이드 |
| **단계별 프롬프트.md** | `/참고/` | 📝 작업 프롬프트 모음 |

---

## 💡 개발 팀 협업 가이드

### AI 에이전트 (Copilot)의 역할

1. **학습 (0단계)**: footer-module.md를 통해 모듈 구조 이해
2. **기획 (2단계)**: footer-plan.md 작성으로 구현 계획 수립
3. **구현 (3단계)**: footer-test.html에 HTML/CSS/JS 구현
4. **변환 (5단계)**: 정적 HTML을 Cafe24 템플릿으로 변환

### 개발자 (사용자)의 역할

1. **검수 (4단계)**: footer-test.html을 브라우저에서 시각 검수
2. **피드백**: 디자인과의 불일치 항목 지적
3. **배포**: 최종 승인 후 /layout/basic/에 배포

---

## 📞 문제 해결 가이드

| 상황 | 확인 사항 | 해결 방법 |
|------|----------|---------|
| 로컬 이미지 안 보임 | `/img/` 경로 (로컬 경로 사용) | -test.html은 상대경로 유지 |
| 서버 템플릿 안 렌더링 | `/SkinImg/img/` 경로 | -렌더링.html, .html은 카페24 경로 필수 |
| CSS 적용 안 됨 | ub-grid-system.css, ub-variables.css | /wooden-myfolder/css/ 참조 확인 |
| JavaScript 에러 | jQuery 3.6.0, Swiper 4.5.1 버전 | 라이브러리 버전 확인 및 API 스펙 준수 |
| 모듈 기능 손상 | data-ez-*, module 속성 변경 | footer-module.md 참조하여 원상복구 |

---

## 📚 참고 자료

- **Cafe24 공식 문서**: 모듈 시스템, 변수 시스템
- **ub-grid-system.css**: 그리드 레이아웃 규칙
- **ub-variables.css**: 색상, 폰트, 간격 변수
- **footer-module.md**: 현재 프로젝트의 모듈/변수 매핑
- **단계별 프롬프트.md**: 작업 절차 및 프롬프트 템플릿

