# Footer 모듈 커스터마이징 계획서

## 📋 문서 개요

**작업 모듈**: Footer  
**단계**: 2단계 (기획)  
**작성일**: 2026년 6월 1일  
**참고 문서**: 
- [footer-module.md](footer-module.md) - 모듈/변수 분석
- [디자인 시안](#디자인-시안-분석)

---

## 🎨 디자인 시안 분석

### 1. 디자인 레이아웃 현황

#### Desktop 버전 (Aura Silver)
```
┌─────────────────────────────────────────────────────┐
│  1️⃣ 로고 (Aura Silver)                               │
│  4️⃣ 쇼핑몰 기본정보 | 3️⃣ 바로가기 | 5-1/5-2 고객센터  │
│                     2️⃣ SNS                         │
│                     6️⃣ CS운영시간                   │
│                                                       │
│  저작권 표시 (Copyright © Aura Silver)               │
└─────────────────────────────────────────────────────┘
```

#### Mobile 버전 (모바일 최적화)
```
┌──────────────────────────┐
│ 좌측 메뉴 아이콘         │
├──────────────────────────┤
│ 1️⃣ 로고 (Aura Silver)    │
│ 2️⃣ SNS 링크              │
│ 3️⃣ 주요정보 텍스트      │
│ 4️⃣ 쇼핑몰 기본정보      │
├──────────────────────────┤
│ 5-1️⃣ 고객센터 정보      │
│ 5-2️⃣ 결제정보            │
│ 6️⃣ CS운영시간           │
├──────────────────────────┤
│ 7️⃣ 추가정보 메뉴        │
│ 8️⃣ 추가정보             │
│ 9️⃣ 추가정보             │
│                          │
│ 저작권 표시              │
└──────────────────────────┘
```

### 2. 주요 변경사항 (Wooden 기본 디자인 vs 시안)

| 요소 | 기본 상태 | 개선 목표 | 구현 방식 |
|------|---------|---------|----------|
| **레이아웃** | 좌우 2단 | 좌우 2단 유지 | CSS 그리드/Flex |
| **로고** | 텍스트만 | 로고 텍스트 | {$mall_name} 활용 |
| **정보 섹션** | 세로 나열 | 정보 정리 | 기존 모듈 유지 |
| **SNS 링크** | 텍스트 링크 | SNS 아이콘/링크 | CSS 아이콘 또는 이미지 |
| **우측 퀵메뉴** | 보임 | 보임 | 로컬 경로 이미지 |
| **색상/타이포** | 기본 | Aura Silver 톤 | CSS 변수 활용 |
| **반응형** | 미지원 | 모바일 대응 | CSS Media Query |

### 3. 색상 및 타이포그래피

참고 자료: [DESIGN.md](../../../wooden-myfolder/css/DESIGN.md)

```
▪ 브랜드 색: #1f1f1f (다크 그레이)
▪ 텍스트 기본: #000000 (검정)
▪ 텍스트 보조: #999999 (밝은 그레이)
▪ 배경: #FFFFFF (흰색)
▪ 포인트: #555555 (hover 상태)

▪ 폰트: 기본 시스템 폰트 (sans-serif)
▪ 기조: 미니멀, 클린, 모던, 신뢰감
```

---

## 🔄 구현 계획

### 1️⃣ 파일 생성 및 구조

#### 생성할 파일
```
/work/footer/
├── footer-test.html          ← 💻 작업 대상 (로컬 경로)
├── ub-footer.css             ← 🎨 새로 생성 (커스텀 스타일)
├── ub-footer.js              ← (필요시 생성)
└── 문서/
    └── footer-plan.md        ← 📋 이 파일
```

#### 참고할 기존 파일
- `/work/footer/footer.html` - 템플릿 원본 (module + variable)
- `/work/footer/footer-렌더링.html` - 렌더링 참고 (정답지)
- `/wooden-myfolder/css/ub-variables.css` - CSS 변수 (색상, 간격)
- `/wooden-myfolder/css/ub-grid-system.css` - 그리드 시스템

### 2️⃣ HTML 구조 계획

#### 현재 구조 (footer.html 기준)
```html
<div class="bottom-nav">...</div>        <!-- 모바일 하단 네비 (유지) -->
<div class="footer_margin"></div>        <!-- 마진 (유지) -->
<footer id="footer">
  <div id="right_quick">...</div>        <!-- 우측 퀵메뉴 (유지) -->
  <div class="inner" module="Layout_footer">
    <div class="inner_t">
      <div class="info_left">            <!-- 좌측: 로고 + 정보 -->
        <div class="bt_logo" module="Layout_LogoBottom">...</div>
        <div class="bt_info">...</div>   <!-- 쇼핑몰 기본정보 -->
      </div>
      <div class="info_right">           <!-- 우측: 바로가기 + CS -->
        <div class="bt_util">...</div>   <!-- 바로가기 링크 -->
        <div class="wrap_cs">
          <div class="cs_center_txt" module="Layout_Info">...</div>
          <div class="bank_txt">...</div>
          <div class="sns_txt">...</div>
        </div>
      </div>
    </div>
    <div class="inner_b">                <!-- 저작권 표시 -->
      <div class="bt_copyright">...</div>
    </div>
  </div>
</footer>
```

#### 개선 계획
- ✅ 전체 구조 유지 (module, data-ez 보존)
- ✅ 기존 모듈/변수 재활용 (Layout_footer, {$phone} 등)
- ⚠️ CSS 클래스 추가 가능
- ⚠️ 불필요한 요소 제거 검토
- ⚠️ 시맨틱 HTML 개선 (필요시)

### 3️⃣ CSS 스타일 계획

#### 참조 우선순위
```
1순위: /wooden-myfolder/css/ub-grid-system.css  (그리드 시스템)
2순위: /wooden-myfolder/css/ub-variables.css    (변수: 색상, 간격)
3순위: /wooden-myfolder/css/mystyle.css         (커스텀 스타일)
4순위: /layout/basic/layout.html                (기본 스타일)
5순위: /work/footer/ub-footer.css               (푸터 전용)
```

#### 구현 항목
| 섹션 | 스타일 | 설명 |
|------|--------|------|
| **bottom-nav** | 유지 | 모바일 하단 네비게이션 (기존 유지) |
| **footer** | 배경색, 여백 | Aura Silver 톤에 맞춘 색상 |
| **inner_t** | Flex/Grid | 좌우 2단 레이아웃 (반응형) |
| **info_left** | 너비, 여백 | 로고 + 정보 섹션 |
| **info_right** | 너비, 여백 | 바로가기 + CS 섹션 |
| **bt_logo** | 폰트크기, 색상 | 브랜드 로고 스타일 |
| **bt_info** | 텍스트 정렬 | 쇼핑몰 기본정보 |
| **bt_util** | 링크 스타일 | 바로가기 링크 |
| **cs_center_txt** | 레이아웃 | CS 정보 섹션 |
| **sns_txt** | 아이콘/링크 | SNS 링크 |
| **inner_b** | 여백 | 저작권 표시 |

#### 반응형 디자인
- 📱 **모바일 (<768px)**
  - 좌우 단일 컬럼 (stack)
  - 폰트 크기 감소
  - 여백 축소
  
- 💻 **데스크톱 (≥768px)**
  - 좌우 2단 레이아웃 (Flex/Grid)
  - 원본 폰트 크기
  - 원본 여백

### 4️⃣ JavaScript 계획

#### 필요 기능 검토

| 기능 | 필요 | 설명 |
|------|------|------|
| 아코디언 | ❓ | 모바일에서 섹션 접기 (필요시) |
| 탭 | ❌ | 현재 필요 없음 |
| 슬라이더 | ❌ | 현재 필요 없음 |
| 스크롤 애니 | ⚠️ | 우측 퀵메뉴 (기존 코드 유지) |
| 클릭 이벤트 | ❌ | 기존 코드 활용 |

**결론**: JavaScript는 기존 코드 활용으로 충분 (새 코드 추가 불필요)

### 5️⃣ 이미지 및 리소스 계획

#### 필요 리소스

| 리소스 | 현재 경로 | 작업 경로 | 용도 |
|--------|---------|---------|------|
| **SNS 아이콘** | `/img/sns-*.png` | 링크 text 또는 CSS 아이콘 | SNS 섹션 |
| **퀵메뉴 아이콘** | `/img/r_quick_*.svg` | `/img/r_quick_*.svg` | 우측 퀵메뉴 |
| **구매안전 배너** | `/img/bt_ew_*.png` | `/img/bt_ew_*.png` | 구매안전서비스 |
| **로고** | 텍스트 | {$mall_name} 변수 | 브랜드 로고 |

#### 경로 규칙
- **footer-test.html** (로컬): `/img/`, 상대경로 가능
- **footer-렌더링.html**: `/SkinImg/img/`
- **footer.html**: `/SkinImg/img/` + {$변수}

### 6️⃣ Cafe24 모듈 & 변수 활용

#### 사용할 모듈
```html
module="Layout_footer"           ← 푸터 메인 컨테이너
module="Layout_LogoBottom"       ← 하단 로고
module="Layout_Info"             ← 고객센터 정보
module="Layout_stateLogon"       ← 로그인 상태 (선택사항)
module="Layout_stateLogoff"      ← 로그오프 상태 (선택사항)
```

#### 사용할 변수
```
{$mall_name}           → 쇼핑몰명 (로고, 저작권)
{$company_name}        → 상호명
{$president_name}      → 대표자명
{$phone}               → 대표 전화
{$mall_zipcode}        → 우편번호
{$mall_addr1}, {$mall_addr2}  → 사업장 주소
{$company_regno}       → 사업자 등록번호
{$network_regno}       → 통신판매업 신고번호
{$cpo_name}            → 개인정보보호책임자
{$inquiry_email}       → 상담 이메일
{$runtime}             → CS운영시간
```

#### data-ez-* 속성
- ✅ **절대 유지**: 모든 `data-ez-*` 속성
- ✅ **절대 유지**: `data-ez-group`, `data-ez-role`, `data-ez-item`
- ✅ **절대 유지**: `<!--@import(...)-->` 지시문

---

## 📅 작업 일정 (단계별)

### 3단계: 코드 구현
```
[대상 파일]
✏️ /work/footer/footer-test.html      (HTML 마크업)
✏️ /work/footer/ub-footer.css         (스타일)

[작업 범위]
1. HTML 구조 정리 (기존 모듈/변수 유지)
2. CSS 작성 (반응형 디자인)
3. 경로 확인 (로컬 경로 기반)
4. 코드 품질 검수
```

### 4단계: 시각적 검수
```
[확인 항목]
- footer-test.html을 Live Preview에서 확인
- 디자인 시안과 픽셀 단위 비교
- 반응형 레이아웃 테스트 (PC/Mobile)
- 링크 동작 확인
```

### 5-1단계: 렌더링 파일 업데이트
```
[작업]
- footer-test.html 기반으로 footer-렌더링.html 수정
- 경로를 `/SkinImg/img/`로 변경
- data-ez-* 속성 유지
```

### 5-2단계: 서버용 템플릿 변환
```
[작업]
- footer-렌더링.html을 footer.html로 변환
- module 속성 추가
- {$변수명} 교체
- 최종 검수
```

---

## 🎯 성공 기준

### HTML 구조 기준
- [ ] 모든 `module` 속성 유지
- [ ] 모든 `data-ez-*` 속성 유지
- [ ] 모든 `{$변수명}` 정확하게 사용
- [ ] 의미있는 HTML 시맨틱 구조

### 스타일 기준
- [ ] CSS 변수 활용 (ub-variables.css)
- [ ] 그리드 시스템 활용 (ub-grid-system.css)
- [ ] Aura Silver 톤앤매너 적용
- [ ] 반응형 디자인 (Mobile-First)

### 디자인 기준
- [ ] 디자인 시안과 일치 (데스크톱)
- [ ] 모바일 레이아웃 최적화
- [ ] 색상 정확성
- [ ] 타이포그래피 일관성

### 기능 기준
- [ ] 모든 링크 동작
- [ ] 우측 퀵메뉴 작동
- [ ] SNS 링크 작동
- [ ] 로그인/로그오프 상태 표시 (해당시)

---

## 📝 구현 체크리스트

### 준비 단계
- [ ] footer-module.md 분석 완료
- [ ] 디자인 시안 분석 완료
- [ ] CSS 변수 확인 (ub-variables.css)
- [ ] 그리드 시스템 확인 (ub-grid-system.css)

### HTML 작업
- [ ] footer-test.html 구조 정리
- [ ] module 속성 유지 확인
- [ ] data-ez-* 속성 유지 확인
- [ ] {$변수} 정확성 확인
- [ ] 경로 정확성 (로컬 경로 기반)

### CSS 작업
- [ ] ub-footer.css 생성
- [ ] Flex/Grid 레이아웃 구성
- [ ] 색상 적용 (변수 사용)
- [ ] 반응형 미디어쿼리 작성
- [ ] 타이포그래피 적용

### 검수 단계
- [ ] Live Preview 확인
- [ ] 디자인 시안 비교
- [ ] 반응형 테스트 (768px 기준)
- [ ] 브라우저 호환성 확인

---

## ⚠️ 주의사항

### 반드시 지켜야 할 규칙
1. ❌ `module` 속성 변경 금지
2. ❌ `data-ez-*` 속성 변경 금지
3. ❌ 변수명 형식 변경 금지 (`{$변수명}`)
4. ❌ `<!--@import(...)-->` 주석 변경 금지
5. ❌ 기존 JavaScript 코드 수정 금지

### 경로 지정 규칙
- ✅ **절대 경로 필수**: `/wooden-myfolder/css/mystyle.css`
- ❌ **상대경로 금지**: `../wooden-myfolder/css/mystyle.css`
- ❌ **드라이브 문자 금지**: `C:\path\to\file`

### 파일 수정 규칙
- ✏️ **3단계**: footer-test.html만 수정
- 🔒 **금지**: footer.html, footer-렌더링.html 수정
- 🔒 **금지**: 다른 모듈 파일 수정

---

## 📚 참고 문서

| 문서 | 위치 | 용도 |
|------|------|------|
| **footer-module.md** | `/work/footer/문서/` | 모듈/변수/속성 분석 |
| **DESIGN.md** | `/wooden-myfolder/css/` | 색상/타이포그래피 |
| **ub-variables.css** | `/wooden-myfolder/css/` | CSS 변수 정의 |
| **ub-grid-system.css** | `/wooden-myfolder/css/` | 그리드 시스템 |
| **architecture.md** | 루트 | 프로젝트 구조 |
| **copilot-instructions.md** | `.github/` | AI 지침 |

---

## 🚀 다음 단계

### 3단계: 코드 구현
```
footer-test.html을 디자인 시안에 맞게 작업해주세요.
참고: footer-module.md, DESIGN.md, ub-variables.css
```

---

**계획 작성 완료**: 2026년 6월 1일  
**상태**: ✅ 2단계 기획 단계 완료  
**다음 진행**: 3단계 코드 구현 (footer-test.html 작업)

