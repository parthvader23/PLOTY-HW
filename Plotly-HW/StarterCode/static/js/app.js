function buildMetadata(sample){
    d3.json("samples.json").then(function(data){
        var metadata = data.metadata;
        // var resultsArray = metadata.filter(function(data){
        //     return data.id == sample;
        // })
        var resultsArray = metadata.filter(sampleObj => sampleObj.id == sample);
        console.log(metadata);
        var result = resultsArray[0];
        var PANEL = d3.select("#sample-metadata");
        
​
​
        //Clear any existing data
        PANEL.html("");
​
        // Object.entries(result).forEach(function([key, value]){
        //     console.log(key, value);
​
        // })
​
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
          });
    })
}
​
function buildCharts(sample){
    d3.json("samples.json").then(function(data){
        var samples = data.samples;
        // var resultsArray = samples.filter(function(data){
        //    data.id == sample;
        // })
        var resultsArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = resultsArray[0];
​
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values
        
        
        //var otu_ids = result["otu_ids"];
        //var otu_labels = results["otu_labels"];
        //var sample_values = result["sample_values"];
        console.log(otu_ids);
        console.log(otu_labels);
        console.log(sample_values);
​
        // Builds Bubble Chart
        var bubblelayout = {
            title: "Bacteria Cultures Per Sample", 
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: { title: "OTU ID"},
            nargin: {t:30}
        }
        var bubbleData = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Earth"
                }
​
            }
        ];
        
        Plotly.newPlot("bubble", bubbleData, bubblelayout);
        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        // var yticks = otu_ids.slice(0,10).map(function(otuID){
        //     return 'otu ${otuID}';
        //  }).reverse();
​
​
         var barData = [
             {
                 y:yticks,
                 x:sample_values.slice(0,10).reverse(),
                 text:otu_labels.slice(0,10).reverse(),
                 type:"bar",
                 orientation: "h"
             }
         ];
​
         var barLayout = {
             title: "Top Bacteria Cultures Found",
             margin: {t: 30, l: 150}
         };
​
         Plotly.newPlot("bar", barData, barLayout)
    });
    }
​
​
​
​
function init(){
    //alert("Hello World!");
    // Grab a refrence to the drop down select element
    var selector = d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;
    
        sampleNames.forEach((sample) => {
            selector
            .append("option")
            .text(sample)
            .property("value", sample);
        });
​
        var firstSample = sampleNames[0];
        console.log(firstSample);
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
}
function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
}
​
​
​
​
​
​
​
// Intialize the dashboard
init();
​
