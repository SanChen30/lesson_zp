var a = 1;

function fn(a) {
    console.log(a); //[Function: a]
    var a = 2;
    function a() { };
    var b = a;
    console.log(a);
}

fn(3);
console.log(a);