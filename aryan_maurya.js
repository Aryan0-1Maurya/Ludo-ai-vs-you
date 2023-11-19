/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/
alert
window.onload = function () {
  var diceMove1 = new Audio(
    "https://dl.dropboxusercontent.com/s/z7kwanleo6vni5x/1%20dice.mp3?dl=0"
  );
  diceMove1.preload = "auto";

  var diceMove2 = new Audio(
    "https://dl.dropboxusercontent.com/s/eq23l4kqjpcc9wf/2%20dice.mp3?dl=0"
  );
  diceMove2.preload = "auto";

  var diceMove3 = new Audio(
    "https://dl.dropboxusercontent.com/s/w1kz4j6rn03o6ti/3%20dice.mp3?dl=0"
  );
  diceMove3.preload = "auto";

  var diceMove4 = new Audio(
    "https://dl.dropboxusercontent.com/s/wxcdu13y1u5qy6d/4%20dice.mp3?dl=0"
  );
  diceMove4.preload = "auto";

  var diceMove5 = new Audio(
    "https://dl.dropboxusercontent.com/s/c3ca85oz3j7gta7/5%20dice.mp3?dl=0"
  );
  diceMove5.preload = "auto";

  var diceMove6 = new Audio(
    "https://dl.dropboxusercontent.com/s/6l73tj7qybhncza/6%20dice.mp3?dl=0"
  );
  diceMove6.preload = "auto";

  var diceDie = new Audio(
    "https://dl.dropboxusercontent.com/s/c2wrdqdnyku82we/Die%20sound.mp3?dl=0"
  );
  diceDie.preload = "auto";

  var diceSound = new Audio(
    "https://dl.dropboxusercontent.com/s/6sji3hofyb4ztb5/Dice%20roll.mp3?dl=0"
  );
  diceSound.preload = "auto";

  var pantaSound = new Audio(
    "https://dl.dropboxusercontent.com/s/g956e4zuulplkxr/panta_tone.mp3?dl=0"
  );

  var diceRand = 0;
  var diceRandY = 0;

  /*if (window.navigator.onLine) {
    onlineMode();
    } else {
    offlineMode();
    }*/

  var r1clickvar;

  var redHomeVal = 106;
  var yelHomeVal = 206;

  var isEverythingFree = true;

  var hasExtraChanceY = false;
  var hasExtraChance = false;

  var canGoInside = false;

  class RedPiece {
    static activeCount = 0;

    constructor(id) {
      this.id = id;
      this.color = "red";
      this.piece = document.getElementById(id);
      this.redpieceready = document.getElementById("" + this.id + "ready");
      this.steps = 0;
      this.isAlive = false;
      this.currBlock = 0;
      this.isMovable = true;
      this.isCurrentlyMovable = true;
      this.isMoving = false;
      this.isReachedDestination = false;
    }

    ready() {
      this.redpieceready.style.opacity = 1;
    }

    notready() {
      this.redpieceready.style.opacity = 0;
    }

    dead() {
      this.redpieceready.style.opacity = 0;
    }

    getp() {
      return this.piece;
    }

    release() {
      if (diceRand == 6 && !this.isAlive) {
        document.getElementById("hintArrowRed").style.display = "block";
        box.onclick = boxclick;
        diceRand = 0;
        checkAdjustments();
        document.getElementById("27").append(this.piece);
        RedPiece.activeCount += 1;
        this.isAlive = true;
        this.currBlock = 27;
        r1.piece.onclick = null;
        r2.piece.onclick = null;
        r3.piece.onclick = null;
        r4.piece.onclick = null;
        //alert(RedPiece.activeCount);
      }
    }

    move() {
      if (this.isMovable) {
        this.currBlock = this.currBlock + 1;
        this.steps += 1;
        if (this.steps == 51) {
          if (canGoInside) {
            this.currBlock = 101;
          } else {
            this.currBlock = 26;
            this.steps = -1;
          }
        }

        if (this.currBlock >= 106) {
          this.currBlock = redHomeVal;
          this.isReachedDestination = true;
          this.piece.style.height = "5vw";
          this.piece.style.width = "5vw";
          checkWin(this);
          hasExtraChance = true;
          redHomeVal++;
          pantaSound.play();
          this.isMovable = false;
        }
        document.getElementById("" + this.currBlock).append(this.piece);
        if (this.currBlock == 52) {
          this.currBlock = 0;
        }

        //clearInterval(this.moveinterval,n*100);
      }
    }

    die() {
      if (this.steps == 0) {
        if (this.id == "red1") {
          document.getElementById("redrestart1").append(this.piece);
        }
        if (this.id == "red2") {
          document.getElementById("redrestart2").append(this.piece);
        }
        if (this.id == "red3") {
          document.getElementById("redrestart3").append(this.piece);
        }
        if (this.id == "red4") {
          document.getElementById("redrestart4").append(this.piece);
        }
        this.currBlock = 0;

        this.isAlive = false;
      } else {
        if (this.currBlock == 1) {
          this.currBlock = 53;
        }
        this.currBlock = this.currBlock - 1;
        this.steps -= 1;
        document.getElementById("" + this.currBlock).append(this.piece);
      }
    }
  }

  class YellowPiece {
    static aliveCount = 0;

    constructor(id) {
      this.id = id;
      this.color = "yellow";
      this.piece = document.getElementById(id);
      this.yellowpieceready = document.getElementById("" + this.id + "ready");
      this.isMovable = true;
      this.currBlock = 0;
      this.steps = 0;
      this.isAlive = false;
      this.isCurrentlyMovable = true;
      this.isMoving = false;
      this.isReachedDestination = false;
    }

    ready() {
      this.yellowpieceready.style.opacity = 0;
    }

    dead() {
      this.yellowpieceready.style.opacity = 0;
    }

    release() {
      document.getElementById("1").append(this.piece);
      this.currBlock = 1;
      this.isAlive = true;
      YellowPiece.activeCount += 1;
      checkAdjustments();
    }

    move() {
      if (this.isMovable) {
        this.currBlock = this.currBlock + 1;
        this.steps += 1;
        if (this.steps == 51) {
          this.currBlock = 201;
        }

        if (this.currBlock >= 206) {
          this.currBlock = yelHomeVal;
          this.isReachedDestination = true;
          this.piece.style.height = "5vw";
          this.piece.style.width = "5vw";
          checkWin(this);
          hasExtraChanceY = true;
          yelHomeVal++;
          pantaSound.play();
          this.isMovable = false;
        }
        document.getElementById("" + this.currBlock).append(this.piece);
        if (this.currBlock == 52) {
          this.currBlock = 0;
        }

        //clearInterval(this.moveinterval,n*100);
      }
    }

    die() {
      if (this.steps <= 0) {
        if (this.id == "yellow1") {
          document.getElementById("yellowrestart1").append(this.piece);
        }
        if (this.id == "yellow2") {
          document.getElementById("yellowrestart2").append(this.piece);
        }
        if (this.id == "yellow3") {
          document.getElementById("yellowrestart3").append(this.piece);
        }
        if (this.id == "yellow4") {
          document.getElementById("yellowrestart4").append(this.piece);
        }
        this.isAlive = false;
        this.steps = 0;
      } else {
        /*if(this.currBlock == 1)
            {
                this.currBlock = 53;
            }*/
        this.currBlock = this.currBlock - 1;
        this.steps -= 1;
        document.getElementById("" + this.currBlock).append(this.piece);
      }
    }
  }

  var r1 = new RedPiece("red1");
  var r2 = new RedPiece("red2");
  var r3 = new RedPiece("red3");
  var r4 = new RedPiece("red4");

  var rarr = [r1, r2, r3, r4];

  var y1 = new YellowPiece("yellow1");
  var y2 = new YellowPiece("yellow2");
  var y3 = new YellowPiece("yellow3");
  var y4 = new YellowPiece("yellow4");

  var yarr = [y1, y2, y3, y4];

  for (let i = 0; i < 4; i++) {
    rarr[i].dead();
    yarr[i].dead();
  }

  class Board {
    constructor(color) {
      this.color = color;
    }

    active() {
      document.getElementsByClassName(this.color + "house")[0].style.animation =
        this.color + "ready 0.5s ease-in-out infinite";
      this.isActive = true;
    }
    inactive() {
      document.getElementsByClassName(this.color + "house")[0].style.animation =
        "none";
      this.isActive = false;
    }
  }

  var yellowBoard = new Board("yellow");

  var redBoard = new Board("red");

  redBoard.active();
  yellowBoard.inactive();

  var yellowuser = document.getElementById("yellowuser");

  var reduser = document.getElementById("reduser");

  function toggled() {
    //alert(redBoard.isActive);

    if (redBoard.isActive) {
      redBoard.inactive();
      yellowBoard.active();
      document.getElementById("hintArrowRed").style.display = "none";
      box.style.display = "none";
      ybox.style.display = "block";
      yellowuser.style.display = "block";
      reduser.style.display = "none";
      clearInterval(sim2);
      clearInterval(sim);
      al = 100;
      sim = setInterval(progressSim, 50);
    } else {
      redBoard.active();
      document.getElementById("hintArrowRed").style.display = "block";
      playerInactive = true;
      box.onclick = boxclick;
      yellowBoard.inactive();
      box.style.display = "block";
      ybox.style.display = "none";
      yellowuser.style.display = "none";
      reduser.style.display = "block";
      clearInterval(sim);
      clearInterval(sim2);
      al2 = 100;
      sim2 = setInterval(progressSim2, 50);
    }
  }

  var ybox = document.getElementById("ydicebox");

  class YellowDice {
    constructor() {
      this.diceReady = true;
      this.diceValue = 0;
    }

    roll() {
      diceSound.play();
      ybox.style.animation = "tirugur 1s linear infinite";
      for (let i = 0; i < 4; i++) {
        if (!yarr[i].isReachedDestination) yarr[i].piece.style.zIndex = "15";
        else yarr[i].piece.style.zIndex = "10";
        if (!rarr[i].isReachedDestination) rarr[i].piece.style.zIndex = "10";
        else rarr[i].piece.style.zIndex = "15";
      }
      if (dice6hack) diceRandY = 6;
      else if (dice1hack) diceRandY = 1;
      else diceRandY = Math.floor(Math.random() * 7);
      //diceRandY = 6;
      this.diceValue = diceRandY;

      setTimeout(function () {
        ybox.style.animation = "none";

        if (diceRandY == 0) diceRandY = 1;

        ybox.style.transform = "rotateX(0deg)";
        ybox.style.transform = "rotateY(0deg)";

        switch (diceRandY) {
          case 1:
            ybox.style.transform = "rotateX(0deg)";
            ybox.style.transform = "rotateY(0deg)";

            break;

          case 2:
            ybox.style.transform = "rotateX(0deg)";
            ybox.style.transform = "rotateY(90deg)";

            break;

          case 3:
            ybox.style.transform = "rotateX(0deg)";
            ybox.style.transform = "rotateY(270deg)";

            break;

          case 4:
            ybox.style.transform = "rotateX(-90deg)";

            break;

          case 5:
            ybox.style.transform = "rotateY(180deg)";

            break;

          case 6:
            ybox.style.transform = "rotateX(90deg)";

            break;
          default:
        }
      }, 400);

      setTimeout(function () {
        if (diceRandY == 6) {
          //alert("dice value 6");
          if (!y1.isAlive) {
            y1.release();
            setTimeout(function () {
              yellowDice.roll();
            }, 250);
          } else if (!y2.isAlive) {
            y2.release();
            setTimeout(function () {
              yellowDice.roll();
            }, 250);
          } else if (!y3.isAlive) {
            y3.release();
            setTimeout(function () {
              yellowDice.roll();
            }, 250);
          } else if (!y4.isAlive) {
            y4.release();
            setTimeout(function () {
              yellowDice.roll();
            }, 250);
          } else {
            if (y1.isAlive && y1.isMovable && !(y1.steps + diceRandY > 56)) {
              moveY(y1);
            } else if (
              y2.isAlive &&
              y2.isMovable &&
              !(y2.steps + diceRandY > 56)
            ) {
              moveY(y2);
            } else if (
              y3.isAlive &&
              y3.isMovable &&
              !(y3.steps + diceRandY > 56)
            ) {
              moveY(y3);
            } else if (
              y4.isAlive &&
              y4.isMovable &&
              !(y4.steps + diceRandY > 56)
            ) {
              moveY(y4);
            } else {
              toggled();
            }
          }
        } else {
          if (y1.isAlive && y1.isMovable && !(y1.steps + diceRandY > 56)) {
            moveY(y1);
          } else if (
            y2.isAlive &&
            y2.isMovable &&
            !(y2.steps + diceRandY > 56)
          ) {
            moveY(y2);
          } else if (
            y3.isAlive &&
            y3.isMovable &&
            !(y3.steps + diceRandY > 56)
          ) {
            moveY(y3);
          } else if (
            y4.isAlive &&
            y4.isMovable &&
            !(y4.steps + diceRandY > 56)
          ) {
            moveY(y4);
          } else {
            //console.log("no piece alive");
            setTimeout(toggled, 250);
          }
        }
      }, 500);

      setTimeout(function () {
        if (diceRandY == 6) {
        } else {
          if (!y1.isAlive && !y2.isAlive && !y3.isAlive && !y4.isAlive) {
            //toggled();
          }
        }
      }, 1000);
    }
  }

  var yellowDice = new YellowDice();

  class RedDice {
    constructor() {
      this.diceReady = true;
      this.diceValue = 0;
      this.isReady = true;
    }

    roll() {
      playerInactive = false;
      var noMovesPossible = true;
      clearInterval(sim2);
      box.onclick = null;
      r1.piece.onclick = function () {
        move(r1);
      };

      r2.piece.onclick = function () {
        move(r2);
      };

      r3.piece.onclick = function () {
        move(r3);
      };

      r4.piece.onclick = function () {
        move(r4);
      };
      for (let i = 0; i < 4; i++) {
        if (!yarr[i].isReachedDestination) yarr[i].piece.style.zIndex = "10";
        else yarr[i].piece.style.zIndex = "10";
        if (!rarr[i].isReachedDestination) rarr[i].piece.style.zIndex = "15";
        else rarr[i].piece.style.zIndex = "15";
      }
      document.getElementById("hintArrowRed").style.display = "none";
      diceSound.play();
      box.style.animation = "tirugura 1s linear infinite";
      if (dice6hack) diceRand = 6;
      else if (dice1hack) diceRand = 1;
      else diceRand = Math.floor(Math.random() * 7);

      this.diceValue = diceRand;

      setTimeout(function () {
        box.style.animation = "none";
        if (diceRand == 6) {
          for (let i = 0; i < 4; i++) {
            if (
              (!rarr[i].isAlive || rarr[i].isMovable) &&
              !(rarr[i].steps + diceRand > 56)
            ) {
              rarr[i].ready();
              noMovesPossible = false;
            } else {
              rarr[i].dead();
            }
          }
        } else {
          for (let i = 0; i < 4; i++) {
            if (
              rarr[i].isAlive &&
              rarr[i].isMovable &&
              !(rarr[i].steps + diceRand > 56)
            ) {
              rarr[i].ready();
              noMovesPossible = false;
              rarr[i].isCurrentlyMovable = true;
            } else {
              rarr[i].dead();
              rarr[i].isCurrentlyMovable = false;
            }
          }
        }

        if (diceRand == 0) diceRand = 1;

        box.style.transform = "rotateX(0deg)";
        box.style.transform = "rotateY(0deg)";

        switch (diceRand) {
          case 1:
            box.style.transform = "rotateX(0deg)";
            box.style.transform = "rotateY(0deg)";

            break;

          case 2:
            box.style.transform = "rotateX(0deg)";
            box.style.transform = "rotateY(90deg)";

            break;

          case 3:
            box.style.transform = "rotateX(0deg)";
            box.style.transform = "rotateY(270deg)";

            break;

          case 4:
            box.style.transform = "rotateX(-90deg)";

            break;

          case 5:
            box.style.transform = "rotateY(180deg)";

            break;

          case 6:
            box.style.transform = "rotateX(90deg)";

            break;
          default:
        }
      }, 400);

      setTimeout(function () {
        setTimeout(function () {
          if (noMovesPossible) {
            r1.piece.onclick = null;
            r2.piece.onclick = null;
            r3.piece.onclick = null;
            r4.piece.onclick = null;
            toggled();
            yellowDice.roll();
          }
        }, 500);
      }, 500);
    }
  }

  //setInterval(toggle,3000);

  function moveY(r) {
    r.isMoving = true;
    yDice = diceRandY;
    checkLastStep = diceRandY;

    switch (diceRandY) {
      case 1:
        diceMove1.play();
        break;
      case 2:
        diceMove2.play();
        break;
      case 3:
        diceMove3.play();
        break;
      case 4:
        diceMove4.play();
        break;
      case 5:
        diceMove5.play();
        break;
      case 6:
        diceMove6.play();
        break;
      default:
    }
    var xk = setInterval(function () {
      r.move();

      setTimeout(function () {
        let topP = "-7.6vw";
        let leftP = "-4.5vw";

        let currb = r.currBlock;

        if (checkLastStep == 1) {
          //console.log("laststep :"+currb);
        } else if (
          (currb > 25 && currb < 32) ||
          (currb > 44 && currb < 51) ||
          (currb > 36 && currb < 39)
        ) {
          topP = "-9.6vw";
          leftP = "-4.5vw";
          //up
        } else if (
          currb == 52 ||
          (currb > 0 && currb < 6) ||
          (currb > 10 && currb < 14) ||
          (currb > 18 && currb < 25)
        ) {
          topP = "-5.6vw";
          leftP = "-4.5vw";
          //down
        } else if (
          (currb > 31 && currb < 37) ||
          (currb > 12 && currb < 19) ||
          (currb > 23 && currb < 26)
        ) {
          leftP = "-5.5vw";
          topP = "-7.6vw";
          //left
        } else if (
          (currb > 38 && currb < 45) ||
          (currb > 49 && currb < 52) ||
          (currb > 5 && currb < 11)
        ) {
          leftP = "-3.5vw";
          topP = "-7.6vw";
          //right
        }

        checkLastStep -= 1;

        r.piece.style.height = "15vw";
        r.piece.style.width = "15vw";
        r.piece.style.top = topP;
        r.piece.style.left = leftP;
      }, 1);

      setTimeout(function () {
        r.piece.style.height = "12vw";
        r.piece.style.width = "12vw";
        r.piece.style.top = "-5.6vw";
        r.piece.style.left = "-3vw";
      }, 125);

      checkAdjustments();
    }, 250);

    setTimeout(function () {
      clearInterval(xk);
      checkAdjustments();
      checkDeath(r);

      if (diceRandY == 6 || hasExtraChanceY) {
        hasExtraChanceY = false;
        yellowDice.roll();
      } else {
        toggled();
      }

      yDice = 0;
      this.isMoving = false;
    }, diceRandY * 250);
  }

  function move(r) {
    if (
      (diceRand == 6 && !(r.steps + diceRand > 56)) ||
      (r.isAlive && r.isMovable && !(r.steps + diceRand > 56))
    ) {
      for (let i = 0; i < 4; i++) {
        rarr[i].dead();
      }
    }

    if (!r.isAlive) {
      r.release();
    } else {
      if (r.isMovable && !r.isMoving && !(r.steps + diceRand > 56)) {
        r1.piece.onclick = null;
        r2.piece.onclick = null;
        r3.piece.onclick = null;
        r4.piece.onclick = null;

        r.isMoving = true;
        redDice = diceRand;
        var checkLastStepR = diceRand;
        //diceRand = 0;
        switch (redDice) {
          case 1:
            diceMove1.play();
            break;
          case 2:
            diceMove2.play();
            break;
          case 3:
            diceMove3.play();
            break;
          case 4:
            diceMove4.play();
            break;
          case 5:
            diceMove5.play();
            break;
          case 6:
            diceMove6.play();
            break;
          default:
        }
        x = setInterval(function () {
          r.move();

          setTimeout(function () {
            let topP = "-7.6vw";
            let leftP = "-4.5vw";

            let currb = r.currBlock;

            if (checkLastStepR == 1) {
              //console.log("laststep :"+currb);
            } else if (
              (currb > 25 && currb < 32) ||
              (currb > 44 && currb < 51) ||
              (currb > 36 && currb < 39)
            ) {
              topP = "-9.6vw";
              leftP = "-4.5vw";
              //up
            } else if (
              currb == 52 ||
              (currb > 0 && currb < 6) ||
              (currb > 10 && currb < 14) ||
              (currb > 18 && currb < 25)
            ) {
              topP = "-5.6vw";
              leftP = "-4.5vw";
              //down
            } else if (
              (currb > 31 && currb < 37) ||
              (currb > 12 && currb < 19) ||
              (currb > 23 && currb < 26)
            ) {
              leftP = "-5.5vw";
              topP = "-7.6vw";
              //left
            } else if (
              (currb > 38 && currb < 45) ||
              (currb > 49 && currb < 52) ||
              (currb > 5 && currb < 11)
            ) {
              leftP = "-3.5vw";
              topP = "-7.6vw";
              //right
            }

            checkLastStepR -= 1;

            r.piece.style.height = "15vw";
            r.piece.style.width = "15vw";
            r.piece.style.top = topP;
            r.piece.style.left = leftP;
          }, 1);

          setTimeout(function () {
            r.piece.style.height = "12vw";
            r.piece.style.width = "12vw";
            r.piece.style.top = "-5.6vw";
            r.piece.style.left = "-3vw";
            //navigator.vibrate(0.1*500);
          }, 125);

          checkAdjustments();
        }, 250);

        setTimeout(function () {
          clearInterval(x);
          checkAdjustments();
          checkDeath(r);
          for (let i = 0; i < 4; i++) {
            rarr[i].notready;
          }

          r1.piece.onclick = null;
          r2.piece.onclick = null;
          r3.piece.onclick = null;
          r4.piece.onclick = null;

          setTimeout(function () {
            if (redDice != 6 && redDice != 0 && !hasExtraChance) {
              hasExtraChance = false;
              toggled();
              yellowDice.roll();
            }
            if (diceRand == 6 || hasExtraChance) {
              box.onclick = boxclick;
              document.getElementById("hintArrowRed").style.display = "block";
              hasExtraChance = false;
            }
            diceRand = 0;
            redDice = 0;
          }, 500);

          r.isMoving = false;
        }, redDice * 250);
      }
    }
  }
  var error = document.getElementsByTagName("p");

  var strrr = error[error.length - 1].innerHTML;

  if (!strrr.includes("Aryan Maurya") || !document.title.includes("Ludo by Aryan Maurya")) {
    document.getElementById("finalnotep").innerHTML =
      "Error ! <br><br> Code copied & modified without Permission";
    document.getElementById("finalnote").style.display = "block";
  }
  function die(r) {
    diceDie.play();
    isEverythingFree = false;
    r.isAlive = false;
    r.piece.style.position = "absolute";
    r.piece.style.left = "-3vw";
    y = setInterval(function () {
      r.die();
    }, 60);

    setTimeout(function () {
      clearInterval(y);
      if (r.id == "yellow1") {
        document.getElementById("yellowrestart1").append(r.piece);
      }
      if (r.id == "yellow2") {
        document.getElementById("yellowrestart2").append(r.piece);
      }
      if (r.id == "yellow3") {
        document.getElementById("yellowrestart3").append(r.piece);
      }
      if (r.id == "yellow4") {
        document.getElementById("yellowrestart4").append(r.piece);
      }
      if (r.id == "red1") {
        document.getElementById("redrestart1").append(r.piece);
      }
      if (r.id == "red2") {
        document.getElementById("redrestart2").append(r.piece);
      }
      if (r.id == "red3") {
        document.getElementById("redrestart3").append(r.piece);
      }
      if (r.id == "red4") {
        document.getElementById("redrestart4").append(r.piece);
      }
      checkAdjustments();
      r.isAlive = false;
      r.steps = 0;
      r.currBlock = 0;
      isEverythingFree = true;
    }, (r.steps + 1) * 60);
  }

  r1.piece.onclick = function () {
    move(r1);
  };

  r2.piece.onclick = function () {
    move(r2);
  };

  r3.piece.onclick = function () {
    move(r3);
  };

  r4.piece.onclick = function () {
    move(r4);
  };

  /*
    y1.piece.onclick = function () {
        y1clickvar = move(y1);
    }
    
    y2.piece.onclick = function () {
        y2clickvar = move(y2);
    }
    
    y3.piece.onclick = function () {
        y3clickvar = move(y3);
    }
    
    y4.piece.onclick = function () {
        y4clickvar = move(y4);
    } */

  var box = document.getElementById("rdicebox");
  var redDicee = new RedDice();

  var boxclick = (box.onclick = function () {
    redDicee.roll();
  });

  function checkAdjustments() {
    // Upgrade needed
  }

  function checkDeath(killer) {
    let curr = killer.currBlock;

    if (
      curr != 0 &&
      curr != 1 &&
      curr != 9 &&
      curr != 14 &&
      curr != 22 &&
      curr != 27 &&
      curr != 35 &&
      curr != 40 &&
      curr != 48
    ) {
      if (killer.color == "red") {
        for (let i = 0; i < 4; i++) {
          if (curr == yarr[i].currBlock) {
            hasExtraChance = true;
            canGoInside = true;
            die(yarr[i]);
            checkAdjustments();
          }
        }
      } else {
        for (let i = 0; i < 4; i++) {
          if (curr == rarr[i].currBlock) {
            hasExtraChanceY = true;
            die(rarr[i]);
            checkAdjustments();
          }
        }
      }
    }
  }

  var redAutoExit = false;

  function checkWin(winner) {
    if (winner.color == "red") {
      if (
        r1.isReachedDestination &&
        r2.isReachedDestination &&
        r3.isReachedDestination &&
        r4.isReachedDestination
      ) {
        document.getElementById("finalnote").style.display = "block";
      }
    } else {
      if (
        (y1.isReachedDestination &&
          y2.isReachedDestination &&
          y3.isReachedDestination &&
          y4.isReachedDestination) ||
        redAutoExit
      ) {
        document.getElementById("finalnotep").innerHTML = "AmsR Win";
        document.getElementById("finalnote").style.display = "block";
      }
    }
  }

  var dice6hack = false;

  var dice1hack = false;

  var dice6btn = document.getElementById("ball1");
  var dice1btn = document.getElementById("ball2");

  dice6btn.onclick = function () {
    if (dice6hack) {
      dice6hack = false;
      dice6btn.style.marginLeft = "0px";
      dice6btn.style.backgroundColor = "grey";
    } else {
      dice6hack = true;
      dice6btn.style.marginLeft = "9px";
      dice6btn.style.backgroundColor = "red";
    }
    dice1hack = false;
    dice1btn.style.marginLeft = "0px";
    dice1btn.style.backgroundColor = "grey";
  };
  dice1btn.onclick = function () {
    if (dice1hack) {
      dice1hack = false;
      dice1btn.style.marginLeft = "0px";
      dice1btn.style.backgroundColor = "grey";
    } else {
      dice1hack = true;
      dice1btn.style.marginLeft = "9px";
      dice1btn.style.backgroundColor = "red";
    }
    dice6hack = false;
    dice6btn.style.marginLeft = "0px";
    dice6btn.style.backgroundColor = "grey";
  };

  var playerInactive = true;

  var al2 = 100;
  var ct = 1;
  var ctx2 = document.getElementById("my_canvas2").getContext("2d");

  var start2 = 4.72;
  var startColor2 = "#1DFE00"; //red "#1DFE00"
  var cw2 = ctx2.canvas.width;
  var ch2 = ctx2.canvas.height;
  var diff2;
  function progressSim2() {
    diff2 = ((al2 / 100) * Math.PI * 2 * 10).toFixed(2);
    ctx2.clearRect(0, 0, cw, ch);
    ctx2.lineWidth = 9;
    ctx2.fillStyle = "#09F";
    ctx2.strokeStyle = startColor2;
    ctx2.textAlign = "center";
    ctx2.fillText("", cw * 0.5, ch * 0.5 + 2, cw);
    ctx2.beginPath();
    ctx2.arc(35, 35, 30, start2, diff2 / 10 + start2, false);
    ctx2.stroke();

    if (al2 <= 25) {
      startColor2 = "red";
    } else if (al < 60 && al > 25) {
      startColor = "orange";
    } else {
      startColor2 = "#1DFE00";
    }

    if (al2 <= 0) {
      clearInterval(sim2);
      if (playerInactive) {
        if (ct > 3) {
          box.onclick = null;
          redAutoExit = true;
          checkWin(y1);
        } else {
          redDicee.roll();
          document.getElementById("c" + ct).style.backgroundColor = "red";
          setTimeout(function () {
            if (r1.isAlive && r1.isMovable && !(r1.steps + diceRandY > 56)) {
              move(r1);
            } else if (
              r2.isAlive &&
              r2.isMovable &&
              !(r2.steps + diceRandY > 56)
            ) {
              move(r2);
            } else if (
              r3.isAlive &&
              r3.isMovable &&
              !(r3.steps + diceRandY > 56)
            ) {
              move(r3);
            } else if (
              r4.isAlive &&
              r4.isMovable &&
              !(r4.steps + diceRandY > 56)
            ) {
              move(r4);
            }
          }, 500);
          document.getElementById("c" + ct).style.boxshadow =
            "0px 0px 1px 1px #1DFE00";
          ct++;
        }
      }
    }
    al2--;
  }

  sim2 = setInterval(progressSim2, 150);
  
   amsralt();
   function amsralt(){
    
    Swal.fire({
        icon: "info",
        title: "This is AI ludo game by <a href='https://amsrportfolio.netlify.app'>Aryan Maurya</a> genernally this is best working on phones not good in pc /laptop",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
      
   }
  amsr();
   // Assuming you have SweetAlert library loaded
function amsr(){
    Swal.fire({
        title: "Recently Added New Rule",
        text:
          "This is not working on pc /laptop best in phones \n\n\n\n You cannot go to the red home without killing the opponent at least once, but the bot has the power to go as it is weaker than you.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          // OK button is clicked
          canGoInside = true;
        } else {
          // Cancel button is clicked
          canGoInside = false;
        }
      });
}
   
};

/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/
