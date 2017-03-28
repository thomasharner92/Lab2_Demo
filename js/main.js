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
    
    var dataArray = [10,20,30,40,50];
    
    // Wisconsin population array
    var cityPop = [
        { 
            city: 'Madison',
            population: 233209
        },
        {
            city: 'Milwaukee',
            population: 594833
        },
        {
            city: 'Green Bay',
            population: 104057
        },
        {
            city: 'Superior',
            population: 27244
        }
    ];
    
    /*
    Creates a generator (function) that is used to decide where in the range each output value lies based on each input datum sent to it. 
    */
    // Create scale above circles block
    var x = d3.scaleLinear() // create scale
        .range([90,750]) // min and max output
        .domain([0,3]) // input min and max
    console.log(x)
    
    // Figure out min/max, craete y scale
    
    var maxPop = d3.max(cityPop, function(d){
        return d.population;
    });
    
    var minPop = d3.min(cityPop, function(d){
        return d.population;
    })
    
    var y = d3.scaleLinear() // create scale
    .range([440, 95])
    .domain([
        //minPop,
        //maxPop
        0, 700000
    ]);
    
    var color = d3.scaleLinear() // color scale
        .range([
            "#FDBE85",
            "#D94701"
        ])
        .domain([
            minPop,
            maxPop
        ]);
        
    
    
    
    
    // Select all creates an empty selection, which
    // needs to be done to create elements from the array
    var circles = container.selectAll(".circles")
    .data(cityPop)
    .enter() // join data to the selection (loops)
    .append("circle") // add circle for each datum
    .attr("class","circles") //class name for circles
    .attr("id",function(d){
        console.log(d.city);
        return d.city;
    })
    .attr("r",function(d){
        console.log(d.population)
        // calculate radius ased on pop data for circle
        var area = d.population * 0.01;
        return Math.sqrt(area/Math.PI);
    })
    .attr("cx",function(d,i){ // x coord
        // Use index to place horizontally
        //return 90 + (i * 180);
        // Scale generator w/ index to place circles
        return x(i); // place circles based on range
    })
    .attr("cy",function(d){ // y coord
        // use index to place vertically
        //return 450 - (d.population * .0005);
        return y(d.population);
    })
    .style("fill",function(d,i){ // fill based on color
        return color(d.population);
    })
    .style("stroke","#000"); // black circle stroke
    
    
    var yAxis = d3.axisLeft()
        .scale(y);
    
    //create axis g element and add axis
    var axis = container.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(50,0)")
        .call(yAxis);
    
    var title = container.append("text")
        .attr("class","title")
        .attr("text-anchor", "middle")
        .attr("x",450)
        .attr("y",30)
        .text("City Population");
    
    // Add labels to circles
    var labels = container.selectAll(".labels")
        .data(cityPop)
        .enter()
        .append("text")
        .attr("class","labels")
        .attr("text-anchor","left")
        .attr("y",function(d){
            // vertical position centered on each circle
            return y(d.population) + 5;
        });
    
    // Format population number
    var format = d3.format(",");
    
    // first line of label
    var nameLine = labels.append("tspan")
        .attr("class","nameLine")
        .attr("x", function(d,i){
            // horizontal position to right of circle
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
            
        })
        .text(function(d){
            return d.city;
        });
    
    var popLine = labels.append("tspan")
        .attr("class","popLine")
        .attr("x",function(d,i){
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .attr("dy",15) // vertical offset
        .text(function(d){
            return "Pop. " + format(d.population);
        });

    
    
};

