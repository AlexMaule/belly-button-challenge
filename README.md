# belly-button-challenge

Build an interactive dashboard which catalogs the microbes that colonize the human navels.

# Data
The data was collected to study what different types of bacteria was found in the belly button.
The data is devided into 3 arrays: name, samples, and metadata.
 - name: ids of all the 153 participants.
 - samples: info about the bacterias for each id.
    * id
    * otu_ids: array with the values of the bacterias' ids.
    * otu_labels: array with the names of the bacterias' labels.
    * sample_values: amount of bacterias in the sample.
 - metadata: information about the participants.
    * id
    * ethnicity
    * gender
    * age
    * location
    * bbtype
    * wfreq

# Visualization
There are 4 visualizations in the website.
 
### Metadata Info
Information about the participant.

![metadata_info](https://user-images.githubusercontent.com/108903118/230400419-fd4b8f1f-b2af-4c4c-91f7-5a90183f1b49.jpg)

### Top 10 Samples Values
This visualization shows the ids and values of the 10 largest values of bacterias in this participant.
![Samples](https://user-images.githubusercontent.com/108903118/230401236-d4ce34f3-6400-42ed-acf4-df7d10b95cf7.png)

### Scrubs per Week
Number of times the participant wash their belly button per week.

![gauge](https://user-images.githubusercontent.com/108903118/230406967-dfd54edb-8346-45ea-85c4-7e145533ee1e.png)

### Bubble Graph
Shows the sample value of each bacteria by id.
![bubble](https://user-images.githubusercontent.com/108903118/230402339-65a92204-e51f-4194-8e45-12403bb7c18f.png)

# Reference
http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/
