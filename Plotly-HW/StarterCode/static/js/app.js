function buildMetadata(){
    d3.json("samples.json").then(function(data){
        var metadata = data.metadata;
        var resultsArray = metadata.filter(function(data){
            return data.id == sample;
        })
        console.log(metadata);
        var result = resultsArray[0];
        var PANEL = d3.select("#sample-metadata");
        


        //Clear any existing data
        PANEL.html("");

        Object.entries(result).forEach(function([key, value]){
            console.log(key, value);

        })
    })
}

function buildCharts(sample){
    d3.json("samples.json").then(function(data){
        var samples = data.samples;
        var resultsArray = samples.filter(function(data){
            return data.id === sample;
        })
        var result = resultsArray[0];

        var otu_ids = result.out_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values
        
        
        //var otu_ids = result["otu_ids"];
        //var otu_labels = results["otu_labels"];
        //var sample_values = result["sample_values"];
        console.log(otu_ids);
        console.log(otu_labels);
        console.log(sample_values);

        // Builds Bubble Chart
        var bubblelayout = {
            title: "Bacteria Cultures Per Sample", 
            hovermode: "closest",
            xaxis: { title: "OTU ID"},
            nargin: {t:30}
        }
        var bubbleData = [
            {
                x: otu_ids,
                y: sample_values
                text: otu_labels
                mode: "markers"
                marker: {
                    size: sample_values
                    color: out_ids,
                    colorscale: "Earth"
                }

            }
        ];
        
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        var yticks = out_ids.slice(0,10).map(function(otuID){
            return 'otu ${otuID}';
         }).reverse();


         var barData = [
             {
                 y:yticks
                 x:sample_values.slice(0,10).reverse(),
                 text:otu_labels.slice(0,10).reverse(),
                 type:"bar",
                 orientation: "h"
             }
         ];

         var barLayout = {
             title: "Top Bacteria Cultures Found",
             margin: [t: 30, l: 150]
         };

         Plotly.newPlot("bar", barData, barLayout)












    })
    }




function init(){
    alert("Hello World!");
    // Grab a refrence to the drop down select element
    var selector = d3.select("#selDataset")
    // Use the list of samples nakes to populate the select options
    d3.json("samples.json").then(function(data){
        console.log(data);
        var sampleNames = data.names;

        sampleNames.forEach(function(name){
            selector
            .append("option")
            .text(name)
            .property("value", name)
        })

        var firstSample = sampleNames[0];
        console.log(firstSample);
        buildCharts(firstSample);
        buildMetadata(firstSample);
    })
}



// Intialize the dashboard
init()

