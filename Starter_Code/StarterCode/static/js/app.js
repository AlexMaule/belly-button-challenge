const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// creating variables for the relevant datasets.
let samples;
let metadata;
let names;

// Promise Pending
d3.json(url).then(function(data) {

    // assigning Samples, Metadata, and Names.
    samples = data.samples;
    metadata = data.metadata;
    names = data.names;
    
    console.log("Samples: ",samples);
    console.log("metadata: ",metadata);

    let selected_id = samples[0];

    let sample_values = selected_id.sample_values.slice(0,10);
    sample_values.reverse();
    let otu_ids = selected_id.otu_ids.slice(0,10);
    otu_ids.reverse();
    let otu_labels = selected_id.otu_labels.slice(0,10);
    otu_labels.reverse();

    otu_ids = otu_ids.map(id => `OTU ${id} `);

    // Default plots with the first id.
    function init() {

        // Bar chart
        let trace = [{
            x: sample_values,
            y: otu_ids,
            hovertext: otu_labels,
            type: "bar",
            orientation: "h"
        }];
    
        Plotly.newPlot("bar", trace);

        // Bubble Chart
        sample_values = selected_id.sample_values;
        otu_ids = selected_id.otu_ids;
        otu_labels = selected_id.otu_labels;

        let trace2 = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                opacity: 0.75,
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth",
                sizeref: 1.32
            }
        }];

        // Adding a title for the Bubble X-axis
        let layout = {
            xaxis: {
                title: "OTU ID"
            }
        }

        // Plotting the Bubble chart
        Plotly.newPlot("bubble", trace2, layout);

        // Metadata table
        let table = d3.select("#sample-metadata");

        // Creating rows in the Metadata Info table with ids for updating.
        let row0 = table.append("tr").attr("id","id");
        let row1 = table.append("tr").attr("id","ethnicity");
        let row2 = table.append("tr").attr("id","gender");
        let row3 = table.append("tr").attr("id","age");
        let row4 = table.append("tr").attr("id","location");
        let row5 = table.append("tr").attr("id","bbtype");
        let row6 = table.append("tr").attr("id","wfreq");

        // inserting the initial values for the first id in the dataset.
        row0.text(`id: ${metadata[0].id}`);
        row1.text(`ethnicity: ${metadata[0].ethnicity}`);
        row2.text(`gender: ${metadata[0].gender}`);
        row3.text(`age: ${metadata[0].age}`);
        row4.text(`location: ${metadata[0].location}`);
        row5.text(`bbtype: ${metadata[0].bbtype}`);
        row6.text(`wfreq: ${metadata[0].wfreq}`);

        // Plotting the Gauge Chart
        let trace3 = [{
            value : metadata[0].wfreq,
            ids: ["0-1","1-2","2-3","3-4","4-5","5-6","6-7","7-8","8-9"],
            direction: "clockwise",
            textinfo: "text",
            textposition: "inside",
            title: {text: `Scrubs per Week`}, // <h1>Belly Button Washing Frequency</h1> <h> <h3>Scrubs per Week</h3>
            type: "indicator",
            mode: "gauge",
            gauge:{
                axis:{range:[0,9]},
                steps: [
                    {range: [0,1], color: "white"},
                    {range: [1,9], color: "cyan"}
                ],
                ticklabelstep: 1,
                ticks: "outside"
            },
            labels: ["0-1","1-2","2-3","3-4","4-5","5-6","6-7","7-8","8-9"]
        }];

        let trace4 = [{
            type: "indicator",
            mode: "gauge",
            value : metadata[0].wfreq,
            title: {text: "Scrubs per Week"},
            gauge:{
                axis:{
                    range:[0,9],
                    ticks: "",
                    ticktext: ["1","2","3","4","5","6","7","8","9"],
                    tickvals: [1,2,3,4,5,6,7,8,9],
                    
                },
                bar: {color:"#D2691E"},
                steps: [
                    {range: [0,1], color: "#ebfaeb"},
                    {range: [1,2], color: "#d6f5d6"},
                    {range: [2,3], color: "#adebad"},
                    {range: [3,4], color: "#85e085"},
                    {range: [4,5], color: "#70db70"},
                    {range: [5,6], color: "#47d147"},
                    {range: [6,7], color: "#2eb82e"},
                    {range: [7,8], color: "#248f24"},
                    {range: [8,9], color: "#196619"},
                ],
                
            },
            
        }];

        let layout3 = {
            title: {
                text: "<b>Belly Button Washing Frequency</b>",
                yanchor: "top"
            },
            annotations: [{
                xanchor: "center",
                yanchor:"bottom",
                yshift: -100,
                showarrow:true,
                arrowcolor: "red",
                arrowsize: 1,
                arrowhead: 3,
                valign: "bottom"
            }]
        };
        Plotly.newPlot('gauge',trace4);

    };

    // Adding the ids to the dropdown
    let dropdown = d3.select("select");

    for (let i = 0; i < names.length; i++) {
        dropdown.append("option").text(names[i]);
    };
    
    init();
});

//------------------------------------------------------------------------------------------------------------------------------
// Function for changing the ID and the visualizations.

function optionChanged(id) {

    for (let i=0; i<samples.length; i++) {
        if (String(samples[i].id) == id) {
            selected_id = samples[i];
        }
    };

    // Updating the Bar Chart

    updateBarChart(selected_id);

    // Updating the Bubble Chart

    updateBubbleChart(selected_id);

    // Updating the Metadata Info and Gauge Chart

    updateMetadataAndGauge(id);

};

//------------------------------------------------------------------------------------------------------------------------------
// Function to Update Bar Chart.

function updateBarChart(selected_id) {

    // Setting the variables.
    sample_values = selected_id.sample_values.slice(0,10);
    sample_values.reverse();
    otu_ids = selected_id.otu_ids.slice(0,10);
    otu_ids.reverse();
    otu_labels = selected_id.otu_labels.slice(0,10);
    otu_labels.reverse();

    otu_ids = otu_ids.map(id => `OTU ${id} `);

    // Restyling the Plot.
    Plotly.restyle("bar", "x",[sample_values]);
    Plotly.restyle("bar", "y",[otu_ids]);
    Plotly.restyle("bar", "hovertext",[otu_labels]);
};

//------------------------------------------------------------------------------------------------------------------------------
// Function to Update Bubble Chart.

function updateBubbleChart(selected_id) {

    // Setting the variables.
    sample_values = selected_id.sample_values;
    otu_ids = selected_id.otu_ids;
    otu_labels = selected_id.otu_labels;

    // Restyling the Plot.
    Plotly.restyle("bubble", "x", [otu_ids]);
    Plotly.restyle("bubble", "y", [sample_values]);
    Plotly.restyle("bubble", "text", [otu_labels]);
    Plotly.restyle("bubble", "size", [sample_values]);
    Plotly.restyle("bubble", "marker.color", [otu_ids]);
};

//------------------------------------------------------------------------------------------------------------------------------
// Function to Update the Metadata Info.

function updateMetadataAndGauge(id) {
    
    // Loop through the metadata to find the specific id.
    for (let j=0; j<metadata.length; j++) {
        if (metadata[j].id == id) {
            selected_metadata = metadata[j];
        }
    };

    // Update Metadata Info
    d3.select("#id").text(`id: ${selected_metadata.id}`);
    d3.select("#ethnicity").text(`ethnicity: ${selected_metadata.ethnicity}`);
    d3.select("#gender").text(`gender: ${selected_metadata.gender}`);
    d3.select("#age").text(`age: ${selected_metadata.age}`);
    d3.select("#location").text(`location: ${selected_metadata.location}`);
    d3.select("#bbtype").text(`bbtype: ${selected_metadata.bbtype}`);
    d3.select("#wfreq").text(`wfreq: ${selected_metadata.wfreq}`);

    // Update Gauge info
    Plotly.restyle("gauge","value", selected_metadata.wfreq)
};

//------------------------------------------------------------------------------------------------------------------------------
