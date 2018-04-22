//         Координаты точки 0 на линейке: 97 80
//         Длина 1 см на линейке = 39px
//         Кривая будет подниматься до 0 SVG контейнера
//         Координата Х середины Квадратичной кривой Безье = (Точка2 - Точка1)/2 + Точка1


function addition(numA, numB) {
    if (numA < 6 || numA > 9 || (numA + numB) < 11 || (numA + numB) > 14) {
        alert("Введены некорректные данные!");
        document.body.innerHTML = "";
        return;
    }

    let a = numA;
    let b = numB;

    let spanA = document.createElement("span");
    spanA.id = "spanA";
    spanA.innerText = a;
    let pointACoordinateX = 97+39*a; // координата X точки А
    let middleZeroToA = (pointACoordinateX-97)/2+97; // середина отрезка от 0 до А

    let spanB = document.createElement("span");
    spanB.id = "spanB";
    spanB.innerText = b;
    let pointBCoordinateX = pointACoordinateX+39*b; // координата X точки B
    let middleZeroToB = (pointBCoordinateX-pointACoordinateX)/2+pointACoordinateX; // середина отрезка от A до B

    let expression = document.querySelector(".expression");
    expression.insertBefore(spanA, document.querySelector("#plus"));
    expression.insertBefore(spanB, document.querySelector("#equal"));
    
    function firstStep() {
        let curve1 = document.getElementById("curve1");
        curve1.setAttribute("d", "M97 80 Q" + middleZeroToA + " 0 "+ pointACoordinateX +" 80");
        curve1.style.display = "block";

        let inputAContainer = document.getElementById("inputAContainer");
        inputAContainer.style.left = middleZeroToA-10 + "px";
        inputAContainer.style.display = "block";

        let inputA = document.getElementById("inputA");
        inputA.focus();
        inputA.oninput = function () {
            if(inputA.value*1 !== a) {
                inputA.style.color = "red";
                document.querySelector("#spanA").style.backgroundColor = "orange";
            } else if(inputA.value*1 === a) {
                document.querySelector("#spanA").style.backgroundColor = "transparent";
                inputAContainer.removeChild(inputA);
                inputAContainer.innerText = a;
                secondStep();
            }
        };
    }

    function secondStep() {
        let curve2 = document.getElementById("curve2");
        curve2.setAttribute("d", "M"+ pointACoordinateX +" 80 Q" + middleZeroToB + " 0 "+ pointBCoordinateX +" 80");
        curve2.style.display = "block";

        let inputBContainer = document.getElementById("inputBContainer");
        inputBContainer.style.left = middleZeroToB-10 + "px";
        inputBContainer.style.display = "block";

        let inputB = document.getElementById("inputB");
        inputB.focus();
        inputB.oninput = function () {
            if(inputB.value*1 !== b) {
                inputB.style.color = "red";
                document.querySelector("#spanB").style.backgroundColor = "orange";
            } else if(inputB.value*1 === b) {
                document.querySelector("#spanB").style.backgroundColor = "transparent";
                inputBContainer.removeChild(inputB);
                inputBContainer.innerText = b;
                thirdStep();
            }
        };
    }

    function thirdStep() {
        let question = document.querySelector("#question");
        question.innerText = "";
        let inputResult = document.createElement("input");
        inputResult.type = "text";
        inputResult.classList.add("number-input");
        question.appendChild(inputResult);
        inputResult.focus();
        inputResult.oninput = function () {
            if (inputResult.value * 1 !== (a + b)) {
                inputResult.style.color = "red";
            } else if (inputResult.value * 1 === (a + b)) {
                question.removeChild(inputResult);
                question.innerText = a + b;
            }
        }
    }

    firstStep();
}

addition(7,4);