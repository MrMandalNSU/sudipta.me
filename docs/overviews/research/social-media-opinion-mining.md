# Social Media Opinion Mining Based on Bangla Public Post of Facebook

This document captures the content model for the research detail page at
`/research/social-media-opinion-mining`. The temporary PDF in `public/temp`
is source material only and must not be linked from the shipped site.

## Publication

- Title: Social Media Opinion Mining Based on Bangla Public Post of Facebook
- Venue: 24th International Conference on Computer and Information Technology (ICCIT)
- Year: 2021
- Institution: North South University, Dhaka
- Official link: https://ieeexplore.ieee.org/document/9689860

## Research Summary

The paper studies opinion mining, sentiment classification, and hate-speech
patterns in Bangla public Facebook comments. It targets a low-resource NLP
setting where Bangla lacks the volume of mature corpora and language resources
available for English and other high-resource languages.

The research contributes a labeled Bangla social-media corpus, annotation
quality validation, demographic exploratory analysis, and traditional machine
learning baselines using TF-IDF features.

## Dataset And Annotation

- Dataset size: 11,006 Bangla comments.
- Source: public Facebook posts from Bangla celebrities and public figures.
- Sample groups: actors, actresses, players, religious leaders, politicians,
  singers, and social media influencers.
- Privacy handling: names and profile links were excluded; comments, reaction
  counts, and reply counts were retained.
- Annotators: four native Bangla speakers.
- Agreement: Cohen's kappa of 0.92.

Annotation classes:

- Positive: wishful thinking, appreciation.
- Negative: gender-based hate, religious hate, political hate, personal hate,
  sarcasm.
- Neutral: neutral.

Distribution:

- Negative: 47.6%.
- Positive: 17.3%.
- Neutral: 35.1%.

## Methodology

The research pipeline:

1. Collect public Facebook comments using Instant Data Scraper.
2. Annotate comments into polarity and sentiment subcategory labels.
3. Cross-validate labels among annotators.
4. Clean Bangla text using BNLP, BLTK, and Fatick Stemmer workflows.
5. Remove punctuation, Bangla stop words, and sample names.
6. Tokenize text and encode labels.
7. Extract TF-IDF unigram, bigram, and trigram features.
8. Train and evaluate traditional ML classifiers with a 90/10 split.

Feature sizes:

- Unigram: 22,873.
- Bigram: 124,897.
- Trigram: 242,286.

## Exploratory Analysis Highlights

- Female public-figure pages received substantially more negative comments than
  male pages.
- Gender-based hate appeared at 10.81% on female sample pages and 0.69% on male
  sample pages.
- Religious hate appeared at 13.33% on female sample pages and 2.12% on male
  sample pages.
- Actresses received 896 personal-hate comments and 505 gender-based-hate
  comments in the profession analysis.

## Model Results

Classifiers evaluated:

- Logistic Regression.
- Decision Tree.
- Random Forest.
- Multinomial Naive Bayes.
- K-Nearest Neighbors.
- Linear SVM.
- RBF SVM.
- XGBoost.

Best reported result:

- Model: Multinomial Naive Bayes.
- Feature type: unigram TF-IDF.
- Accuracy: 82.60%.
- Precision: 81.74%.
- Recall: 82.60%.
- F1-score: 81.56%.

## Future Work

- Enrich the dataset with more Bangla comments and broader sentiment diversity.
- Develop a language model for noisy Bangla social-media text.
- Release datasets and models publicly for safer-cyberspace research.
