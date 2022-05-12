document.getElementById("home").onclick = () => {
  window.scrollTo(0, 0);
};

// Tema Start
const toggleButton = document.getElementById("tema");
const body = document.body;
toggleButton.onclick = () => {
  console.log(body.classList);
  body.classList.toggle("gelap");
  body.classList.toggle("terang");
};
// Tema End

// Typewriter start
class TypeWriter {
  constructor(txtElement, words, wait) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const curIdx = this.wordIndex;
    const word = this.words[curIdx];

    if (this.isDeleting) {
      this.txt = word.substring(0, this.txt.length - 1);
    } else {
      this.txt = word.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class='txt'>${this.txt}</span>`;
    // type speed
    let typeSpeed = 100;
    if (this.isDeleting) {
      typeSpeed /= 4;
    }

    if (!this.isDeleting && this.txt === word) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex = (this.wordIndex + 1) % this.words.length;
      typeSpeed = 250;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init when DOM load
document.addEventListener("DOMContentLoaded", () => {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");

  new TypeWriter(txtElement, words, wait);
});
// Typewriter end