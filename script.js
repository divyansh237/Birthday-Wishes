let xAngle = 0;
let yAngle = 0;

const countdownSection = document.getElementById('countdownSection');
const revealSection = document.getElementById('revealSection');
const cardSection = document.getElementById('cardSection');

// Set your birthday target date here
const targetDate = new Date("2025-06-02, 13:50:00").getTime();

const updateCountdown = setInterval(() => {
  const now = new Date().getTime();
  const diff = targetDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

  if (diff < 0) {
    clearInterval(updateCountdown);
    countdownSection.classList.add("hidden");
    revealSection.classList.remove("hidden");
  }
}, 1000);

function showCube() {
  document.getElementById('scene').style.display = 'block';
  document.getElementById('bgMusic').play();
  revealSection.classList.add("hidden");
  cardSection.classList.remove("hidden");
}

// Mouse drag control
let isDragging = false;
let lastX, lastY;

const cube = document.getElementById("cube");

document.addEventListener("mousedown", function (e) {
  isDragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
});

document.addEventListener("mouseup", function () {
  isDragging = false;
});

document.addEventListener("mousemove", function (e) {
  if (isDragging) {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    yAngle += dx * 0.5;
    xAngle -= dy * 0.5;
    updateCubeRotation();
    lastX = e.clientX;
    lastY = e.clientY;
  }
});

// Touch support for mobile
document.addEventListener("touchstart", function (e) {
  isDragging = true;
  lastX = e.touches[0].clientX;
  lastY = e.touches[0].clientY;
});

document.addEventListener("touchend", function () {
  isDragging = false;
});

document.addEventListener("touchmove", function (e) {
  if (isDragging) {
    const dx = e.touches[0].clientX - lastX;
    const dy = e.touches[0].clientY - lastY;
    yAngle += dx * 0.5;
    xAngle -= dy * 0.5;
    updateCubeRotation();
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
  }
});

// Arrow keys
document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowUp": xAngle -= 15; break;
    case "ArrowDown": xAngle += 15; break;
    case "ArrowLeft": yAngle -= 15; break;
    case "ArrowRight": yAngle += 15; break;
  }
  updateCubeRotation();
});

function updateCubeRotation() {
  cube.style.transform = `rotateX(${xAngle}deg) rotateY(${yAngle}deg)`;
}
