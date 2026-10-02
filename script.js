// ========================================
// MOCK TENDER DATA
// ========================================

const tenders = [
  {
    id: 1,

    title:
      "Авто замын засвар, шинэчлэлтийн ажил",

    organization:
      "Зам тээврийн хөгжлийн яам",

    category:
      "Construction",

    categoryName:
      "Барилга",

    budget:
      "2400000000",

    deadline:
      "2026-10-15",

    location:
      "Улаанбаатар",

    match:
      94,

    description:
      "Хотын авто замын тодорхой хэсгүүдэд засвар, шинэчлэл хийх гүйцэтгэгчийг сонгон шалгаруулна.",

    requirements: [
      "Барилгын тусгай зөвшөөрөл",
      "3-аас дээш жилийн туршлага",
      "Сүүлийн 2 жилийн санхүүгийн тайлан",
      "Техникийн санал",
      "Ажил гүйцэтгэх төлөвлөгөө"
    ]
  },

  {
    id: 2,

    title:
      "Сургуулийн мэдээллийн систем хөгжүүлэх",

    organization:
      "Боловсролын яам",

    category:
      "IT",

    categoryName:
      "IT",

    budget:
      850000000,

    deadline:
      "2026-10-08",

    location:
      "Улаанбаатар",

    match:
      77,

    description:
      "Сургуулийн удирдлага, сурагч болон багш нарт зориулсан нэгдсэн мэдээллийн систем хөгжүүлэх төсөл.",

    requirements: [
      "Программ хангамжийн туршлага",
      "Backend болон frontend хөгжүүлэлт",
      "Системийн аюулгүй байдлын төлөвлөгөө",
      "Өмнөх төслийн туршлага"
    ]
  },

  {
    id: 3,

    title:
      "Эмнэлгийн тоног төхөөрөмж нийлүүлэх",

    organization:
      "Эрүүл мэндийн яам",

    category:
      "Healthcare",

    categoryName:
      "Эрүүл мэнд",

    budget:
      1250000000,

    deadline:
      "2026-10-04",

    location:
      "Дархан",

    match:
      69,

    description:
      "Орон нутгийн эмнэлгүүдэд шаардлагатай тоног төхөөрөмж нийлүүлэх сонгон шалгаруулалт.",

    requirements: [
      "Тоног төхөөрөмж нийлүүлэх зөвшөөрөл",
      "Үйлдвэрлэгчийн баталгаажуулалт",
      "Гарал үүслийн гэрчилгээ",
      "Баталгаат хугацаа"
    ]
  },

  {
    id: 4,

    title:
      "Оффисын компьютер, тоног төхөөрөмж нийлүүлэх",

    organization:
      "Төрийн худалдан авах ажиллагааны газар",

    category:
      "Supply",

    categoryName:
      "Бараа нийлүүлэлт",

    budget:
      390000000,

    deadline:
      "2026-10-22",

    location:
      "Улаанбаатар",

    match:
      83,

    description:
      "Компьютер, дэлгэц, принтер болон оффисын бусад тоног төхөөрөмж худалдан авах.",

    requirements: [
      "Компанийн гэрчилгээ",
      "Барааны техникийн үзүүлэлт",
      "Үнийн санал",
      "Нийлүүлэх хугацааны баталгаа"
    ]
  },

  {
    id: 5,

    title:
      "Сургуулийн шинэ барилга барих ажил",

    organization:
      "Нийслэлийн хөрөнгө оруулалтын газар",

    category:
      "Construction",

    categoryName:
      "Барилга",

    budget:
      5200000000,

    deadline:
      "2026-10-29",

    location:
      "Улаанбаатар",

    match:
      91,

    description:
      "960 хүүхдийн суудалтай шинэ ерөнхий боловсролын сургуулийн барилга барих.",

    requirements: [
      "Барилгын тусгай зөвшөөрөл",
      "5 жилийн туршлага",
      "Ижил төрлийн 2-оос доошгүй төсөл",
      "Инженер техникийн ажилтнуудын мэдээлэл",
      "Санхүүгийн чадавх"
    ]
  },

  {
    id: 6,

    title:
      "Төрийн байгууллагын веб сайт шинэчлэх",

    organization:
      "Цахим хөгжил, инновацын яам",

    category:
      "IT",

    categoryName:
      "IT",

    budget:
      280000000,

    deadline:
      "2026-11-02",

    location:
      "Улаанбаатар",

    match:
      74,

    description:
      "Төрийн байгууллагын одоо ашиглаж буй веб сайтыг шинэ дизайн болон системтэй болгох.",

    requirements: [
      "Web development туршлага",
      "UI/UX дизайн",
      "Responsive веб",
      "Аюулгүй байдлын шийдэл"
    ]
  },

  {
    id: 7,

    title:
      "Цэцэрлэгийн засварын ажил",

    organization:
      "Баянзүрх дүүргийн ЗДТГ",

    category:
      "Construction",

    categoryName:
      "Барилга",

    budget:
      470000000,

    deadline:
      "2026-10-11",

    location:
      "Улаанбаатар",

    match:
      88,

    description:
      "Цэцэрлэгийн барилгын дотор болон гадна засварын ажил.",

    requirements: [
      "Барилгын тусгай зөвшөөрөл",
      "2 жилийн туршлага",
      "Үнийн санал",
      "Ажил гүйцэтгэх хугацаа"
    ]
  },

  {
    id: 8,

    title:
      "Сервер болон сүлжээний төхөөрөмж нийлүүлэх",

    organization:
      "Үндэсний дата төв",

    category:
      "Supply",

    categoryName:
      "Бараа нийлүүлэлт",

    budget:
      1750000000,

    deadline:
      "2026-10-19",

    location:
      "Улаанбаатар",

    match:
      72,

    description:
      "Дата төвийн сервер болон сүлжээний тоног төхөөрөмж нийлүүлэх.",

    requirements: [
      "Албан ёсны борлуулагч байх",
      "Үйлдвэрлэгчийн сертификат",
      "3 жилийн баталгаа",
      "Техникийн тодорхойлолт"
    ]
  }
];


// ========================================
// STATE
// ========================================

let savedTenders =
  JSON.parse(
    localStorage.getItem("savedTenders")
  ) || [];


// ========================================
// PAGE NAVIGATION
// ========================================

const pageTitles = {

  dashboard: {
    title: "Dashboard",

    subtitle:
      "Танд тохирох тендерүүдийг хурдан олоорой."
  },

  tenders: {
    title: "Tenders",

    subtitle:
      "Нээлттэй тендерүүдийг хайж, шүүнэ үү."
  },

  "ai-match": {
    title: "AI Match",

    subtitle:
      "AI санал болгосон тендерүүд."
  },

  qualification: {
    title: "Qualification",
    subtitle: "Тендерийн шаардлагын үнэлгээ, нотлох баримт, эх сурвалж."
  },

  saved: {
    title: "Saved Tenders",

    subtitle:
      "Таны хадгалсан тендерүүд."
  },

  contracts: {
    title: "Contract Comparison",

    subtitle:
      "Гэрээний хувилбаруудыг AI-аар харьцуулна."
  },

  profile: {
    title: "Profile",
    subtitle: "Хэрэглэгчийн мэдээллээ шинэчилнэ үү."
  },

  company: {
    title: "Company Profile",

    subtitle:
      "Компанийн мэдээллээ шинэчилнэ үү."
  }

};


function changePage(pageId) {

  document
    .querySelectorAll(".page")
    .forEach(page => {

      page.classList.remove("active-page");

    });


  document
    .querySelectorAll(".nav-item")
    .forEach(item => {

      item.classList.remove("active");

    });


  const selectedPage =
    document.getElementById(pageId);

  if (selectedPage) {

    selectedPage.classList.add(
      "active-page"
    );

  }


  const selectedNav =
    document.querySelector(
      `[data-page="${pageId}"]`
    );

  if (selectedNav) {

    selectedNav.classList.add(
      "active"
    );

  }


  const info =
    pageTitles[pageId];

  if (info) {

    document.getElementById(
      "pageTitle"
    ).textContent = info.title;

    document.getElementById(
      "pageSubtitle"
    ).textContent = info.subtitle;

  }


  if (pageId === "saved") {

    renderSavedTenders();

  }


  if (pageId === "ai-match") {

    renderAiMatches();

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


document
  .querySelectorAll(".nav-item")
  .forEach(item => {

    item.addEventListener(
      "click",
      () => {

        changePage(
          item.dataset.page
        );

      }
    );

  });


// ========================================
// NUMBER FORMAT
// ========================================

function formatMoney(value) {

  if (value >= 1000000000) {

    const billion =
      value / 1000000000;

    return (
      billion
        .toFixed(1)
        .replace(".0", "") +
      " тэрбум ₮"
    );

  }


  if (value >= 1000000) {

    return (
      Math.round(
        value / 1000000
      ) +
      " сая ₮"
    );

  }


  return (
    value.toLocaleString() +
    " ₮"
  );

}


// ========================================
// DAYS LEFT
// ========================================

function getDaysLeft(deadline) {

  const today =
    new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );


  const end =
    new Date(deadline);

  const difference =
    end - today;


  return Math.ceil(
    difference /
    (1000 * 60 * 60 * 24)
  );

}


// ========================================
// CARD HTML
// ========================================

function createTenderCard(tender) {

  const isSaved =
    savedTenders.includes(
      tender.id
    );


  return `

    <article class="tender-card">

      <div class="tender-top">

        <span class="category-badge">
          ${tender.categoryName}
        </span>

        <button
          class="save-btn
          ${isSaved ? "saved" : ""}"
          onclick="toggleSave(${tender.id})"
        >
          ${isSaved ? "⭐" : "☆"}
        </button>

      </div>


      <h3>
        ${tender.title}
      </h3>


      <p class="organization">
        🏢 ${tender.organization}
      </p>


      <div class="tender-info">

        <div class="info-row">

          <span>
            💰 Төсөв
          </span>

          <strong>
            ${formatMoney(tender.budget)}
          </strong>

        </div>


        <div class="info-row">

          <span>
            📍 Байршил
          </span>

          <strong>
            ${tender.location}
          </strong>

        </div>


        <div class="info-row">

          <span>
            📅 Дуусах
          </span>

          <strong>
            ${tender.deadline}
          </strong>

        </div>

      </div>


      <div class="match-section">

        <div class="match-top">

          <span>
            AI Match
          </span>

          <span class="match-percent">
            ${tender.match}%
          </span>

        </div>


        <div class="progress">

          <div
            class="progress-bar"
            style="width:
            ${tender.match}%"
          >
          </div>

        </div>

      </div>


      <div class="card-actions">

        <button
          class="secondary-btn"
          onclick="toggleSave(${tender.id})"
        >
          ${isSaved ? "Saved" : "Save"}
        </button>

        <button
          class="primary-btn"
          onclick="openTender(${tender.id})"
        >
          View →
        </button>

      </div>

    </article>

  `;

}


// ========================================
// RENDER TENDERS
// ========================================

function renderTenders(
  list = tenders
) {

  const container =
    document.getElementById(
      "tenderList"
    );


  document.getElementById(
    "resultCount"
  ).textContent =
    list.length;


  if (
    list.length === 0
  ) {

    container.innerHTML = `

      <div class="empty-state">

        <span>🔍</span>

        <h3>
          Тендер олдсонгүй
        </h3>

        <p>
          Хайлтын нөхцөлөө өөрчилж үзээрэй.
        </p>

      </div>

    `;

    return;

  }


  container.innerHTML =
    list
      .map(createTenderCard)
      .join("");

}


// ========================================
// FILTER
// ========================================

const searchInput =
  document.getElementById(
    "searchInput"
  );

const categoryFilter =
  document.getElementById(
    "categoryFilter"
  );

const budgetFilter =
  document.getElementById(
    "budgetFilter"
  );


function filterTenders() {

  const search =
    searchInput
      .value
      .toLowerCase()
      .trim();

  const category =
    categoryFilter.value;

  const budget =
    budgetFilter.value;


  const filtered =
    tenders.filter(
      tender => {

        const searchableText =
          `
          ${tender.title}
          ${tender.organization}
          ${tender.categoryName}
          ${tender.location}
          `
            .toLowerCase();


        const matchesSearch =
          searchableText.includes(
            search
          );


        const matchesCategory =
          category === "all" ||
          tender.category === category;


        let matchesBudget =
          true;


        if (
          budget === "low"
        ) {

          matchesBudget =
            tender.budget <
            500000000;

        }


        if (
          budget === "medium"
        ) {

          matchesBudget =
            tender.budget >=
              500000000 &&
            tender.budget <=
              2000000000;

        }


        if (
          budget === "high"
        ) {

          matchesBudget =
            tender.budget >
            2000000000;

        }


        return (
          matchesSearch &&
          matchesCategory &&
          matchesBudget
        );

      }
    );


  renderTenders(filtered);

}


searchInput.addEventListener(
  "input",
  filterTenders
);

categoryFilter.addEventListener(
  "change",
  filterTenders
);

budgetFilter.addEventListener(
  "change",
  filterTenders
);


// ========================================
// SAVED
// ========================================

function toggleSave(id) {

  if (
    savedTenders.includes(id)
  ) {

    savedTenders =
      savedTenders.filter(
        tenderId =>
          tenderId !== id
      );

    showToast(
      "Тендер хадгалснаас хасагдлаа."
    );

  } else {

    savedTenders.push(id);

    showToast(
      "Тендер хадгалагдлаа ⭐"
    );

  }


  localStorage.setItem(
    "savedTenders",
    JSON.stringify(
      savedTenders
    )
  );


  renderTenders();

  renderSavedTenders();

  updateStats();

}


function renderSavedTenders() {

  const container =
    document.getElementById(
      "savedTenderList"
    );


  const saved =
    tenders.filter(
      tender =>
        savedTenders.includes(
          tender.id
        )
    );


  if (
    saved.length === 0
  ) {

    container.innerHTML = `

      <div class="empty-state">

        <span>⭐</span>

        <h3>
          Одоогоор хадгалсан тендер алга
        </h3>

        <p>
          Тендер дээрх Save товчийг дарж хадгална.
        </p>

      </div>

    `;

    return;

  }


  container.innerHTML =
    saved
      .map(createTenderCard)
      .join("");

}


// ========================================
// AI MATCH
// ========================================

function renderAiMatches() {

  const container =
    document.getElementById(
      "aiMatchList"
    );


  const sorted =
    [...tenders]
      .sort(
        (a, b) =>
          b.match -
          a.match
      );


  container.innerHTML =
    sorted
      .map(createTenderCard)
      .join("");

}


// ========================================
// DASHBOARD
// ========================================

function updateStats() {

  document.getElementById(
    "totalTenderCount"
  ).textContent =
    tenders.length;


  document.getElementById(
    "aiMatchCount"
  ).textContent =
    tenders.filter(
      tender =>
        tender.match >= 80
    ).length;


  document.getElementById(
    "savedCount"
  ).textContent =
    savedTenders.length;


  document.getElementById(
    "deadlineCount"
  ).textContent =
    tenders.filter(
      tender => {

        const days =
          getDaysLeft(
            tender.deadline
          );

        return (
          days >= 0 &&
          days <= 14
        );

      }
    ).length;

}


function renderRecommended() {

  const recommended =
    [...tenders]
      .sort(
        (a, b) =>
          b.match -
          a.match
      )
      .slice(
        0,
        4
      );


  const container =
    document.getElementById(
      "recommendedList"
    );


  container.innerHTML =
    recommended
      .map(
        tender => `

        <div class="mini-tender">

          <div>

            <h4>
              ${tender.title}
            </h4>

            <p>
              ${tender.organization}
            </p>

          </div>

          <span class="mini-match">
            ${tender.match}% Match
          </span>

        </div>

      `
      )
      .join("");

}


function renderDeadlines() {

  const deadlines =
    [...tenders]
      .map(
        tender => ({
          ...tender,

          days:
            getDaysLeft(
              tender.deadline
            )
        })
      )
      .filter(
        tender =>
          tender.days >= 0
      )
      .sort(
        (a, b) =>
          a.days -
          b.days
      )
      .slice(
        0,
        5
      );


  const container =
    document.getElementById(
      "deadlineList"
    );


  container.innerHTML =
    deadlines
      .map(
        tender => `

        <div class="mini-tender">

          <div>

            <h4>
              ${tender.title}
            </h4>

            <p>
              ${tender.deadline}
            </p>

          </div>

          <span class="deadline-tag">
            ${
              tender.days === 0
                ? "Өнөөдөр"
                : tender.days +
                  " хоног"
            }
          </span>

        </div>

      `
      )
      .join("");

}


// ========================================
// MODAL
// ========================================

function openTender(id) {

  const tender =
    tenders.find(
      item =>
        item.id === id
    );


  if (!tender) return;


  const content =
    document.getElementById(
      "modalContent"
    );


  content.innerHTML = `

    <span class="category-badge">
      ${tender.categoryName}
    </span>


    <h2 class="modal-title">
      ${tender.title}
    </h2>


    <p class="modal-org">
      🏢 ${tender.organization}
    </p>


    <div class="modal-info-grid">

      <div class="modal-info-box">

        <span>
          Төсөв
        </span>

        <strong>
          ${formatMoney(tender.budget)}
        </strong>

      </div>


      <div class="modal-info-box">

        <span>
          Эцсийн хугацаа
        </span>

        <strong>
          ${tender.deadline}
        </strong>

      </div>


      <div class="modal-info-box">

        <span>
          AI Match
        </span>

        <strong>
          ${tender.match}%
        </strong>

      </div>

    </div>


    <div class="ai-summary">

      <h3>
        🤖 AI Summary
      </h3>

      <p>
        ${tender.description}
        AI шинжилгээгээр энэ тендер танай компанитай
        ${tender.match}% тохирч байна.
        Материал бэлтгэхдээ доорх шаардлагуудыг
        нэн түрүүнд шалгах шаардлагатай.
      </p>

    </div>


    <div class="requirements">

      <h3>
        📋 Гол шаардлагууд
      </h3>

      ${tender.requirements
        .map(
          requirement => `

            <div class="requirement-row">
              ✅
              ${requirement}
            </div>

          `
        )
        .join("")}

    </div>


    <div class="ai-summary">

      <h3>
        ⚠️ AI анхааруулга
      </h3>

      <p>
        Дуусах хугацаа хүртэл
        ${Math.max(
          getDaysLeft(
            tender.deadline
          ),
          0
        )}
        хоног үлдсэн байна.
        Баримт бичгээ хугацаанаас өмнө бэлтгэхийг зөвлөж байна.
      </p>

    </div>

  `;


  document
    .getElementById(
      "tenderModal"
    )
    .classList.add(
      "show"
    );

}


function closeModal() {

  document
    .getElementById(
      "tenderModal"
    )
    .classList.remove(
      "show"
    );

}


document
  .getElementById(
    "tenderModal"
  )
  .addEventListener(
    "click",
    event => {

      if (
        event.target.id ===
        "tenderModal"
      ) {

        closeModal();

      }

    }
  );


// ========================================
// CONTRACT FILES
// ========================================

const oldContract =
  document.getElementById(
    "oldContract"
  );

const newContract =
  document.getElementById(
    "newContract"
  );


oldContract.addEventListener(
  "change",
  () => {

    if (
      oldContract.files[0]
    ) {

      document.getElementById(
        "oldFileName"
      ).textContent =
        oldContract.files[0]
          .name;

    }

  }
);


newContract.addEventListener(
  "change",
  () => {

    if (
      newContract.files[0]
    ) {

      document.getElementById(
        "newFileName"
      ).textContent =
        newContract.files[0]
          .name;

    }

  }
);


document
  .getElementById(
    "compareBtn"
  )
  .addEventListener(
    "click",
    () => {

      if (
        !oldContract.files[0] ||
        !newContract.files[0]
      ) {

        showToast(
          "Хоёр гэрээгээ хоёуланг нь сонгоно уу."
        );

        return;

      }


      const button =
        document.getElementById(
          "compareBtn"
        );


      button.textContent =
        "🤖 AI шинжилж байна...";


      setTimeout(
        () => {

          document
            .getElementById(
              "comparisonResult"
            )
            .classList.remove(
              "hidden"
            );


          button.textContent =
            "✅ Харьцуулалт дууслаа";


          showToast(
            "Гэрээний өөрчлөлтүүд илэрлээ."
          );

        },
        1200
      );

    }
  );


// ========================================
// PERSONAL PROFILE
// ========================================

const accountUser = JSON.parse(localStorage.getItem("tenderAIUser")) || {};
const storedProfile = JSON.parse(localStorage.getItem("tenderAIProfile")) || {};
const profileNameInput = document.getElementById("profileName");

profileNameInput.value = storedProfile.name ||
  (accountUser.email ? accountUser.email.split("@")[0] : "TenderAI User");
document.getElementById("profileEmail").value = accountUser.email || "";
document.getElementById("profileEmail").placeholder = "Бүртгэлтэй и-мэйл алга";

function updateProfileDisplay() {
  const name = profileNameInput.value.trim() || "TenderAI User";
  const company = JSON.parse(localStorage.getItem("companyProfile"));
  const companyName = (company && company.name) || accountUser.company || "Your account";
  const initials = name.split(/\s+/).slice(0, 2)
    .map(part => Array.from(part)[0]).join("").toUpperCase();

  document.getElementById("topbarProfileName").textContent = name;
  document.getElementById("profileDisplayName").textContent = name;
  document.getElementById("topbarProfileCompany").textContent = companyName;
  document.getElementById("profileCompanyName").textContent = companyName;
  document.getElementById("topbarAvatar").textContent = initials;
  document.getElementById("profileAvatar").textContent = initials;
}

document.getElementById("profileForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = profileNameInput.value.trim();
  if (!name) {
    profileNameInput.setCustomValidity("Нэрээ оруулна уу.");
    profileNameInput.reportValidity();
    return;
  }
  profileNameInput.value = name;
  localStorage.setItem("tenderAIProfile", JSON.stringify({ name }));
  updateProfileDisplay();
  document.getElementById("profileSaveMessage").textContent =
    "✅ Хэрэглэгчийн мэдээлэл амжилттай хадгалагдлаа.";
  showToast("Хэрэглэгчийн мэдээлэл хадгалагдлаа.");
});

profileNameInput.addEventListener("input", () => {
  profileNameInput.setCustomValidity("");
  document.getElementById("profileSaveMessage").textContent = "";
});

updateProfileDisplay();

// ========================================
// COMPANY
// ========================================

const savedCompany =
  JSON.parse(
    localStorage.getItem(
      "companyProfile"
    )
  );


if (savedCompany) {

  document.getElementById(
    "companyName"
  ).value =
    savedCompany.name || "";


  document.getElementById(
    "companyCategory"
  ).value =
    savedCompany.category ||
    "Construction";


  document.getElementById(
    "companyExperience"
  ).value =
    savedCompany.experience ||
    "";


  document.getElementById(
    "companyEmployees"
  ).value =
    savedCompany.employees ||
    "";


  document.getElementById(
    "companyDescription"
  ).value =
    savedCompany.description ||
    "";


  document.getElementById(
    "companyLicense"
  ).value =
    savedCompany.license ||
    "";

}


document
  .getElementById(
    "companyForm"
  )
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const company = {

        name:
          document.getElementById(
            "companyName"
          ).value,

        category:
          document.getElementById(
            "companyCategory"
          ).value,

        experience:
          document.getElementById(
            "companyExperience"
          ).value,

        employees:
          document.getElementById(
            "companyEmployees"
          ).value,

        description:
          document.getElementById(
            "companyDescription"
          ).value,

        license:
          document.getElementById(
            "companyLicense"
          ).value

      };


      localStorage.setItem(
        "companyProfile",
        JSON.stringify(
          company
        )
      );


      updateProfileDisplay();

      document.getElementById(
        "saveMessage"
      ).textContent =
        "✅ Компанийн мэдээлэл амжилттай хадгалагдлаа.";


      showToast(
        "Компанийн мэдээлэл хадгалагдлаа."
      );

    }
  );


// ========================================
// DARK MODE
// ========================================

const themeBtn =
  document.getElementById(
    "themeBtn"
  );


const savedTheme =
  localStorage.getItem(
    "theme"
  );


if (
  savedTheme === "dark"
) {

  document.body.classList.add(
    "dark"
  );

  themeBtn.textContent =
    "☀️ Light mode";

}


themeBtn.addEventListener(
  "click",
  () => {

    document.body.classList.toggle(
      "dark"
    );


    const dark =
      document.body
        .classList
        .contains(
          "dark"
        );


    localStorage.setItem(
      "theme",
      dark
        ? "dark"
        : "light"
    );


    themeBtn.textContent =
      dark
        ? "☀️ Light mode"
        : "🌙 Dark mode";

  }
);


// ========================================
// TOAST
// ========================================

function showToast(message) {

  const toast =
    document.getElementById(
      "toast"
    );


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  setTimeout(
    () => {

      toast.classList.remove(
        "show"
      );

    },
    2200
  );

}
function logout() {
    localStorage.removeItem("tenderAILoggedIn");
    window.location.href = "login.html";
}


// ========================================
// INITIAL LOAD
// ========================================

renderTenders();

renderAiMatches();

renderSavedTenders();

renderRecommended();

renderDeadlines();

updateStats();