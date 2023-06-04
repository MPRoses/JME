import './App.css';
import $ from 'jquery';
import skillsWheel from './Shape.png';
import wheelPointer from './Arrow.png';
import proj1 from './proj1.webp';

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
    setTimeout(() => {

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
          "background-color 15s cubic-bezier(.83,-0.01,.36,1.02), transform 1s cubic-bezier(0.16, 0.69, 0.26, 0.88), opacity 1s ease-in-out .25s"
        );
      }, 2000);

    }, 250);

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
        "background-color 15s cubic-bezier(.83,-0.01,.36,1.02), transform 3s cubic-bezier(0.16, 0.69, 0.26, 0.88), opacity 1s ease-in-out .25s"
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
        "background-color 15s cubic-bezier(.83,-0.01,.36,1.02), transform 1s cubic-bezier(0.16, 0.69, 0.26, 0.88), opacity 1s ease-in-out .25s"
      );
    });
    // onclick navbar



    $(".back-to-home").on("click", () => {

      window.scrollTo(0, 0)




      setTimeout(() => {
        $(".back-to-home").css("opacity", "0");
        $("#skillsWheel, #wheelPointer").css("opacity", "0")
        $(".sec2").css("background-color", "#00000000");
        $("#sec2-skills-title, #sec2-skills-description").css("opacity", "0");
        $("#sec2-skills-title, #sec2-skills-description").css("transform", "translate(0,40px)");
      }, 680)



      for (let k = 0; k < 3; k++) {
        setTimeout(() => {
          $(".b1-active").eq(k).css("top", "0vw");
        }, k * 150)
      }
      setTimeout(() => {

        for (let k = 0; k < 3; k++) {
          setTimeout(() => {
            $(".bars-b1").eq(k).css("top", "100vw");
          }, k * 150)
        }

        setTimeout(() => {
          $(".sec2-identifier").css("display", "none");
        }, 100)

        setTimeout(() => {
          $("#tape-movement").css("display", "block");
          $(".navbar").css("display", "block");

          isEnabled = true;
          $("#tape-movement, .background").css("transform", "rotate(0deg)");
          $(".sec2, .back-to-home").css("display", "none");
          setTimeout(() => {
            $(".bars-b1").removeClass("b1-active");
            $(".bars-b1").css("top", "0");
            $(".navbar").css("opacity", "1");
            $("body").css("height", "100vh");
            $("body").css("overflow", "hidden");

          }, 200);



        }, 450);

      }, 800);

    })

    const skillsTitles = ["Welcome!", "Front-end Design", "Back-end Development", "React", "Other Skills", "Github and Scrum", "Other languages", "Javascript Libraries"];
    const skillsDescriptions = ["Hello there! I’m excited to welcome you to my website! My name is Jens and I’m thrilled to share with you who I am, what I specialize in, and what I’ve worked on in the past.<br/><br/>As a computer scientist and designer, I’m passionate about creating innovative solutions that are both functional and beautiful. You’ll find that my work is inspired by my love of technology and design. Without further ado, let’s embark on a new journey together!&nbsp;&nbsp;🚀<br/></br/>Begin scrolling to learn more and let me know if there’s anything I can do for you.", "Front-end design is the process of designing and building the user interface for a website or application. It involves creating HTML, CSS, and presentational JavaScript code that make up a user interface. It also requires coordination with user experience (UX) and graphic design teams to ensure the interface matches the target demographic and the product. Front-end design is a collaborative and human-centered practice that collects user feedback in each phase.<br/><br/>As a web developer with a strong skill set in front-end design, I focus on creativity and originality to make my work stand out. My creativity is not limited to just design, but extends to my ability to solve problems and find innovative solutions. <br/><br/>Overall, my skill in front-end design is a testament to my passion for creativity, originality, and ability to think outside the box. My designs are visually stunning and functional, and I am always looking for new ways to push the boundaries of what is possible. 😎", "Back-end development refers to the development of server-side logic that powers websites and apps from behind the scenes. It includes all the code needed to build out the database, server, and application.<br/><br/>As a web dev, my experience in back-end development lies in that I’ve worked with databases using Node.js and SQL to communicate and securely hash and store account-related data. I understand the importance of security when it comes to user data, which is why I take great care in ensuring that all data is properly encrypted and stored. I also understand the importance of scalability and strive to create back-end systems that can handle large amounts of traffic without slowing down.<br/> <br/> Altogether, while I may not have mastered back-end development yet, I’m excited about the possibilities it offers and am always looking for new ways to improve my skills. 😊", "With multiple years of experience in the field, I have developed a strong skillset in using React. React is a JavaScript library for building user interfaces, developed and maintained by Facebook. It is widely used in the industry and is known for its efficiency and flexibility.<br/><br/>React allows me to build reusable UI components and manage the state of their applications in a declarative way. This means that I can focus on describing what the UI should look like at any given moment, and React takes care of updating the UI when the underlying data changes. One of the key features of React is its virtual DOM (Document Object Model), which allows it to efficiently update the UI by only changing the parts that need to be updated. This results in fast and smooth updates, even for complex applications. <br/><br/> My experience with React has allowed me to develop a deep understanding of its inner workings and best practices, from which I strive to create high-quality, efficient, and user-friendly applications that meet the needs of my clients.", "In addition to my technical expertise, I have a strong foundation in mathematics which allows me to approach complex problems with a logical and analytical mindset.<br/><br/> Language wise my proficiency in English is at a C1 level, meaning I am able to effectively communicate and collaborate with colleagues and clients from all over the world. And as a native Dutch speaker, I am also able to bring my language skills to the table when working with Dutch-speaking clients or team members.<br/><br/> In addition to my existing skills and experiences, I am also committed to continuous learning and development. This September, I will be starting a degree in Computer Science at the University of Leiden.<br/><br/> These additional skills and experiences have helped me to become a well-rounded and versatile developer, capable of tackling a wide range of challenges and delivering high-quality results.", " These two tools have been the foundation of all my recent projects and have played a crucial role in their success. Git is a powerful version control system that allows me to keep track of changes to my code and collaborate with other developers. Scrum, on the other hand, is an agile framework that helps me manage and organize my work in an efficient and effective manner.<br/><br/>One of the reasons why Scrum is so important is because it allows for constant feedback and improvement. By breaking down work into small, manageable chunks called sprints, I am able to regularly review my progress and make any necessary adjustments. This helps me stay on track and ensures that I am always working towards the best possible end result.<br/><br/>Another key benefit of Scrum is its emphasis on collaboration and communication. By working closely with my team and regularly checking in with stakeholders, I am able to ensure that everyone is on the same page and that we are all working towards a common goal. This helps to prevent misunderstandings and ensures that everyone is fully invested in the success of the project.<br/><br/>To conclude, my experience with Git and Scrum has been incredibly valuable. These tools have helped me to work more efficiently, collaborate more effectively, and ultimately deliver better results. I believe that any project can benefit from the use of these tools, and I would highly recommend them to anyone looking to improve their workflow and achieve better outcomes.", " While my primary focus is on web development, I also have some experience with non-web development languages. For example, I have experimented with VBA and C++ in class and have even created tiny games in Java and Python.<br/><br/> Although I don’t have much experience with Python ( in the sense of data-science), I am confident that I will be able to pick it up easily when required. This is because Python is known for its simplicity and ease of use, and its base components are similar to other programming languages that I am already familiar with. On top, I'll be improving in all of these languages ( and more!) in the upcoming years during my University studies.<br/><br/>In short, my diverse skill set and willingness to learn new languages make me a versatile and valuable asset to any team. Whether it’s building complex web applications or experimenting with new technologies, I am always eager to expand my knowledge and take on new challenges.", "JavaScript libraries are collections of pre-written JavaScript code that provide developers with a set of features and functionalities to use in their projects. These libraries can save developers time and effort by providing them with ready-made solutions to common problems. <br/><br/>I have extensive experience working with my top three favorite JavaScript libraries: JQuery, GSAP, and AnimeJS. I use JQuery on every project because it allows for easy code readability and makes it simple to manipulate the DOM. When it comes to complicated motion design, GSAP and AnimeJS are my weapons of choice. GSAP is great for handling easier motions while AnimeJS excels at more complicated animations.<br/><br/>These libraries allow me to create engaging and interactive user experiences on the web. With my knowledge and expertise in these tools, I am able to bring my clients’ visions to life and deliver high-quality results."];
    let currentIndex = 0;
    let previousIndex = 0;

    function updateItems() {
      if ($(window).scrollTop() >= (2.2 * window.innerHeight)) {
        $(".sec2-identifier").removeClass("visible");
        $(".sec2-identifier").eq(2).addClass("visible");

        $("#skillsWheel, #wheelPointer, #sec2-skills-title, #sec2-skills-description").css("opacity", "0")
        $("#sec2-skills-title, #sec2-skills-description").css("transform", "translate(0,40px)");

        $(".project-item").removeClass("item-visible");


      } else if ($(window).scrollTop() > (2 * window.innerHeight)) {
        $(".sec2-identifier").removeClass("visible");
        $(".sec2-identifier").eq(1).addClass("visible");

        $("#skillsWheel, #wheelPointer, #sec2-skills-title, #sec2-skills-description").css("opacity", "0");
        $("#sec2-skills-title, #sec2-skills-description").css("transform", "translate(0,40px)");

        $("#sec2-skills-title, #sec2-skills-description").css("opacity", "0");
        $("#sec2-skills-title, #sec2-skills-description").css("transform", "translate(0, 40px)");

        setTimeout(() => {
          if ($(window).scrollTop() > (2 * window.innerHeight) && $(window).scrollTop() < (2.2 * window.innerHeight)) {
            $(".project-item").addClass("item-visible");
          } else {
            $(".project-item").removeClass("item-visible");

          }
        }, 800);
      } else if ($(window).scrollTop() < 5) {
        $(".sec2-identifier").removeClass("visible");
        $(".sec2-identifier").eq(0).addClass("visible");
        $("#skillsWheel, #wheelPointer").css("opacity", "0")

        $(".project-item").removeClass("item-visible");

      } else {
        $(".project-item").removeClass("item-visible");

        $(".sec2-identifier").removeClass("visible");
        $(".sec2-identifier").eq(0).addClass("visible");
        $("#skillsWheel, #wheelPointer").css("opacity", "1");
        if ($(window).scrollTop() > (1.95 * window.innerHeight) && $(window).scrollTop() < (2 * window.innerHeight)) {
          $("#sec2-skills-title, #sec2-skills-description").css({
            "opacity": "1",
            "transform": "translate(0,0px)"
          });
        }
        // turning of skillsWheel

        $("#skillsWheel").css("transform", `rotate(${90 + ($(window).scrollTop() / (2 * window.innerHeight)) * 360}deg)`)

        // changing text


        for (let k = 0; k < 8; k++) {
          if ((($(window).scrollTop() / (0.25 * window.innerHeight)) - k) >= 0) {
            currentIndex = k;
          }
        }

        if (currentIndex !== previousIndex) {
          $("#sec2-skills-title, #sec2-skills-description").css("opacity", "0")
          setTimeout(() => {
            if (skillsTitles[currentIndex].length >= 20) {
              $("#sec2-skills-title").css({
                "font-size": "5.2vw",
                "top": "15vh"
              });
            } else if (skillsTitles[currentIndex].length > 8) {
              $("#sec2-skills-title").css({
                "font-size": "6.9vw",
                "top": "12vh"
              });
            } else {
              $("#sec2-skills-title").css("font-size", "12vw");
              if (skillsDescriptions[currentIndex].length > 700) {
                $("#sec2-skills-title").css("top", "4vh");
              } else if (skillsDescriptions[currentIndex].length > 700) {
                $("#sec2-skills-title").css("top", "4vh");
              } else {
                $("#sec2-skills-title").css("top", "13vh");
              }

            }
            if (skillsDescriptions[currentIndex].length > 700) {
              if (skillsDescriptions[currentIndex].length > 1400) {
                if (skillsTitles[currentIndex].length > 18) {
                  $("#sec2-skills-description").css({
                    "font-size": "1vw",
                    "line-height": "1.7vw",
                    "top": "28vh",
                  })
                } else {
                  $("#sec2-skills-description").css({
                    "font-size": "1vw",
                    "line-height": "1.7vw",
                    "top": "30vh",
                  })
                }

              } else {
                if (skillsTitles[currentIndex].length > 18) {
                  $("#sec2-skills-description").css({
                    "font-size": "1.1vw",
                    "line-height": "2vw",
                    "top": "30vh",
                  })
                } else {
                  $("#sec2-skills-description").css({
                    "font-size": "1.1vw",
                    "line-height": "2vw",
                    "top": "32vh",
                  })
                }
              }
            } else {
              $("#sec2-skills-description").css({
                "font-size": "1.1vw",
                "line-height": "2vw",
                "top": "42.5vh",
              })

            }
            $("#sec2-skills-title").html(`${skillsTitles[currentIndex]}`);
            $("#sec2-skills-description").html(`${skillsDescriptions[currentIndex]}`);
            if ($(window).scrollTop() < (2 * window.innerHeight)) {
              $("#sec2-skills-title, #sec2-skills-description").css({
                "opacity": "1",
                "transform": "translate(0,0px)"
              })

            } else {
              $("#sec2-skills-title, #sec2-skills-description").css({
                "opacity": "0",
                "transform": "translate(0,40px)"
              })
            }
          }, 650);
        }

        previousIndex = currentIndex;

        if ($(window).scrollTop() === 5) {
          $("#skillsWheel, #wheelPointer").css("opacity", "0")
        }


      }


    }

    $(window).on("scroll", () => {
      updateItems();

    })

    $(".navbar-item").on("click", (e) => {


      // show bars
      $(".bars-b1").addClass("b1-active");
      setTimeout(() => {
        $("#tape-movement").css("display", "none");
        $(".navbar").css("opacity", "0");
        setTimeout(() => {
          $(".navbar").css("display", "none");
        }, 550)
        isEnabled = false;
        $("#tape-movement, .background").css("transform", "rotate(0deg)");
        $(".sec2, .back-to-home, .sec2-identifier").css("display", "block");
      }, 800)
      // exit bars
      setTimeout(() => {
        for (let k = 0; k < 3; k++) {
          setTimeout(() => {
            $(".b1-active").eq(k).css("top", "-100vw");
          }, k * 150)
        }
      }, 1250)

      // code after exit bars
      setTimeout(() => {


        $("body").css("height", "600vh");
        $("body").css("overflow", "unset");
        $("body").css("overflow-x", "hidden");
        $(".sec2").css("background-color", "#000000bf");
        $(".sec2-identifier").removeClass("visible");
        $(".sec2-identifier").eq(0).addClass("visible");
        $("#sec2-skills-title, #sec2-skills-description").css("opacity", "1");
        $("#sec2-skills-title, #sec2-skills-description").css("transform", "translate(0,0px)");

        $(".back-to-home").css("opacity", "1")

        if ($(e.target).attr("tag") === "skills") {
          $('html, body').animate({
            scrollTop: 5
          }, 0);

        } else if ($(e.target).attr("tag") === "projects") {
          $('html, body').animate({
            scrollTop: (2.05 * (window.innerHeight))
          }, 1000);

        } else if ($(e.target).attr("tag") === "aboutMe") {
          $('html, body').animate({
            scrollTop: (2.25 * (window.innerHeight))
          }, 1000);
        }
      }, 1450)
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
          <p className="tape-age">17.09.05</p>
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
          <img className="tape-img-globe clickable" src="https://mproses.github.io/hosted-assets/image%201.png" alt="globe-icon" />
          <img className="tape-img-linkedin clickable" src="https://mproses.github.io/hosted-assets/image%202.png" alt="linkedin-icon" />
        </div>
      </div>
      <div className="navbar">
        <div className="navbar-item clickable2" tag="skills">
          <img src="https://mproses.github.io/hosted-assets/Ellipse%201.png" className="item-dot" alt="dot" />
          <p className="item-text">SKILLS</p>
        </div>
        <div className="navbar-item item-projects clickable2" tag="projects">
          <img src="https://mproses.github.io/hosted-assets/Ellipse%201.png" className="item-dot dot-projects" alt="dot" />
          <p className="item-text text-projects">PROJECTS</p>
        </div>
        <div className="navbar-item item-aboutme clickable2" tag="aboutMe">
          <img src="https://mproses.github.io/hosted-assets/Ellipse%201.png" className="item-dot dot-aboutme" alt="dot" />
          <p className="item-text text-aboutme">ABOUT&nbsp;ME</p>
        </div>

      </div>


      <div className="black-bars">
        <div className="bars-b1"></div>
        <div className="bars-b1 b1-left"></div>
        <div className="bars-b1"></div>
      </div>


      <div className="sec2">
        <p className="sec2-identifier">TAPE 1:<br></br>"SKILLS"</p>
        <p className="sec2-identifier">TAPE 2:<br></br>"PROJECTS"</p>
        <p className="sec2-identifier">TAPE 3:<br></br>"ABOUTME"</p>
        <div className="sec2-item" id="skills">
          <img src={skillsWheel} alt="skillsWheel" id="skillsWheel" />
          <img src={wheelPointer} alt="wheelPointer" id="wheelPointer" />
          <p id="sec2-skills-title">Welcome!</p>
          <p id="sec2-skills-description">Hello there! I’m excited to welcome you to my website! My name is Jens and I’m thrilled to share with you who I am, what I specialize in, and what I’ve worked on in the past.<br></br><br></br>As a computer scientist and designer, I’m passionate about creating innovative solutions that are both functional and beautiful. You’ll find that my work is inspired by my love of technology and design. Without further ado, let’s embark on a new journey together!&nbsp;&nbsp;🚀<br></br><br></br>Begin scrolling to learn more and let me know if there’s anything I can do for you.</p>
        </div>
        <div className="sec2-item" id="projects">
          <div id="project-items-container">
            <div className="project-item">
              <img src={proj1} alt="showcase" className="project-item-img" />
              <div className="project-item-title-container">
                <p className="project-item-title">THIS WEBSITE</p>
              </div>
            </div>
            <div className="project-item project-item-bottom"></div>
            <div className="project-item"></div>
            <div className="project-item project-item-bottom"></div>
            <div className="project-item"></div>
            <div className="project-item project-item-bottom"></div>
          </div>


        </div>
        <div className="sec2-item" id="aboutme"></div>
      </div>
      <div className="back-to-home">
        <p id="back-to-home-txt">HOME</p>
      </div>



    </div>


  );
}

export default App;