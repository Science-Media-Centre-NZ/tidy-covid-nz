# Tidy Covid NZ

Tidy-Covid-NZ compiles and standardises data releases about the spread of the Covid-19 virus in Aotearoa New Zealand. The goal is to clean and format the various data releases according to [Tidy Data principles](https://cran.r-project.org/web/packages/tidyr/vignettes/tidy-data.html). 

This repository has the following structure.

```
/R scripts/
/data/
  moh/
    caselists/
      raw/
      tidy/
    clusters/
      raw/
      tidy/
```

There are three key directories:

- `R scripts/` contains the code used to translate raw data releases
- `data/moh/caselists/raw/` contains unmodified case list data, as released by the Ministry of Health each afternoon
- `data/moh/caselists/tidy/` contains tidy, standardised versions of each case list release.


## Getting Started

If you're interested in the datasets, we recommend you work directly with the csv files in `data/moh/caselists/tidy/`. 

- Tidied case list filenames follow a `caselist_YEAR-MONTH-DATE.csv` pattern.
- The directory also contains configuration files that describe the raw-to-tide transformations for each dataset. These filenames follow a `columnNames_YEAR-MONTH-DATE.csv` naming scheme.

### Data notes

The May 4, 2020 raw Excel file has a misleading filename. It is titled: `covid-casedeatils-4april2020.xlsx`

The actual April 4 file is: `covid-19-case-details-update-4-april-2020.xlsx`
