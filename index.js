const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
const frames = {
  currentIndex: 0,
  maxIndex: 1345,
};
let imageLoaded = 0;
const images = [];

function preloadImages() {
  for (var i = 1; i <= frames.maxIndex; i++) {
    const imageUrl = `./images/frame_${i.toString().padStart(4, "0")}.png`;
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      imageLoaded++;
      if (imageLoaded === frames.maxIndex) {
        loadImage(frames.currentIndex);
        startAnimation();
      }
    };
    images.push(img);
  }
}
function loadImage(index) {
  if (index >= 0 && index <= frames.maxIndex) {
    const img = images[index];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;
    const scale = Math.max(scaleX, scaleY);
    const newWidth = img.width * scale;
    const newHeight = img.height * scale;
    const offsetX = (canvas.width - newWidth) / 2;
    const offsetY = (canvas.height - newHeight) / 2;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
    frames.currentIndex - index;
  }
}
function startAnimation() {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".parent",
      start: "top top",
      end: "bottom bottom",
      scrub: 2,
    },
  });
  function updateFrame(index) {
    return {
      currentIndex: index,
      ease: "linear",
      onUpdate: function () {
        loadImage(Math.floor(frames.currentIndex));
      },
    };
  }

  tl.to(frames, updateFrame(100), "a")
    .to(".animate1", { opacity: 0, ease: "linear" }, "a")

    .to(frames, updateFrame(200), "b")
    .to(".animate2", { opacity: 1, ease: "linear" }, "b")

    .to(frames, updateFrame(300), "c")
    .to(".animate2", { opacity: 1, ease: "linear" }, "c")

    .to(frames, updateFrame(350), "d")
    .to(".animate2", { opacity: 0, ease: "linear" }, "d")

    .to(frames, updateFrame(500), "e")
    .to(".animate3", { opacity: 1, ease: "linear" }, "e")

    .to(frames, updateFrame(600), "f")
    .to(".animate3", { opacity: 0, ease: "linear" }, "f")

    .to(frames, updateFrame(750), "g")
    .to(".panel", { x: "0%", ease: "expo" }, "g")

    .to(frames, updateFrame(800), "h")
    .to(".panel", { x: "0%", ease: "expo" }, "h")

    .to(frames, updateFrame(900), "i")
    .to(".panel", { opacity: 0, ease: "expo" }, "i")

    .to(frames, updateFrame(1000), "j")
    .to("canvas", { scale: 0.5, ease: "expo" }, "j")

    .to(frames, updateFrame(1100), "k")
    .to(".panelism", { opacity: 1, ease: "expo" }, "k")

    .to(frames, updateFrame(1130), "k")
    .to(".panelism span ", { width: 200, ease: "expo" }, "k")

    .to(frames, updateFrame(1200), "l")
    .to("canvas", { scale: 1, ease: "expo" }, "l")

    .to(frames, updateFrame(1250), "m")
    .to(".panelism", { scale: 2, ease: "circ" }, "m")

    .to(frames, updateFrame(1345), "n")
    .to(".panelism", { scale: 2, ease: "circ" }, "n");
}


const lenis = new Lenis()



function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)



window.addEventListener("resize", function () {
  loadImage(Math.floor(frames.currentIndex));
});
document.querySelectorAll(".headings h3")
.forEach(function(elem){
    gsap.from(elem,{
        scrollTrigger:{
            trigger:elem,
            start:"top 90%",
            end:"botttom 20%",
            scrub:2,

        },
        opacity:0.3
    })
})

preloadImages();
