const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const flash = document.getElementById("flash");
const flashImg = document.getElementById("flash-img");
const replacement = document.getElementById("replacement");
const getGoodAudio = document.getElementById("getGoodAudio");
const skillIssueAudio = document.getElementById("skillIssueAudio");

const memes = ["assets/meme1.png", "assets/meme2.png", "assets/meme3.png", "assets/meme4.png", "assets/meme5.png", "assets/meme6.png", "assets/meme7.png", "assets/meme8.png", "assets/meme9.png"];
let flashActive = false; // prevents overlapping animations

yesBtn.addEventListener("click", () => {
  if (flashActive) return; // skip if already flashing
  flashActive = true;

  const randomMeme = memes[Math.floor(Math.random() * memes.length)];
  flashImg.src = randomMeme;

  flash.classList.remove("hidden");
  flash.style.opacity = "1";

  // Restart the animation cleanly
  flashImg.style.animation = "none";
  void flashImg.offsetWidth; // force reflow to reset animation
  flashImg.style.animation = "flashAnim 1.2s ease forwards";

  getGoodAudio.currentTime = 0;
  getGoodAudio.play();

  // Clean up after animation ends
  flashImg.addEventListener("animationend", () => {
    flash.style.opacity = "0";
    setTimeout(() => {
      flash.classList.add("hidden");
      flashActive = false;
    }, 400);
  }, { once: true });
});

noBtn.addEventListener("click", () => {
  document.querySelector(".container").style.opacity = "0";
  setTimeout(() => {
    document.querySelector(".container").style.display = "none";
    replacement.classList.remove("hidden");
    replacement.style.animation = "fadeInSlow 3s ease forwards";
    skillIssueAudio.play();
  }, 1000);
});

