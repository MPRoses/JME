import './App.css';
import $ from 'jquery';

function App() {


  // format: out-top, in-top, out-bottom, in-bottom, bg color
  let colorthemes = [
    ["#FC8E00", "#798A9A", "#E6BD69", "#254562", "#F60000"],
    ["#D9B800", "#ADB9C1", "#D6CC98", "#00709E", "#D90000"],
    ["#267AD9", "#86786B", "#335497", "#C5A993", "#26D9D9"],
    ["#FFD19C", "#C9DDEF", "#FFD681", "#BCE1FF", "#FFC9C9"],
    ["#9D9D9D", "#868686", "#C1C1C1", "#3C3C3C", "#4C4C4C"]
  ];

  let currentThemeCounter = 0;

  async function updateBackground() {
    if (currentThemeCounter === 5) {
      currentThemeCounter = 0;
    }

    let currentTheme = colorthemes[currentThemeCounter];

    $(".out-top").css("fill", `${currentTheme[0]}`);
    $(".in-top").css("fill", `${currentTheme[1]}`);
    $(".out-bottom").css("fill", `${currentTheme[2]}`);
    $(".in-bottom").css("fill", `${currentTheme[3]}`);
    $(".background, body").css("background-color", `${currentTheme[4]}`);

    currentThemeCounter = currentThemeCounter + 1;
  }

  setInterval(updateBackground, 15000);

  // load in website :: preloader

  function enterBackground() {
    $(".svgTop, .svgBottom").css({
      left: 0,
      top: 0
    });

    $("#tape-container").css("animation", "dropIn 1.5s forwards ease 1s");

    setTimeout(() => {
      $(".item-text, .item-dot").css("filter", "blur(0px)");
    }, 2000);

    currentThemeCounter = Math.floor(Math.random() * 4);
    updateBackground();
    setTimeout(() => {
      $(".out-top, .in-top, .out-bottom, .in-bottom").css(
        "transition",
        "fill 15s cubic-bezier(.83,-0.01,.36,1.02)"
      );
      $(".background, body").css(
        "transition",
        "background-color 15s cubic-bezier(.83,-0.01,.36,1.02), transform 1s cubic-bezier(0.16, 0.69, 0.26, 0.88)"
      );
    }, 2000);
  }
  $(document).ready(function () {
    enterBackground();

    // following lines makes it such that the color square can be changed using the color bar
    var colorSpotTemp = "#E38157";

    $(".colorwheel-segment").on("mouseenter", (e) => {
      $(e.target).css({
        height: "25px",
        top: "-6.25px"
      });

      $(".tape-colorspot").css(
        "background-color",
        `${$(e.target).css("background-color")}`
      );
    });
    $(".colorwheel-segment").on("mouseleave", (e) => {
      $(e.target).css({
        height: "12.5px",
        top: "0px"
      });

      $(".tape-colorspot").css("background-color", `${colorSpotTemp}`);
    });

    $(".colorwheel-segment").on("click", (e) => {
      colorSpotTemp = $(e.target).css("background-color");

      $(".tape-colorspot").css("background-color", `${colorSpotTemp}`);
    });

    // following lines changes orientation on mouse position change for background and tape

    let constrain = 50;
    let mouseOverContainer = document.querySelector(".background");
    let ex1Layer = document.getElementById("tape-movement");
    let ex2Layer = document.querySelector(".background");
    let isEnabled = true;

    function transforms(x, y, el) {
      let box = el.getBoundingClientRect();
      let calcX = -(y - box.y - box.height / 2) / constrain;
      let calcY = (x - box.x - box.width / 2) / constrain;
      return `rotateX(${calcX}deg) rotateY(${calcY}deg)`;
    }

    function transformElement(el, xyEl) {
      el.style.transform = transforms.apply(null, xyEl);
    }
    mouseOverContainer.onmousemove = function (e) {
      if (isEnabled) {
        let xy = [e.clientX, e.clientY];
        let position = xy.concat([ex1Layer]);

        window.requestAnimationFrame(function () {
          transformElement(ex1Layer, position);
          transformElement(ex2Layer, position);
        });
      }

    };

    $("#tape-movement").on("mouseenter", () => {
      $("#tape-movement").css(
        "transition",
        " transform 3s cubic-bezier(0.16, 0.69, 0.26, 0.88)"
      );
      $(".background, body").css(
        "transition",
        "background-color 15s cubic-bezier(.83,-0.01,.36,1.02), transform 3s cubic-bezier(0.16, 0.69, 0.26, 0.88)"
      );
      $("#tape-movement, .background").css("transform", "rotate(0deg)");
    });

    $("#tape-movement").on("mouseleave", () => {
      $("#tape-movement").css(
        "transition",
        " transform 1s cubic-bezier(0.16, 0.69, 0.26, 0.88)"
      );
      $(".background, body").css(
        "transition",
        "background-color 15s cubic-bezier(.83,-0.01,.36,1.02), transform 1s cubic-bezier(0.16, 0.69, 0.26, 0.88)"
      );
    });
    // onclick navbar

    $(".navbar-item").on("click", (e) => {
      $(".bars-b1").addClass("b1-active");
      setTimeout(() => {
        $("#tape-movement, .navbar").css("display", "none");
        isEnabled = false;
        $("#tape-movement, .background").css("transform", "rotate(0deg)");
        $(".sec2").css("display", "block");
      }, 800)
      setTimeout(() => {
        for (let k = 0; k < 3; k++) {
          setTimeout(() => {
            $(".b1-active").eq(k).css("top", "-100vw");
          }, k * 150)
        }
      }, 1250)
    })
  });


  return (
    <div className="App">
      <div className="background">
        <svg className="svgTop" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100">
          <path fill="#FC8E00" className="out-top" d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z" />
          <path fill="#798A9A" className="in-top" d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z" />
        </svg>
        <svg className="svgBottom" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 100">
          <path fill="#E6BD69" className="out-bottom" d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z" />
          <path fill="#254562" className="in-bottom" d="M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z" />
        </svg>
      </div>
      <div id="tape-movement">
        <div id="tape-container">
          <svg className="tape" width="758" height="394" viewBox="0 0 758 394" fill="none" xmlns="http://www.w3.org/2000/svg">

            <rect width="696" height="354" transform="matrix(1 0 0 -1 5 388)" fill="#F2F2F2" />
            <rect x="2.5" y="31.5" width="701" height="359" stroke="black" strokeWidth="5" />

            <rect x="5" y="157" width="696" height="3" fill="black" />
            <rect x="5" y="236" width="696" height="3" fill="black" />
            <rect x="5" y="315" width="696" height="3" fill="black" />
            <rect x="281" y="160" width="3" height="76" fill="black" />
            <rect x="514" y="239" width="3" height="76" fill="black" />
            <rect x="364" y="315" width="3" height="76" fill="black" />
            <rect x="534" y="315" width="3" height="76" fill="black" />

            <path d="M51 5H750L703.5 29H10L51 5Z" fill="#F2F2F2" />
            <path d="M752 360.756V7L706 33.5V387.5L752 360.756Z" fill="#F2F2F2" />


            <rect x="0.192627" y="29.3336" width="58.6673" height="4.61474" transform="rotate(-30 0.192627 29.3336)" fill="black" />
            <rect x="702" y="30" width="60" height="5" transform="rotate(-30 702 30)" fill="black" />
            <rect x="703.515" y="388.703" width="59.4053" height="5" transform="rotate(-30 703.515 388.703)" fill="black" />
            <rect x="51" width="706" height="5" fill="black" />
            <rect x="752" y="363" width="363" height="5" transform="rotate(-90 752 363)" fill="black" />
          </svg>
          <p className="tape-title">FEATURING</p>
          <p className="tape-name">JENS VAN
            <br />&nbsp;&nbsp;&nbsp;&nbsp;DER SLOOT
          </p>
          <p className="tape-whoisthat">Who's that?</p>
          <p className="tape-description">DESIGNER AND DEVELOPER BASED IN LISSE, NETHERLANDS</p>
          <p className="tape-age">17.09.05 - STILL ALIVE</p>
          <div className="tape-colorwheel">
            <div className="colorwheel-segment" style={{ "backgroundColor": "#360000" }}></div>
            <div className="colorwheel-segment" style={{ "backgroundColor": "#6B1111" }}></div>
            <div className="colorwheel-segment" style={{ "backgroundColor": "#96411C" }}></div>
            <div className="colorwheel-segment" style={{ "backgroundColor": "#C0633B" }}></div>
            <div className="colorwheel-segment" style={{ "backgroundColor": "#E38157" }}></div>
            <div className="colorwheel-segment" style={{ "backgroundColor": "#E3A357" }}></div>
            <div className="colorwheel-segment" style={{ "backgroundColor": "#F0BE74" }}></div>
            <div className="colorwheel-segment" style={{ "backgroundColor": "#8DC3DA" }}></div>
            <div className="colorwheel-segment" style={{ "backgroundColor": "#94ABB5" }}></div>
            <div className="colorwheel-segment" style={{ "backgroundColor": "#293C44" }}></div>

          </div>
          <div className="tape-colorspot"></div>
          <div className="tape-hashtag">
            <p className="hashtag-text glitch" data-text="#MAKINGDREAMSCOMETRUE">#MAKINGDREAMSCOMETRUE</p>
          </div>
          <img className="tape-img-globe clickable" src="https://mproses.github.io/hosted-assets/image%201.png" />
          <img className="tape-img-linkedin clickable" src="https://mproses.github.io/hosted-assets/image%202.png" />
        </div>
      </div>
      <div className="navbar">
        <div className="navbar-item clickable2">
          <img src="https://mproses.github.io/hosted-assets/Ellipse%201.png" className="item-dot" />
          <p className="item-text">SKILLS</p>
        </div>
        <div className="navbar-item item-projects clickable2">
          <img src="https://mproses.github.io/hosted-assets/Ellipse%201.png" className="item-dot dot-projects" />
          <p className="item-text text-projects">PROJECTS</p>
        </div>
        <div className="navbar-item item-aboutme clickable2">
          <img src="https://mproses.github.io/hosted-assets/Ellipse%201.png" className="item-dot dot-aboutme" />
          <p className="item-text text-aboutme">ABOUT&nbsp;ME</p>
        </div>

      </div>


      <div className="black-bars">
        <div className="bars-b1"></div>
        <div className="bars-b1 b1-left"></div>
        <div className="bars-b1"></div>
      </div>


      <div className="sec2"></div>




    </div>


  );
}

export default App;
