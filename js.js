// ==================== الكود الحالي ====================
// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
  });
});

// Scroll progress indicator
window.addEventListener("scroll", () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.querySelector(".scroll-progress").style.width = scrolled + "%";
});

// Animation on scroll
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

// Observe elements for animation
document.querySelectorAll(".skill, .work-item").forEach((el) => {
  observer.observe(el);
});

// Smooth scroll for anchor links
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

// ==================== Skills Wheel (النسخة المعدلة) ====================
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
        "Building interactive web applications with ES6+ features, DOM manipulation, and modern JavaScript patterns. Experience with APIs and event handling.",
      tags: ["ES6+", "DOM", "APIs", "Async/Await", "OOP"],
    },
    React: {
      percent: 60,
      description:
        "Developing dynamic user interfaces using React.js. Working with components, hooks, and state management. Currently expanding knowledge in React ecosystem.",
      tags: ["Components", "Hooks", "JSX", "State", "Props"],
    },
    SQL: {
      percent: 75,
      description:
        "Database design, querying, and management using SQL. Experience with complex queries, joins, and database optimization techniques.",
      tags: ["MySQL", "Queries", "Joins", "Indexing", "Normalization"],
    },
    "C++": {
      percent: 65,
      description:
        "Fundamental programming concepts, algorithms, and data structures in C++. Problem-solving and logical thinking for software development.",
      tags: ["OOP", "Algorithms", "Data Structures", "STL", "Pointers"],
    },
    "Graphic Design": {
      percent: 90,
      description:
        "Professional design skills using Photoshop, Illustrator, and other creative tools. Strong sense of aesthetics and visual communication.",
      tags: ["Photoshop", "Illustrator", "Typography", "Branding", "UI Design"],
    },
    "Responsive Design": {
      percent: 88,
      description:
        "Creating websites that work perfectly on all devices and screen sizes. Mobile-first approach and cross-browser compatibility.",
      tags: [
        "Mobile-First",
        "Media Queries",
        "Flexible Grids",
        "Cross-Browser",
      ],
    },
    "UI/UX": {
      percent: 78,
      description:
        "Designing intuitive user interfaces and seamless user experiences. Wireframing, prototyping, and user testing methodologies.",
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
    "current-skill-percentage"
  );
  const detailSkillName = document.getElementById("detail-skill-name");
  const detailSkillPercent = document.getElementById("detail-skill-percent"); // تم التصحيح هنا
  const progressFill = document.getElementById("progress-fill");
  const detailDescription = document.getElementById("detail-skill-description");
  const skillTags = document.querySelector(".skill-tags");

  function updateSkillDetails(skillName) {
    const skill = skills[skillName];

    if (!skill) {
      console.error(`Skill "${skillName}" not found in skills object`);
      return;
    }

    // Update center of wheel
    currentSkillName.textContent = skillName;
    currentSkillPercent.textContent = `${skill.percent}%`;

    // Update details panel
    detailSkillName.textContent = skillName;
    detailSkillPercent.textContent = `${skill.percent}%`;
    detailDescription.textContent = skill.description;

    // Animate progress bar
    progressFill.style.width = `${skill.percent}%`;

    // Update tags
    skillTags.innerHTML = skill.tags
      .map((tag) => `<span>${tag}</span>`)
      .join("");

    // Add pulse animation
    progressFill.parentElement.classList.add("pulse");
    setTimeout(() => {
      progressFill.parentElement.classList.remove("pulse");
    }, 600);
  }

  // Add click events to each skill dot
  wheelSkills.forEach((skill) => {
    skill.addEventListener("click", function () {
      const skillName = this.getAttribute("data-skill");
      updateSkillDetails(skillName);

      // Add active class
      wheelSkills.forEach((s) => s.classList.remove("active"));
      this.classList.add("active");

      // Highlight the selected skill dot
      this.classList.add("selected");
      setTimeout(() => {
        this.classList.remove("selected");
      }, 300);
    });

    // Also work on hover for desktop
    skill.addEventListener("mouseenter", function () {
      const skillName = this.getAttribute("data-skill");
      if (skills[skillName]) {
        currentSkillName.textContent = skillName;
        currentSkillPercent.textContent = `${skills[skillName].percent}%`;
      }
    });

    skill.addEventListener("mouseleave", function () {
      const activeSkill = document.querySelector(".wheel-skill.active");
      if (activeSkill && skills[activeSkill.getAttribute("data-skill")]) {
        const skillName = activeSkill.getAttribute("data-skill");
        currentSkillName.textContent = skillName;
        currentSkillPercent.textContent = `${skills[skillName].percent}%`;
      }
    });
  });

  // Initialize with first skill
  if (skills["HTML/CSS"]) {
    updateSkillDetails("HTML/CSS");
    if (wheelSkills[0]) wheelSkills[0].classList.add("active");
  }
}

// ==================== تهيئة كل شيء عند تحميل الصفحة ====================
document.addEventListener("DOMContentLoaded", function () {
  // Initialize skills wheel
  if (document.getElementById("skills-wheel")) {
    initSkillsWheel();
  }

  // Add CSS for animations
  const style = document.createElement("style");
  style.textContent = `
    .wheel-skill.selected .skill-dot {
      animation: bounce 0.3s ease;
      box-shadow: 0 0 0 5px rgba(108, 99, 255, 0.2);
    }
    
    @keyframes bounce {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.3); }
    }
    
    .pulse { 
      animation: pulse 0.6s ease; 
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.02); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
});
