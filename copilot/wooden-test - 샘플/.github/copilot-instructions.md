# Copilot 프로젝트 지침

이 파일은 GitHub Copilot이 이 프로젝트에서 코드를 생성할 때 따라야 할 모든 규칙과 컨벤션을 정의합니다.

---

## 🎯 프로젝트 개요

**Cafe24 쇼핑몰 스킨 커스터마이징 프로젝트**

- 정적 HTML/CSS/JS 기반 (Node/npm 빌드 시스템 없음)
- Cafe24 서버사이드 템플릿 변환 작업
- Live Preview 기반 로컬 개발
- 모듈별 폴더 분리 관리

자세한 프로젝트 구조: [architecture.md](../architecture.md)

---

## 📋 핵심 파일 3종류

모든 모듈(`footer`, `header`, `main` 등)은 다음 3가지 파일로 관리됩니다:

| 파일명 | 역할 | 경로 | 수정 대상 |
|--------|------|------|---------|
| **[모듈명]-test.html** | 🔴 로컬 작업 파일 (샌드박스) | `/work/[모듈]/` | ✅ 실제 코딩 |
| **[모듈명]-렌더링.html** | 📖 렌더링 정답지 | `/work/[모듈]/` | ⚠️ 5-1단계만 |
| **[모듈명].html** | 📤 최종 서버용 템플릿 | `/work/[모듈]/` | ⚠️ 5-2단계만 |

**중요**: 각 단계에서는 해당 파일만 수정합니다. 다른 파일을 건드리지 않습니다.

---

## 🔐 절대 금지 항목 (DO NOT MODIFY)

### 1. Cafe24 속성
- ❌ `data-ez-*` 속성: 서버 렌더링에 필수적
- ❌ `module="모듈명"` 속성: 모듈 식별자
- ❌ 변수 형식: `{$변수명}` (대소문자 구분)
- ❌ `<!--@import(...)-->` 주석: SVG 자동 로드 지시문

### 2. 구조 변경 금지
- ❌ `/work/[모듈]/문서/` 폴더의 분석 문서 수정
- ❌ `.github/` 폴더 구조 변경
- ❌ 기존 JavaScript 코드 수정 (추가만 가능)

### 3. 경로 규칙 위반
- ❌ 상대경로 사용 (예: `css/style.css`)
- ❌ 드라이브 문자 포함 (예: `C:\path\to\file`)
- ❌ 루트 없는 경로 (예: `wooden-myfolder/css/`)

---

## ✅ 필수 규칙

### HTML/CSS 규칙

1. **CSS 참조 우선순위**
   ```
   1순위: /wooden-myfolder/css/ub-grid-system.css (그리드 시스템)
   2순위: /wooden-myfolder/css/ub-variables.css (변수 정의)
   3순위: /wooden-myfolder/css/mystyle.css (커스텀 스타일)
   4순위: /layout/basic/layout.html (기본 스타일)
   ```

2. **이미지 경로**
   - 로컬 작업 (test.html): 상대경로 또는 `/img/`
   - 렌더링 (렌더링.html): `/SkinImg/img/`
   - 서버용 (.html): `/SkinImg/img/` 또는 변수 `{$}`

3. **절대 경로 사용**
   ```html
   ✅ <link rel="stylesheet" href="/wooden-myfolder/css/mystyle.css">
   ✅ <img src="/SkinImg/img/icon.svg">
   ❌ <link rel="stylesheet" href="wooden-myfolder/css/mystyle.css">
   ❌ <link rel="stylesheet" href="../wooden-myfolder/css/mystyle.css">
   ```

### JavaScript 규칙

1. **라이브러리 버전 (고정)**
   - jQuery: 3.6.0 (버전 변경 금지)
   - Swiper: 4.5.1 (버전 변경 금지)
   - 기타: Vanilla JS 권장

2. **코드 작성 패턴**
   ```javascript
   // ✅ IIFE 패턴 (전역 오염 방지)
   (function() {
     if (document.readyState !== 'loading') {
       // DOM 로드 완료
       initModule();
     } else {
       document.addEventListener('DOMContentLoaded', initModule);
     }
     
     function initModule() {
       // 모듈 초기화
     }
   })();
   
   // ❌ 전역 변수 선언
   var globalVar = 123;
   ```

3. **기존 코드 정책**
   - ✅ 새로운 기능만 추가
   - ❌ 기존 jQuery/Vanilla JS 수정 금지

### Cafe24 모듈 규칙

1. **모듈 속성**
   ```html
   ✅ <div class="inner" module="Layout_footer">
   ```
   - `module="모듈명"` 형식 필수
   - 모듈명은 footer-module.md 참조

2. **변수 형식**
   ```html
   ✅ {$mall_name}        → 쇼핑몰명
   ✅ {$phone}            → 전화번호
   ✅ {$company_name}     → 회사명
   ```
   - 정확한 대소문자 유지 필수
   - footer-module.md에서 변수 목록 확인

3. **data-ez-* 속성**
   - 절대 수정 금지
   - 서버 사이드 렌더링 필수 요소
   - footer-module.md에 속성 목록 정리됨

---

## 🔄 작업 워크플로우 (6단계)

### 0단계: Cafe24 모듈/변수 학습 ✅ (완료)
- [footer-module.md](../work/footer/문서/footer-module.md) 참조
- 모듈, 변수, data-ez-* 속성 학습

### 1단계: 환경설정 ✅ (완료)
- [architecture.md](../architecture.md): 프로젝트 구조
- `.github/copilot-instructions.md`: 이 파일 (AI 지침)

### 2단계: 기획 (footer-plan.md 작성)
```
@plan 디자인 시안에 맞춰 footer 모듈을 커스터마이징하는 
계획을 수립하고 /work/footer/문서/footer-plan.md에 작성해 주세요
```
- 디자인 분석
- 구현 계획 수립
- 사용할 모듈 및 변수 정의

### 3단계: 코드 구현 (footer-test.html 작업)
```
footer 디자인된 이미지와 footer-test.html을 제공하여
디자인에 맞게 html, css, js 작업을 해주세요
```
- **수정 대상**: `/work/footer/footer-test.html`
- **스타일**: `/work/footer/ub-footer.css` (필요시)
- **스크립트**: `/work/footer/ub-footer.js` (필요시)
- **경로**: 로컬 경로 기반 (`/img/`, 상대경로 가능)

### 4단계: 시각적 검수
- Live Preview에서 footer-test.html 확인
- 디자인 시안과 비교 검수
- 수정 사항 반영

### 5-1단계: 렌더링 파일 업데이트
```
검수가 완료된 footer-test.html 파일의 푸터 마크업과 
스타일을 바탕으로 footer-렌더링.html 파일을 업데이트
```
- **수정 대상**: `/work/footer/footer-렌더링.html`
- **추출 범위**: `<!--footer 렌더링 부분 시작-->` ~ `<!--footer 렌더링 부분 끝-->`
- **경로**: Cafe24 경로로 변경 (`/SkinImg/img/`)
- **속성**: data-ez-* 속성 유지

### 5-2단계: 서버용 템플릿 변환
```
footer-렌더링.html을 카페24 서버사이드 템플릿으로 
변환해서 /work/footer/footer.html을 작성해줘
```
- **수정 대상**: `/work/footer/footer.html`
- **변환 규칙**:
  1. footer-module.md 모듈 목록 기준으로 `module="모듈명"` 교체
  2. 렌더링된 값을 `{$변수명}`으로 교체
  3. data-ez-* 속성 유지
  4. 불확실한 항목은 주석 표시: `<!-- TODO: 확인 필요 -->`

### 6단계: 배포
- `/work/footer/footer.html` → `/layout/basic/footer.html` 복사
- 테스트 서버 확인
- 배포 완료

---

## 📚 참고 문서

| 문서 | 위치 | 용도 |
|------|------|------|
| **Readme.md** | 루트 | 프로젝트 비전 및 개요 |
| **architecture.md** | 루트 | 전체 폴더 구조 및 파일 관계도 |
| **footer-module.md** | `/work/footer/문서/` | 모듈/변수/속성 분석 결과 |
| **footer-plan.md** | `/work/footer/문서/` | 2단계 구현 계획 (작성 예정) |
| **DESIGN.md** | `/wooden-myfolder/css/` | CSS 색상/타이포그래피 규칙 |
| **단계별 프롬프트.md** | `/참고/` | 작업 프롬프트 템플릿 모음 |
| **ub-grid-system.css** | `/wooden-myfolder/css/` | 그리드 레이아웃 시스템 |
| **ub-variables.css** | `/wooden-myfolder/css/` | CSS 변수 정의 |

---

## 🛠️ 자주 사용하는 프롬프트 패턴

### 파일 생성/수정 시
```
@workspace를 참고하여 [파일명]을 [요구사항]에 맞게 작성해줘.
참고 파일: [관련 파일 경로]
```

### 디자인 이미지 분석 시
```
/work/footer/문서/footer기획-1.jpg, footer기획-2.jpg를 
확인하고 footer-test.html을 디자인에 맞게 작업해줘
```

### 변환 작업 시
```
footer-module.md의 모듈 목록을 기준으로
footer-렌더링.html을 footer.html로 변환해줘.

변환 규칙:
1. [규칙 1]
2. [규칙 2]
3. [규칙 3]
```

---

## ⚠️ 흔한 실수 및 해결

| 문제 | 원인 | 해결 방법 |
|------|------|---------|
| "경로를 찾을 수 없음" | 상대경로 또는 잘못된 경로 | `/wooden-myfolder/css/` 형식으로 절대경로 사용 |
| "모듈이 작동하지 않음" | data-ez-* 속성 변경 | footer-module.md 참조하여 원래 값 복구 |
| "변수가 렌더링 안 됨" | `{$변수}` 형식 오류 | footer-module.md에서 정확한 변수명 확인 |
| "CSS 스타일 적용 안 됨" | CSS 경로 오류 또는 우선순위 | ub-grid-system.css → ub-variables.css 우선순위 확인 |
| "JavaScript 에러" | jQuery/Swiper 버전 호환성 | jQuery 3.6.0, Swiper 4.5.1 스펙 준수 |

---

## 🎓 학습 체크리스트

Copilot이 다음 항목들을 이해했는지 확인합니다:

- [ ] 3가지 파일 역할(-test, -렌더링, .html) 이해
- [ ] 절대 금지 항목 4가지 인식
- [ ] 6단계 워크플로우 숙지
- [ ] 경로 규칙 준수 확인
- [ ] Cafe24 모듈/변수 형식 이해
- [ ] JavaScript 라이브러리 버전 고정
- [ ] CSS 참조 우선순위 이해
- [ ] footer-module.md 문서 참조 가능 확인

---

## 📞 추가 가이드

- **Cafe24 특화**: Readme.md의 "4. 기술 스택 및 개발 규칙" 섹션
- **폴더 구조**: architecture.md의 "🏗️ 디렉토리 구조"
- **모듈/변수**: footer-module.md의 상세 분석표
- **CSS 설계**: wooden-myfolder/css/DESIGN.md의 톤앤매너

