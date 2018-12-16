/**
 * Alisson Leiva Salazar
 * Created 12/15/18
 */
const out = document.getElementById("main");

var val1=5;
var val2=3;
var val3;

function print(message) {
    const element = document.createElement("p");
    element.innerText = message;
    out.appendChild(element);
}

function test(){
    val3=val1+val2;
    print(val3);
    print("Hello World");
    
}
test();