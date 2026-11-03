// 사장님이 바꾸는 곳 ------------------------------------------------
// 카카오톡 채널(또는 오픈채팅) 주소를 따옴표 안에 넣으면 문의 폼 아래에 카카오톡 버튼이 생겨요.
// 예: const KAKAO_URL = "https://pf.kakao.com/_abcde/chat";
const KAKAO_URL = "";

// 공방 사진: images 폴더에 사진을 넣고 파일 이름과 짧은 설명을 적어요.
// 예: { src: "images/class-1.jpg", alt: "커플이 향을 고르는 모습" }
const PHOTOS = [];
// -------------------------------------------------------------------

if (KAKAO_URL) {
  document.querySelectorAll("[data-kakao]").forEach((link) => {
    link.href = KAKAO_URL;
    link.target = "_blank";
    link.rel = "noopener";
    link.hidden = false;
  });
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

const form = document.getElementById("inquiry");
const statusEl = document.getElementById("inquiry-status");

function showStatus(text, isError) {
  statusEl.textContent = text;
  statusEl.classList.toggle("is-error", isError);
  statusEl.hidden = false;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const value = (id) => document.getElementById(id).value.trim();
  const body = {
    name: value("f-name"),
    contact: value("f-contact"),
    message: value("f-date"),
    website: value("f-website"),
    consent: document.getElementById("f-consent").checked,
  };
  if (!body.name || !body.contact) return showStatus("이름과 연락처를 적어 주세요.", true);
  if (!body.consent) return showStatus("개인정보 수집·이용에 동의해 주세요.", true);

  const button = form.querySelector("button[type=submit]");
  button.disabled = true;
  button.textContent = "보내는 중";
  try {
    const r = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(data.error || "저장하지 못했어요. 잠시 뒤 다시 시도해 주세요.");
    form.reset();
    showStatus("문의가 접수됐어요. 확인 후 연락드릴게요.", false);
  } catch (err) {
    showStatus(err.message, true);
  } finally {
    button.disabled = false;
    button.textContent = "문의 남기기";
  }
});
