window.onload = function(){
    
    var w = 900, h = 500;
    
    var container = d3.select("body") 
    .append("svg")
    .attr("width",w)
    .attr("height",h)
    .attr("class","container")
    .style("background-color", "rgba(0,0,0,0.2)");
    console.log(container);
    
    /* rect is now the operand of the container block */
    
    var innerRect = container.append("rect")
    /* this puts a rectangle in the svg */
        .datum(400)
        .attr("width",function(d){
            return d * 2 // 400 * 2 = 800
        })
        .attr("height",function(d) {
            return d; // 400
        })
        .attr("class","innerRect")
        .attr("x",50) // position from left
        .attr("y",50) // position from top
        .style("fill","#FFFFFF"); // fill color
    
    console.log(innerRect);
    
};

