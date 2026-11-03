// 사장님이 바꾸는 곳 ------------------------------------------------
// 카카오톡 채널(또는 오픈채팅) 주소를 따옴표 안에 넣으면 문의 버튼이 켜져요.
// 예: const KAKAO_URL = "https://pf.kakao.com/_abcde/chat";
const KAKAO_URL = "";

// 공방 사진: images 폴더에 사진을 넣고 파일 이름과 짧은 설명을 적어요.
// 예: { src: "images/class-1.jpg", alt: "커플이 향을 고르는 모습" }
const PHOTOS = [];
// -------------------------------------------------------------------

document.querySelectorAll("[data-kakao]").forEach((link) => {
  if (KAKAO_URL) {
    link.href = KAKAO_URL;
    link.target = "_blank";
    link.rel = "noopener";
    return;
  }
  link.removeAttribute("href");
  link.setAttribute("aria-disabled", "true");
  link.classList.add("is-pending");
  link.querySelector(".kakao__label").textContent = "카카오톡 문의 준비 중";
});

if (!KAKAO_URL) {
  document.querySelectorAll(".kakao-note").forEach((note) => (note.hidden = false));
}

if (PHOTOS.length) {
  const section = document.getElementById("photos");
  const grid = section.querySelector(".photos__grid");
  PHOTOS.forEach(({ src, alt }) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt || "";
    img.loading = "lazy";
    grid.appendChild(img);
  });
  section.hidden = false;
}
