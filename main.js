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
    //special circumstance for undefined slope and 0/0
    if (y1-y2 == 0 && x1-x2 == 0) {
        return "cannot determine"
    } else if (x1-x2 == 0) {
        return "undefined"
    } else {
        return (y1-y2)/(x1-x2)
    }
}
function getDescription(x1,y1,x2,y2){
    //slope is 0,0/0, undefined, positive, or negative
    let slope = getSlope(x1,y1,x2,y2)
    if (slope == 0){
        return "horizontal"
    } else if (slope == "cannot determine"){
        return slope
    } else if (slope == "undefined") {
        return "vertical"
    } else if (Math.sqrt(slope **2) == slope){
        return "increasing"
    } else {
        return " decreasing"
    }  
}
function getPointLocation(x,y){
    //(x,y)
    let coords = "(" +x + "," + y +")" 
    //x is 0
    if (x==0) {
        //both x and y are 0
        if (y == 0) {
            return coords  + ", origin"
        //x is 0 y is not 0
        } else {
            return coords  + ", y axis"
        }
    // x is not 0
    } else {
        // y is 0 x is not 0
        if (y == 0) {
            return coords  + ", x axis"
        //no points are 0
        } else {
            // x is positive
            if (Math.sqrt(x **2) == x) {
                return determineQ(1,4,y,coords)
            // x is not positive
            } else {
                return determineQ(2,3,y,coords)
            }
        }
    }
}
function determineQ(qp1,qp2,y,coords){
    //y is positive
    if (Math.sqrt(y **2) == y) {
        return coords + ", quadrant " + qp1
    //y is not positive
    } else {
        return coords + ", quadrant " + qp2
    }
}
function getEquation(x1,y1,x2,y2){
    //define variables
    let slope = getSlope(x1,y1,x2,y2)
    let yinter = y1 - x1*slope
    let desc = getDescription(x1,y1,x2,y2)
    //form equations based on slope conditions (dont want a 1 as a coefficient)
    if (slope == 1) {
        return formEquation("",yinter,desc,x1,y1)
    } else if (slope == -1){
        return formEquation("-", yinter,desc,x1,y1)
    } else {
        return formEquation(slope, yinter,desc,x1,y1)
    }

}
function formEquation(slope,yinter,desc,x1,y1) {
    // y is a constant
    if (desc == "horizontal") {
        return "y = " + y1
    // x is a constant
    } else if (desc == "vertical") {
        return "x = " + x1
    //equation cannot be determined
    } else if (desc == "cannot determine"){
        return desc
    // regular equation
    }else {
        //y inter is 0
        if ( yinter == 0) {
            return "y = " + slope +"x"
        //y inter is pos
        }else if (Math.sqrt(yinter **2) == yinter){
            return "y = " + slope +"x + " + yinter
        //y inter is neg
        } else {
            return "y = " + slope +"x - " + Math.sqrt(yinter **2)
        }
    }
}