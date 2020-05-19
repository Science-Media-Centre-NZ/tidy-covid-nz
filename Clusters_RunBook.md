# Clusters

## How to run?

### Run two files daily:

1. To save daily cluster webpage to raw folder

```
- Open the COVID-19 Project in RStudio by clicking on *.Rproj
- Open R Scripts/01_clusters_save_daily_html.Rmd
- Click Run all or Knit the file
- Path for raw data: "data/moh/clusters/raw/"
```

2. Batch process any newly added excel and html file

```
- Open the COVID-19 Project in RStudio by clicking on *.Rproj
- Open R Scripts/02_clusters_batch_process.Rmd
- Click Run all or Knit the file
- Every time an html or excel file is processed using this script, the names are saved in "data/moh/clusters/raw/processed_status.csv"
- The script R Scripts/02_batch_process.Rmd identifies any newly added html or excel files in the raw folder and process those
```