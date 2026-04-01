// ==================== Mobile Menu ====================
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
  });
});

// ==================== Scroll Progress ====================
window.addEventListener("scroll", () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;

  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrolled = (winScroll / height) * 100;

  document.querySelector(".scroll-progress").style.width = scrolled + "%";
});

// ==================== Scroll Animation ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

document.querySelectorAll(".skill, .work-item").forEach((el) => {
  observer.observe(el);
});

// ==================== Smooth Scroll ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// ==================== Skills Wheel ====================
function initSkillsWheel() {
  const skills = {
    "HTML/CSS": {
      percent: 85,
      description:
        "Advanced expertise in creating responsive, accessible web interfaces with modern CSS techniques including Flexbox, Grid, and animations.",
      tags: ["Flexbox", "Grid", "Animations", "Accessibility", "SASS"],
    },

    JavaScript: {
      percent: 70,
      description:
        "Building interactive web applications using ES6+, DOM manipulation and APIs.",
      tags: ["ES6+", "DOM", "APIs", "Async/Await", "OOP"],
    },

    React: {
      percent: 60,
      description: "Building modern UI using React components and hooks.",
      tags: ["Components", "Hooks", "JSX", "State", "Props"],
    },

    SQL: {
      percent: 75,
      description: "Database management and advanced querying with SQL.",
      tags: ["MySQL", "Queries", "Joins", "Indexing", "Normalization"],
    },

    "C++": {
      percent: 65,
      description:
        "Strong programming fundamentals with algorithms and data structures.",
      tags: ["OOP", "Algorithms", "Data Structures", "STL", "Pointers"],
    },

    "Graphic Design": {
      percent: 90,
      description: "Professional design using Photoshop and Illustrator.",
      tags: ["Photoshop", "Illustrator", "Typography", "Branding", "UI Design"],
    },

    "Responsive Design": {
      percent: 88,
      description: "Building websites that work across all devices.",
      tags: [
        "Mobile-First",
        "Media Queries",
        "Flexible Grids",
        "Cross-Browser",
      ],
    },

    "UI/UX": {
      percent: 78,
      description: "Designing user-friendly and intuitive interfaces.",
      tags: [
        "Wireframing",
        "Prototyping",
        "User Research",
        "Figma",
        "Adobe XD",
      ],
    },
  };

  const wheelSkills = document.querySelectorAll(".wheel-skill");

  const currentSkillName = document.getElementById("current-skill-name");
  const currentSkillPercent = document.getElementById(
    "current-skill-percentage",
  );

  const detailSkillName = document.getElementById("detail-skill-name");
  const detailSkillPercent = document.getElementById("detail-skill-percent");

  const progressFill = document.getElementById("progress-fill");
  const detailDescription = document.getElementById("detail-skill-description");

  const skillTags = document.querySelector(".skill-tags");

  function updateSkillDetails(skillName) {
    const skill = skills[skillName];
    if (!skill) return;

    currentSkillName.textContent = skillName;
    currentSkillPercent.textContent = skill.percent + "%";

    detailSkillName.textContent = skillName;
    detailSkillPercent.textContent = skill.percent + "%";

    detailDescription.textContent = skill.description;

    progressFill.style.width = "0%";

    setTimeout(() => {
      progressFill.style.width = skill.percent + "%";
    }, 100);

    skillTags.innerHTML = skill.tags
      .map((tag) => `<span>${tag}</span>`)
      .join("");
  }

  function selectSkill(skillName) {
    updateSkillDetails(skillName);

    wheelSkills.forEach((s) => s.classList.remove("active"));

    const activeDot = document.querySelector(
      `.wheel-skill[data-skill="${skillName}"]`,
    );

    if (activeDot) {
      activeDot.classList.add("active", "selected");

      setTimeout(() => {
        activeDot.classList.remove("selected");
      }, 300);
    }
  }

  wheelSkills.forEach((skill) => {
    skill.setAttribute("tabindex", "0");
    skill.setAttribute("role", "button");

    skill.addEventListener("click", () => {
      const skillName = skill.dataset.skill;

      selectSkill(skillName);
    });

    skill.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();

        skill.click();
      }
    });
  });

  document.querySelectorAll("#skills .skill").forEach((card) => {
    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
      const title = card.querySelector("h3");

      if (!title) return;

      let skillName = title.textContent.trim();

      if (skillName === "HTML & CSS") skillName = "HTML/CSS";

      selectSkill(skillName);
    });
  });

  selectSkill("HTML/CSS");
}

// ==================== Page Load ====================
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("skills-wheel")) {
    initSkillsWheel();
  }

  const style = document.createElement("style");

  style.textContent = `
  
  .wheel-skill.selected .skill-dot{
  animation:bounce .3s ease;
  }

  @keyframes bounce{

  0%,100%{transform:scale(1)}

  50%{transform:scale(1.3)}

  }

  `;

  document.head.appendChild(style);
});
