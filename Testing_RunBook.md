# Testing

## How to run?

### Run one file when required:

1. Batch process any newly added html file

```
- Open the COVID-19 Project in RStudio by clicking on *.Rproj
- Open R Scripts/04_testing_rate_batch_process.Rmd
- Click Run all or Knit the file
- Every time an html file is processed using this script, the names are saved in "data/moh/testing/raw/processed_status.csv"
- The script R Scripts/04_testing_rate_batch_process.Rmd identifies any newly added html files in the raw folder and processes those
```

Note: Scripts/03_testing_rate_oneoff.Rmd is written to process the raw file "data/moh/testing/raw/testing_2020_04_18.html" because the format of the tables in this html file is very different from all the other html files that were published at later dates.