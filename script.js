// @ts-nocheck

"use strict";

/* =====================================================
   BASIC HELPERS
===================================================== */

const scenes = document.querySelectorAll(".scene");

let isTransitioning = false;

function showScene(sceneId, delay = 0) {

    if (isTransitioning) {
        return;
    }

    isTransitioning = true;

    setTimeout(function () {

        scenes.forEach(function (scene) {
            scene.classList.remove("active");
        });

        const target = document.getElementById(sceneId);

        if (target) {
            target.classList.add("active");
        }

        window.scrollTo(0, 0);

        setTimeout(function () {
            isTransitioning = false;
        }, 800);

    }, delay);
}


/* =====================================================
   BUTTON NAVIGATION
===================================================== */

function connectButton(buttonId, sceneId) {

    const button =
        document.getElementById(buttonId);

    if (!button) {
        return;
    }

    button.addEventListener("click", function () {

        showScene(sceneId);

    });
}


connectButton(
    "beginButton",
    "storybookScene"
);

connectButton(
    "storyButton",
    "sirScene"
);

connectButton(
    "sirButton",
    "blackboardScene"
);

connectButton(
    "boardButton",
    "giftScene"
);

connectButton(
    "letterButton",
    "candleScene"
);

connectButton(
    "restartButton",
    "openingScene"
);


/* =====================================================
   GIFT SYSTEM
===================================================== */

const giftBoxes =
    document.querySelectorAll(".gift-box");

const giftPopup =
    document.getElementById("giftPopup");

const popupText =
    document.getElementById("popupText");

const closePopup =
    document.getElementById("closePopup");

const giftContinue =
    document.getElementById("giftContinue");

const giftMessage =
    document.getElementById("giftMessageText");

let openedGifts = 0;


/* Open gift */

giftBoxes.forEach(function (gift) {

    gift.addEventListener("click", function () {

        const message =
            gift.getAttribute("data-message");

        if (popupText) {
            popupText.textContent =
                message;
        }

        if (giftPopup) {
            giftPopup.classList.add("show");
        }

        openedGifts++;

        gift.style.transform =
            "scale(.96)";

        setTimeout(function () {

            gift.style.transform = "";

        }, 180);

        if (giftMessage) {

            giftMessage.textContent =
                "Ek surprise unlock ho gaya. ❤️";

        }

        /*
         * After opening at least one gift,
         * the final button becomes available.
         */

        if (
            giftContinue &&
            openedGifts >= 1
        ) {

            giftContinue.classList.remove(
                "hidden"
            );

        }

    });

});


/* Close popup */

if (closePopup) {

    closePopup.addEventListener(
        "click",
        function () {

            giftPopup.classList.remove(
                "show"
            );

        }
    );

}


/* Close popup by clicking outside */

if (giftPopup) {

    giftPopup.addEventListener(
        "click",
        function (event) {

            if (
                event.target === giftPopup
            ) {

                giftPopup.classList.remove(
                    "show"
                );

            }

        }
    );

}


/* Continue from gifts */

if (giftContinue) {

    giftContinue.addEventListener(
        "click",
        function () {

            giftPopup.classList.remove(
                "show"
            );

            showScene(
                "letterScene"
            );

        }
    );

}


/* =====================================================
   CANDLE SYSTEM
===================================================== */

const candle =
    document.getElementById("candle");

const candleHint =
    document.getElementById("candleHint");

let candleUsed = false;

if (candle) {

    candle.addEventListener(
        "click",
        extinguishCandle
    );

    candle.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                extinguishCandle();

            }

        }
    );

}


function extinguishCandle() {

    if (candleUsed) {
        return;
    }

    candleUsed = true;

    candle.classList.add(
        "extinguished"
    );

    if (candleHint) {

        candleHint.textContent =
            "✨ Wish made.";

    }

    setTimeout(function () {

        startCountdown();

    }, 900);

}


/* =====================================================
   COUNTDOWN
===================================================== */

function startCountdown() {

    const candleScene =
        document.getElementById(
            "candleScene"
        );

    if (!candleScene) {
        return;
    }

    const countdown =
        document.createElement("div");

    countdown.className =
        "birthday-countdown";

    candleScene.appendChild(
        countdown
    );

    const numbers =
        ["3", "2", "1"];

    let index = 0;

    function showNumber() {

        if (
            index >= numbers.length
        ) {

            countdown.remove();

            showScene(
                "birthdayScene"
            );

            setTimeout(
                createBirthdayEffects,
                700
            );

            return;
        }

        countdown.textContent =
            numbers[index];

        countdown.classList.remove(
            "countdown-pop"
        );

        void countdown.offsetWidth;

        countdown.classList.add(
            "countdown-pop"
        );

        index++;

        setTimeout(
            showNumber,
            850
        );

    }

    showNumber();

}


/* =====================================================
   BIRTHDAY EFFECTS
===================================================== */

function createBirthdayEffects() {

    createConfetti();

    setTimeout(
        createFireworks,
        300
    );

    setTimeout(
        createFireworks,
        1200
    );

    setTimeout(
        createFireworks,
        2200
    );

    setTimeout(
        showFinalButton,
        4200
    );

}


/* =====================================================
   CONFETTI
===================================================== */

function createConfetti() {

    const container =
        document.getElementById(
            "confettiContainer"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const pieces = [
        "✦",
        "•",
        "◆",
        "♡",
        "✧"
    ];

    for (
        let i = 0;
        i < 85;
        i++
    ) {

        const piece =
            document.createElement("span");

        piece.className =
            "confetti";

        piece.textContent =
            pieces[
                Math.floor(
                    Math.random() *
                    pieces.length
                )
            ];

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.fontSize =
            10 +
            Math.random() * 13 +
            "px";

        piece.style.animationDelay =
            Math.random() * 2 +
            "s";

        piece.style.animationDuration =
            3 +
            Math.random() * 3 +
            "s";

        container.appendChild(
            piece
        );

    }

}


/* =====================================================
   FIREWORKS
===================================================== */

function createFireworks() {

    const container =
        document.getElementById(
            "fireworksContainer"
        );

    if (!container) {
        return;
    }

    const centerX =
        20 +
        Math.random() * 60;

    const centerY =
        15 +
        Math.random() * 45;

    const particles = 28;

    for (
        let i = 0;
        i < particles;
        i++
    ) {

        const particle =
            document.createElement("span");

        particle.className =
            "firework";

        particle.style.left =
            centerX + "%";

        particle.style.top =
            centerY + "%";

        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            60 +
            Math.random() * 150;

        const x =
            Math.cos(angle) *
            distance;

        const y =
            Math.sin(angle) *
            distance;

        particle.style.setProperty(
            "--x",
            x + "px"
        );

        particle.style.setProperty(
            "--y",
            y + "px"
        );

        particle.style.animationDelay =
            Math.random() * .15 +
            "s";

        container.appendChild(
            particle
        );

    }

    setTimeout(function () {

        const particles =
            container.querySelectorAll(
                ".firework"
            );

        particles.forEach(
            function (particle) {

                particle.remove();

            }
        );

    }, 1600);

}


/* =====================================================
   FINAL SCENE BUTTON
===================================================== */

function showFinalButton() {

    const birthdayScene =
        document.getElementById(
            "birthdayScene"
        );

    if (!birthdayScene) {
        return;
    }

    if (
        document.getElementById(
            "birthdayContinue"
        )
    ) {
        return;
    }

    const button =
        document.createElement("button");

    button.id =
        "birthdayContinue";

    button.className =
        "primary-button birthday-next";

    button.innerHTML =
        'One last line <span>→</span>';

    birthdayScene
        .querySelector(".page-content")
        .appendChild(button);

    button.addEventListener(
        "click",
        function () {

            showScene(
                "finalScene"
            );

        }
    );

}


/* =====================================================
   BUTTON PRESS FEEDBACK
===================================================== */

const allButtons =
    document.querySelectorAll(
        "button"
    );

allButtons.forEach(
    function (button) {

        button.addEventListener(
            "pointerdown",
            function () {

                button.classList.add(
                    "pressed"
                );

            }
        );

        button.addEventListener(
            "pointerup",
            function () {

                button.classList.remove(
                    "pressed"
                );

            }
        );

        button.addEventListener(
            "pointercancel",
            function () {

                button.classList.remove(
                    "pressed"
                );

            }
        );

    }
);


/* =====================================================
   BACKGROUND DUST
===================================================== */

const background =
    document.getElementById(
        "background"
    );

function createDust() {

    if (!background) {
        return;
    }

    const existing =
        background.querySelectorAll(
            ".dust"
        );

    if (existing.length > 0) {
        return;
    }

    for (
        let i = 0;
        i < 25;
        i++
    ) {

        const dust =
            document.createElement("span");

        dust.className =
            "dust";

        dust.style.left =
            Math.random() * 100 +
            "%";

        dust.style.top =
            Math.random() * 100 +
            "%";

        dust.style.animationDelay =
            Math.random() * 6 +
            "s";

        dust.style.animationDuration =
            5 +
            Math.random() * 6 +
            "s";

        background.appendChild(
            dust
        );

    }

}

createDust();


/* =====================================================
   DYNAMIC ANIMATION STYLES
===================================================== */

const dynamicStyle =
    document.createElement("style");

dynamicStyle.textContent = `

/* ---------------------------------------------
   COUNTDOWN
--------------------------------------------- */

.birthday-countdown {
    position: absolute;

    inset: 0;

    display: flex;

    align-items: center;
    justify-content: center;

    z-index: 100;

    color: #704938;

    font-family:
        "Playfair Display",
        Georgia,
        serif;

    font-size:
        clamp(
            90px,
            25vw,
            180px
        );

    font-weight: 700;

    pointer-events: none;
}

.countdown-pop {
    animation:
        countdownPop
        .75s
        cubic-bezier(.2,.8,.2,1)
        both;
}

@keyframes countdownPop {

    0% {
        opacity: 0;

        transform:
            scale(.4)
            translateY(15px);
    }

    35% {
        opacity: 1;

        transform:
            scale(1.08)
            translateY(0);
    }

    100% {
        opacity: 0;

        transform:
            scale(1.35)
            translateY(-10px);
    }

}


/* ---------------------------------------------
   DUST
--------------------------------------------- */

.dust {
    position: absolute;

    width: 4px;
    height: 4px;

    border-radius: 50%;

    background:
        rgba(132,91,57,.18);

    animation:
        dustFloat
        ease-in-out
        infinite;
}

@keyframes dustFloat {

    0%,
    100% {
        opacity: .15;

        transform:
            translateY(0)
            scale(.7);
    }

    50% {
        opacity: .55;

        transform:
            translateY(-25px)
            scale(1.2);
    }

}


/* ---------------------------------------------
   BUTTON PRESS
--------------------------------------------- */

.pressed {
    transform:
        scale(.95) !important;
}


/* ---------------------------------------------
   BIRTHDAY BUTTON
--------------------------------------------- */

.birthday-next {
    margin-top: 32px;

    opacity: 0;

    animation:
        birthdayButtonAppear
        .8s
        ease
        forwards;
}

@keyframes birthdayButtonAppear {

    from {
        opacity: 0;

        transform:
            translateY(15px);
    }

    to {
        opacity: 1;

        transform:
            translateY(0);
    }

}


/* ---------------------------------------------
   FIREWORK PARTICLES
--------------------------------------------- */

.firework {
    will-change:
        transform,
        opacity;
}


/* ---------------------------------------------
   MOBILE COUNTDOWN
--------------------------------------------- */

@media (max-width: 600px) {

    .birthday-countdown {
        font-size: 100px;
    }

    .birthday-next {
        margin-top: 22px;
    }

}

`;

document.head.appendChild(
    dynamicStyle
);


/* =====================================================
   INITIAL STATE
===================================================== */

showScene("openingScene");