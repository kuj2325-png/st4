# Footer 모듈 및 변수 분석

## 1. Cafe24 모듈과 종속 변수

### 1.1 모듈 목록

| 모듈명 | 위치 | 렌더링 클래스 추가 | 역할 |
|--------|------|-----------------|------|
| `Layout_stateLogon` | `.bottom-nav__tabBar li` (Cart, 마이쇼핑) | `xans-layout-statelogon` | 로그인 상태 표시 요소 |
| `Layout_stateLogoff` | `.bottom-nav__tabBar li` (Cart, 마이쇼핑) | `xans-layout-statelogoff` | 로그오프 상태 표시 요소 |
| `bottom-navigation` | `.bottom-nav` | (추가 없음) | 하단 네비게이션 컴포넌트 |
| `Layout_LogoBottom` | `.bt_logo` | `xans-layout-logobottom` | 하단 로고 영역 |
| `Layout_footer` | `.inner` | `xans-layout-footer` | 푸터 메인 콘텐츠 영역 |
| `Layout_Info` | `.cs_center_txt` | `xans-layout-info` | 고객센터 정보 영역 |

---

## 2. 모듈별 렌더링 결과 및 클래스/변수

### 2.1 bottom-navigation 모듈
```
위치: <div class="bottom-nav RMB RTB" ez-module="bottom-navigation">
렌더링 변수: <!--@import(/svg/icon-*.html)--> → 실제 SVG 아이콘 치환
추가 클래스: (선택적) bottom-nav__top--show
변수 위치:
  - 네비게이션 텍스트 (정적): 네비게이션, 검색, 홈, Cart, 마이쇼핑
```

### 2.2 Layout_stateLogon 모듈 (로그인 상태)
```
위치: <li module="Layout_stateLogon"> (Cart, 마이쇼핑 항목)
렌더링 시 추가 클래스: xans-element- xans-layout xans-layout-statelogon
종속 변수: {$basket_count_display}, {$basket_count_display_class}, {$basket_count}
렌더링 결과값:
  - {$basket_count_display}: display 클래스 제어 (displaynone 또는 표시)
  - {$basket_count_display_class}: 추가 클래스 (EC-Layout_Basket-count-display)
  - {$basket_count}: 실제 수량값 (예: 0)
위치: Cart 아이콘 옆 <span class="count">
```

### 2.3 Layout_stateLogoff 모듈 (로그오프 상태)
```
위치: <li module="Layout_stateLogoff"> (Cart, 마이쇼핑 항목)
렌더링 시 추가 클래스: xans-element- xans-layout xans-layout-statelogoff
종속 변수: 동일 (로그인/비로그인 상태만 다름)
역할: footer-렌더링.html에서는 Layout_stateLogon으로 렌더링되었음
```

### 2.4 Layout_LogoBottom 모듈 (하단 로고)
```
위치: <div class="bt_logo" module="Layout_LogoBottom">
렌더링 시 추가 클래스: xans-element- xans-layout xans-layout-logobottom
종속 변수: {$mall_name}
렌더링 결과값: 플랑고
위치: <a href="/"> 내부 텍스트
```

### 2.5 Layout_footer 모듈 (푸터 메인 영역)
```
위치: <div class="inner" module="Layout_footer">
렌더링 시 추가 클래스: xans-element- xans-layout xans-layout-footer
종속 변수 (직접):
  - {$company_name}: 플랑고
  - {$president_name}: 김유진
  - {$mall_zipcode}: 16046
  - {$mall_addr1}: 의왕더샵캐슬 경기도 의왕시 어내들로 5
  - {$mall_addr2}: (오전동)
  - {$phone}: 010-8610-7907
  - {$company_regno}: 778-11-03047
  - {$network_regno}: (공란)
  - {$cpo_name}: 김유진
  - {$mall_name}: 플랑고 (copyright에서도 사용)

자식 변수 (Layout_Info 모듈 내):
  - {$inquiry_email}: woozoo7907@naver.com
  - {$runtime}: 평일 10:00 - 17:00 / 점심 12:00 - 13:00 / 토요일,일요일,공휴일 휴일
```

### 2.6 Layout_Info 모듈 (고객센터 정보)
```
위치: <div class="cs_center_txt" module="Layout_Info">
렌더링 시 추가 클래스: xans-element- xans-layout xans-layout-info
종속 변수:
  - {$phone}: 010-8610-7907 (상담/주문전화)
  - {$inquiry_email}: woozoo7907@naver.com (상담/주문 이메일)
  - {$runtime}: 평일 10:00 - 17:00 / 점심 12:00 - 13:00 / 토요일,일요일,공휴일 휴일
위치: .wrap_cs 내부 .cs_center_txt
```

---

## 3. data-ez-* 속성 목록

| 속성명 | 위치 | 역할 | 값 예시 |
|--------|------|------|--------|
| `data-ez` | 최상위 요소들 | 컨텐츠/모듈 고유 식별자 | `contents-0sn7cig-1`, `contents-1ohjtwy-1`, `module-0vlm03h-1` |
| `data-ez-module` | `.bottom-nav` | 모듈 타입 지정 | `bottom-navigation`, `user-defined/1` |
| `data-ez-layout` | `#footer` | 레이아웃 유형 | `layout01` |
| `data-ez-name` | `.footer_margin` | 모듈 이름 | `USER DEFINED` |
| `data-ez-type` | `.footer_margin` | 모듈 타입 | `plain` |
| `data-ez-group` | 여러 섹션 | 콘텐츠 그룹화 | `info`, `shortcut`, `cs`, `bank`, `sns` |
| `data-ez-role` | 세부 요소 | 요소의 역할/의미 | `title`, `list`, `item`, `field`, `value`, `bank_name`, `account_number`, `account_name` |
| `data-ez-item` | 개별 항목 | 항목 식별자 | `company_name`, `president_name`, `address`, `phone`, `company_regno`, `network_regno`, `cpo_name`, `company`, `agreement`, `privacy`, `guide`, `email`, `runtime`, `instagram`, `youtube`, `facebook`, `kakao`, `twitter`, `blog` |
| `data-ez-escrow` | `.bt_escrow` | 구매안전서비스 배너 컨트롤 | `(속성만 존재)` |
| `data-ez-link` | `.bt_escrow a` | 링크 참조 | `#link` |
| `data-ez-escrow-id` | `.bt_escrow img` | 에스크로 서비스별 ID | `allat`, `inicis`, `kcp`, `kicc`, `ksnet`, `nicepay`, `dacom`, `settlebank`, `smartro` |
| `aria-hidden` | `.icon` | 스크린리더 무시 표시 | `true` |

### 3.1 data-ez-group 별 상세 역할

| 그룹명 | 위치 | 포함 항목 | 역할 |
|--------|------|----------|------|
| `info` | `.bt_info` | company_name, president_name, address, phone, company_regno, network_regno, cpo_name | 쇼핑몰 기본정보 표시 |
| `shortcut` | `.bt_util` | company, agreement, privacy, guide, 1:1문의, 기획전 | 바로가기 링크 모음 |
| `cs` | `.cs_center_txt` | phone, email, runtime | 고객센터 정보 |
| `bank` | `.bank_txt` | bank_name, account_number, account_name | 무통장 계좌정보 |
| `sns` | `.sns_txt` | instagram, youtube, facebook, kakao, twitter, blog | SNS 링크 모음 |

---

## 4. 작업 시 수정 금지 항목

### 4.1 절대 수정 금지
- ✅ **data-ez-* 속성 모두**: Cafe24 서버 사이드 렌더링에 필수적인 식별자
  - `data-ez`, `data-ez-module`, `data-ez-layout`, `data-ez-group`, `data-ez-role`, `data-ez-item`
  - `data-ez-escrow`, `data-ez-link`, `data-ez-escrow-id`, `data-ez-name`, `data-ez-type`
- ✅ **모듈 속성**: `module="모듈명"`
- ✅ **변수 형식**: `{$변수명}` (대소문자 구분)
- ✅ **주석**: `<!--@import(/svg/icon-*.html)-->` (SVG 임포트 지시문)
- ✅ **구매안전 서비스 배너**: `.bt_escrow` 섹션 (법규 관련)

### 4.2 조건부 수정 제한
- ⚠️ **클래스 추가**: 레이아웃 변경 필요 시 기존 클래스는 유지하고 새로운 클래스만 추가
- ⚠️ **레이아웃 구조**: `<div class="inner_t">`, `<div class="inner_b">` 등 주요 구조 유지
- ⚠️ **data-ez-role 속성**: 요소의 의미 변경 시에만 수정

### 4.3 가능한 수정 항목
- ✏️ **스타일/클래스**: 디자인 필요시 새 클래스 추가
- ✏️ **하위 마크업**: 변수/모듈 유지 하에서 구조 변경 가능
- ✏️ **텍스트**: 정적 텍스트 (네비게이션 항목, 바로가기 텍스트 등) 수정 가능
- ✏️ **링크 경로**: href 값 변경 가능 (module이 없는 순수 링크)

### 4.4 렌더링 시 자동 처리
- 🔄 **클래스 자동 추가**: `module="모듈명"` 적용 시 `xans-element- xans-layout xans-layout-{모듈명}` 자동 추가
- 🔄 **SVG 변환**: `<!--@import(/svg/icon-*.html)-->` 자동으로 실제 SVG 코드로 치환
- 🔄 **변수 렌더링**: `{$변수명}` 자동으로 실제 값으로 치환

---

## 5. 주요 주석 위치

| 주석 유형 | 위치 | 용도 |
|----------|------|------|
| `<!--@import(/svg/icon-search.html)-->` | `.btnSearch` | 검색 아이콘 |
| `<!--@import(/svg/icon-home.html)-->` | 홈 링크 | 홈 아이콘 |
| `<!--@import(/svg/icon-cart.html)-->` | Cart 링크 | 장바구니 아이콘 |
| `<!--@import(/svg/icon-user.html)-->` | 마이쇼핑 링크 | 사용자 아이콘 |
| `<!--@import(/svg/icon-quick-arrow.html)-->` | 상단 이동 링크 | 위쪽 화살표 아이콘 |
| `<!-- //right_quick -->` | 우측 퀵메뉴 후 | 섹션 종료 표시 |
| `<!-- //구매안전서비스 배너 -->` | `.bt_escrow` 전 | 구매안전 배너 설명 |

---

## 6. 렌더링 변수 매핑

### 6.1 기본정보 섹션 변수
```
{$mall_name}           → 플랑고 (쇼핑몰 이름)
{$company_name}        → 플랑고 (상호명)
{$president_name}      → 김유진 (대표자명)
{$mall_zipcode}        → 16046 (우편번호)
{$mall_addr1}          → 의왕더샵캐슬 경기도 의왕시 어내들로 5 (주소 1)
{$mall_addr2}          → (오전동) (주소 2)
{$phone}               → 010-8610-7907 (대표 전화)
{$company_regno}       → 778-11-03047 (사업자 등록번호)
{$network_regno}       → (공란) (통신판매업 신고번호)
{$cpo_name}            → 김유진 (개인정보보호책임자)
```

### 6.2 고객센터 섹션 변수
```
{$inquiry_email}       → woozoo7907@naver.com (상담/주문 이메일)
{$runtime}             → 평일 10:00 - 17:00 / 점심 12:00 - 13:00 / 토요일,일요일,공휴일 휴일 (CS운영시간)
```

### 6.3 동적 조건부 변수
```
{$basket_count_display}        → displaynone (display 클래스 값)
{$basket_count_display_class}  → EC-Layout_Basket-count-display (추가 클래스)
{$basket_count}                → 0 (장바구니 아이템 수)
{$biz_no_link}                 → (선택적) 통신판매업 신고 링크
```

---

## 7. 금지 항목 요약표

| 항목 | 설명 | 예시 |
|------|------|------|
| **data-ez 속성** | Cafe24 고유 식별자 - 절대 수정 금지 | `data-ez="contents-0sn7cig-1"` |
| **module 속성** | 모듈 이름 - 절대 수정 금지 | `module="Layout_footer"` |
| **변수명** | Cafe24 변수 - 정확한 형식 유지 필수 | `{$mall_name}` |
| **@import 주석** | SVG 아이콘 로드 지시문 - 절대 수정 금지 | `<!--@import(/svg/icon-search.html)-->` |
| **구매안전배너** | 법규 관련 콘텐츠 - 구조 변경 금지 | `.bt_escrow` 섹션 |
| **data-ez-role** | 시맨틱 역할 표시 - 의미 변경 시만 수정 | `data-ez-role="title"` |

