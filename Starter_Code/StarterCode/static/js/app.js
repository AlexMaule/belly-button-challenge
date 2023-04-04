const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let samples;
let metadata;

// Promise Pending
d3.json(url).then(function(data) {

    samples = data.samples;
    metadata = data.metadata
    console.log("data: ",data);


    // d3.selectAll("#selDataset").on("change",getData);

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

        let layout = {
            xaxis: {
                title: "OTU ID"
            }
        }

        Plotly.newPlot("bubble", trace2, layout);

        // Metadata table
        let table = d3.select("#sample-metadata");

        let row0 = table.append("tr").attr("id","id");
        let row1 = table.append("tr").attr("id","ethnicity");
        let row2 = table.append("tr").attr("id","gender");
        let row3 = table.append("tr").attr("id","age");
        let row4 = table.append("tr").attr("id","location");
        let row5 = table.append("tr").attr("id","bbtype");
        let row6 = table.append("tr").attr("id","wfreq");

        row0.text(`id: ${metadata[0].id}`);
        row1.text(`ethnicity: ${metadata[0].ethnicity}`);
        row2.text(`gender: ${metadata[0].gender}`);
        row3.text(`age: ${metadata[0].age}`);
        row4.text(`location: ${metadata[0].location}`);
        row5.text(`bbtype: ${metadata[0].bbtype}`);
        row6.text(`wfreq: ${metadata[0].wfreq}`);
    
    };

    // Adding the ids to the dropdown
    let items = [];
    for (let i=0; i<samples.length; i++) {
        items.push(samples[i].id)
    };

    let dropdown = d3.select("select");

    for (let i = 0; i < items.length; i++) {
        dropdown.append("option").text(items[i]);
    };
    
    init();
});


function optionChanged(id) {

    for (let i=0; i<samples.length; i++) {
        if (String(samples[i].id) == id) {
            selected_id = samples[i];
        }
    };

    // Updating the Bar Chart

    updateBarChart(selected_id);

    // Updating the Bubble Chart

    updateBubbleChart(selected_id)

    // Updating the Metadata Chart

    updateMetadata(id)

};

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

function updateMetadata(id) {
    
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
};