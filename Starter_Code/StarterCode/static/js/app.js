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

    // console.log(sample_values);
    // console.log(otu_ids);
    // console.log(otu_labels);

});