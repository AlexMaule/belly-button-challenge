const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let samples;

// Promise Pending
d3.json(url).then(function(data) {

    samples = data.samples;
    console.log("samples: ",samples);

    // d3.selectAll("#selDataset").on("change",getData);

    let selected_id = samples[0];

    let sample_values = selected_id.sample_values.slice(0,10);
    sample_values.reverse();
    let otu_ids = selected_id.otu_ids.slice(0,10);
    otu_ids.reverse();
    let otu_labels = selected_id.otu_labels.slice(0,10);
    otu_labels.reverse();

    otu_ids = otu_ids.map(id => `OTU ${id}`);

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

    };

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

    console.log(selected_id);

    sample_values = selected_id.sample_values.slice(0,10);
    sample_values.reverse();
    otu_ids = selected_id.otu_ids.slice(0,10);
    otu_ids.reverse();
    otu_labels = selected_id.otu_labels.slice(0,10);
    otu_labels.reverse();

    otu_ids = otu_ids.map(id => `OTU ${id}`);

    console.log(sample_values);
    console.log(otu_ids);
    console.log(otu_labels);

    Plotly.restyle("bar", "x",[sample_values]);
    Plotly.restyle("bar", "y",[otu_ids]);
    Plotly.restyle("bar", "hovertext",[otu_labels]);

};