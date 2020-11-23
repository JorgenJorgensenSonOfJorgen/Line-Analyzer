// Line Analyzer

// Add Event Listener
document.getElementById('analyze').addEventListener('click', analyzeLine);

// Event Function
function analyzeLine() {
    // Get Inputted Point Data (pt1x, pt1y) and (pt2x, pt2y)
    let pt1x = Number(document.getElementById('pt1x').value);
    let pt1y = Number(document.getElementById('pt1y').value);
    let pt2x = Number(document.getElementById('pt2x').value);
    let pt2y = Number(document.getElementById('pt2y').value);

    // Call Analyze Functions and Display results
    document.getElementById('length').innerHTML = getLength(pt1x, pt1y, pt2x, pt2y);
    document.getElementById('slope').innerHTML = getSlope(pt1x, pt1y, pt2x, pt2y);
    document.getElementById('description').innerHTML = getDescription(pt1x, pt1y, pt2x, pt2y);
    document.getElementById('location-1').innerHTML = getPointLocation(pt1x, pt1y);
    document.getElementById('location-2').innerHTML = getPointLocation(pt2x, pt2y);
     document.getElementById('equation').innerHTML = getEquation(pt1x, pt1y, pt2x, pt2y);
}

// Line Analyzer Functions (Write your solutions here... getLength is done for you)

function getLength(x1, y1, x2, y2) {
    // Use pythagorean theorem to determine length from (x1, y1) to (x2, y2)
    let rise = y2 - y1;
    let run = x2 - x1;
    return (rise ** 2 + run ** 2) ** 0.5
}
function getSlope(x1,y1,x2,y2) {
    if (y1-y2 == 0 && x1-x2 == 0) {
        return "cannot determine"
    } else {
        return (y1-y2)/(x1-x2)
    }
}
function getDescription(x1,y1,x2,y2){
    let slope = getSlope(x1,y1,x2,y2)
    if (slope == 0){
        return "horizontal"
    } else if (slope == "cannot determine"){
        return slope
    } else if (slope == 1/0 || slope == -1/0) {
        return "vertical"
    } else if (Math.sqrt(slope **2) == slope){
        return "increasing"
    } else {
        return " decreasing"
    }  
}
function getPointLocation(x,y){
    return "(" +x + "," + y +")"
}
function getEquation(x1,y1,x2,y2){
    let slope = getSlope(x1,y1,x2,y2)
    let yinter = y1 - x1*slope
    let desc = getDescription(x1,y1,x2,y2)
    //form equations based on slope conditions
    if (slope == 1) {
        return formEquation("",yinter,desc,x1,y1)
    } else if (slope == -1){
        return formEquation("-", yinter,desc,x1,y1)
    } else {
        return formEquation(slope, yinter,desc,x1,y1)
    }

}
function formEquation(slope,yinter,desc,x1,y1) {
    if (desc == "horizontal") {
        return "y = " + y1
    } else if (desc == "vertical") {
        return "x = " + x1
    } else if (desc == "cannot determine"){
        return desc
    }else {
        if (Math.sqrt(yinter **2) == yinter){
            return "y = " + slope +"x + " + yinter
        } else {
            return "y = " + slope +"x - " + Math.sqrt(yinter **2)
        }
    }
}