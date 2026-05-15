/**
 * Swiper 슬라이더 기능 스크립트
 * - Swiper 인스턴스 초기화
 * - 재생/정지 토글 버튼 기능
 * 
 * Cafe24 환경: <!--@js(url)--> 구문으로 로드
 * 전역 스코프 오염 방지를 위해 IIFE로 감싸짐
 */

(function() {
  'use strict';

  /**
   * DOM 준비 상태 확인 후 초기화 함수 실행
   * Cafe24 환경에서는 defer 속성을 사용할 수 없으므로
   * readyState를 확인하여 적절히 처리
   */
  function initWhenReady() {
    if (document.readyState === 'loading') {
      // DOM이 아직 로딩 중이면 이벤트 리스너 등록
      document.addEventListener('DOMContentLoaded', initSwiper);
    } else {
      // DOM이 이미 준비되어 있으면 바로 실행
      initSwiper();
    }
  }

  /**
   * Swiper 슬라이더 및 토글 버튼 초기화
   */
  function initSwiper() {
    // Swiper 인스턴스 생성 및 설정
    const swiper1 = new Swiper('.swiper1', {
      // 슬라이드 이동 방향: 수평
      direction: 'horizontal',
      // 슬라이드 루프 활성화 (마지막 슬라이드 다음에 처음 슬라이드)
      loop: true,
      // 현재 슬라이드를 뷰의 가운데 위치
      centeredSlides: true,
      // 한 번에 보여줄 슬라이드 개수
      slidesPerView: 3,
      // 슬라이드 간 여백 (픽셀)
      spaceBetween: 20,
      // 자동 재생 설정
      autoplay: {
        delay: 1000, // 3초마다 자동 전환
        disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 계속
      },
      // 페이지네이션 설정
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar', // 프로그레스바 형식
        clickable: true,
      },
      // 네비게이션 버튼 설정
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        addIcons: false, // 커스텀 이미지 사용
      },
    });

    // 재생/정지 토글 버튼 기능
    initPlayToggle(swiper1);
  }

  /**
   * 재생/정지 토글 버튼 초기화
   * @param {Swiper} swiper - Swiper 인스턴스
   */
  function initPlayToggle(swiper) {
    const playToggle = document.querySelector('.swiper-button-play-toggle');

    // null 체크: 버튼 요소가 존재하는지 확인
    if (!playToggle) {
      console.warn('재생/정지 토글 버튼을 찾을 수 없습니다.');
      return;
    }

    // 클릭 이벤트 리스너 등록
    playToggle.addEventListener('click', function() {
      if (swiper.autoplay.running) {
        // 현재 재생 중이면 정지
        swiper.autoplay.stop();
        // 클래스 변경: 정지 상태 표시
        playToggle.classList.remove('is-play');
        playToggle.classList.add('is-pause');
      } else {
        // 현재 정지 중이면 재생
        swiper.autoplay.start();
        // 클래스 변경: 재생 상태 표시
        playToggle.classList.remove('is-pause');
        playToggle.classList.add('is-play');
      }
    });
  }

  // 페이지 로드 시 초기화 함수 실행
  initWhenReady();
})();
