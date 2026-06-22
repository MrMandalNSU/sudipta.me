import React from "react";
import {
  Analytics as AnalyticsIcon,
  Article as ArticleIcon,
  AutoGraph as AutoGraphIcon,
  BarChart as BarChartIcon,
  Category as CategoryIcon,
  CleaningServices as CleaningServicesIcon,
  FactCheck as FactCheckIcon,
  Groups as GroupsIcon,
  Insights as InsightsIcon,
  Language as LanguageIcon,
  Psychology as PsychologyIcon,
  Public as PublicIcon,
  School as SchoolIcon,
  Science as ScienceIcon,
  Security as SecurityIcon,
  Storage as StorageIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material";

export const paperMeta = {
  title: "Social Media Opinion Mining Based on Bangla Public Post of Facebook",
  venue:
    "24th International Conference on Computer and Information Technology (ICCIT)",
  year: "2021",
  institution: "North South University",
  location: "Dhaka, Bangladesh",
  ieeeLink: "https://ieeexplore.ieee.org/document/9689860",
};

export const headlineStats = [
  {
    value: "11,006",
    label: "Bangla comments",
    helper: "Collected from public Facebook posts",
  },
  {
    value: "3",
    label: "Polarity classes",
    helper: "Positive, negative, and neutral",
  },
  {
    value: "8",
    label: "Sentiment labels",
    helper: "From appreciation to hate categories",
  },
  {
    value: "0.92",
    label: "Cohen's kappa",
    helper: "Almost-perfect annotation agreement",
  },
  {
    value: "82.60%",
    label: "Best accuracy",
    helper: "MNB with unigram TF-IDF features",
  },
  {
    value: "4",
    label: "Bangla annotators",
    helper: "Native speakers cross-validated labels",
  },
];

export const polarityDistribution = [
  { label: "Negative", value: 47.6, color: "#EF4444" },
  { label: "Neutral", value: 35.1, color: "#64748B" },
  { label: "Positive", value: 17.3, color: "#10B981" },
];

export const modelAccuracyTrend = [
  { label: "Unigram", value: 82.6 },
  { label: "Bigram", value: 81.33 },
  { label: "Trigram", value: 77.79 },
];

export const keywordCloudTerms = [
  { label: "Bangla NLP", weight: 1.45 },
  { label: "TF-IDF", weight: 1.25 },
  { label: "Opinion Mining", weight: 1.38 },
  { label: "Hate Speech", weight: 1.28 },
  { label: "Annotation", weight: 1.12 },
  { label: "MNB", weight: 1 },
  { label: "Facebook", weight: 1.08 },
  { label: "Corpus", weight: 1.18 },
  { label: "Sentiment", weight: 1.3 },
  { label: "Bangla Text", weight: 1.2 },
];

export const contributionCards = [
  {
    icon: <StorageIcon />,
    title: "Bangla Corpus Creation",
    desc: "Built a privacy-conscious corpus of 11,006 Bangla Facebook comments with reaction and reply metadata.",
  },
  {
    icon: <FactCheckIcon />,
    title: "Validated Annotation",
    desc: "Coordinated four native Bangla annotators and cross-validation, reaching a Cohen's kappa score of 0.92.",
  },
  {
    icon: <InsightsIcon />,
    title: "Demographic EDA",
    desc: "Compared comment polarity across gender, profession, and reaction patterns to reveal harassment trends.",
  },
  {
    icon: <PsychologyIcon />,
    title: "ML Benchmarking",
    desc: "Evaluated classic NLP classifiers over TF-IDF unigram, bigram, and trigram features for Bangla text.",
  },
];

export const datasetFacts = [
  {
    icon: <PublicIcon />,
    title: "Source",
    desc: "Public Facebook posts from Bangla public figures and celebrities.",
  },
  {
    icon: <GroupsIcon />,
    title: "Samples",
    desc: "Actors, actresses, players, religious leaders, politicians, singers, and social influencers.",
  },
  {
    icon: <SecurityIcon />,
    title: "Privacy",
    desc: "Names and profile links were excluded; only comments plus reaction and reply counts were retained.",
  },
  {
    icon: <VerifiedIcon />,
    title: "Validation",
    desc: "Four native Bangla speakers annotated and cross-checked the dataset.",
  },
];

export const annotationCategories = [
  {
    category: "Positive",
    label: "Wishful thinking",
    count: 967,
    percent: "8.8%",
  },
  { category: "Positive", label: "Appreciation", count: 942, percent: "8.6%" },
  {
    category: "Negative",
    label: "Gender-based hate",
    count: 525,
    percent: "4.8%",
  },
  {
    category: "Negative",
    label: "Religious hate",
    count: 731,
    percent: "6.6%",
  },
  {
    category: "Negative",
    label: "Political hate",
    count: 572,
    percent: "5.2%",
  },
  {
    category: "Negative",
    label: "Personal hate",
    count: 1995,
    percent: "18.1%",
  },
  { category: "Negative", label: "Sarcasm", count: 1414, percent: "12.8%" },
  { category: "Neutral", label: "Neutral", count: 3860, percent: "35.1%" },
];

export const methodologySteps = [
  {
    icon: <PublicIcon />,
    label: "Data Collection",
    text: "Collected Bangla comments from public Facebook posts using Instant Data Scraper and compiled comment, reaction, and reply fields.",
  },
  {
    icon: <FactCheckIcon />,
    label: "Annotation",
    text: "Mapped each comment into positive, negative, or neutral polarity, then into finer sentiment labels based on content.",
  },
  {
    icon: <VerifiedIcon />,
    label: "Validation",
    text: "Cross-checked labels between annotators and measured agreement with Cohen's kappa, reaching 0.92.",
  },
  {
    icon: <CleaningServicesIcon />,
    label: "Bangla Cleaning",
    text: "Removed punctuation, Bangla stop words, and sample names using BNLP, BLTK, and Fatick Stemmer workflows.",
  },
  {
    icon: <CategoryIcon />,
    label: "Feature Extraction",
    text: "Encoded labels and transformed text with TF-IDF using unigram, bigram, and trigram feature ranges.",
  },
  {
    icon: <ScienceIcon />,
    label: "Classification",
    text: "Compared Logistic Regression, Decision Tree, Random Forest, MNB, KNN, SVM variants, and XGBoost on a 90/10 split.",
  },
];

export const analysisFindings = [
  {
    title: "Class Distribution",
    value: "47.6%",
    label: "Negative comments",
    desc: "The corpus contained 47.6% negative, 17.3% positive, and 35.1% neutral comments.",
  },
  {
    title: "Gendered Harassment",
    value: "10.81%",
    label: "Gender hate on female pages",
    desc: "Female public-figure pages received far more gender-based hate than male pages, where the same category was 0.69%.",
  },
  {
    title: "Religious Hate Gap",
    value: "13.33%",
    label: "Female sample rate",
    desc: "Religious hate appeared at 13.33% for female samples compared with 2.12% for male samples.",
  },
  {
    title: "Profession Pattern",
    value: "896",
    label: "Personal-hate comments on actresses",
    desc: "Actresses received 896 personal-hate comments and 505 gender-based-hate comments in the profession analysis.",
  },
];

export const modelRows = [
  {
    model: "Logistic Regression",
    unigram: "80.20",
    bigram: "77.37",
    trigram: "76.52",
    note: "Strong precision on trigram features",
  },
  {
    model: "Decision Tree",
    unigram: "76.80",
    bigram: "79.07",
    trigram: "78.50",
    note: "Tree baseline for sparse TF-IDF vectors",
  },
  {
    model: "Random Forest",
    unigram: "78.93",
    bigram: "79.77",
    trigram: "78.93",
    note: "Stable but not highest performing",
  },
  {
    model: "Multinomial NB",
    unigram: "82.60",
    bigram: "81.33",
    trigram: "77.79",
    note: "Best overall accuracy on unigram features",
  },
  {
    model: "KNN",
    unigram: "80.48",
    bigram: "80.91",
    trigram: "79.63",
    note: "Best trigram accuracy",
  },
  {
    model: "Linear SVM",
    unigram: "76.80",
    bigram: "75.25",
    trigram: "74.82",
    note: "Lower recall than MNB and KNN",
  },
  {
    model: "RBF SVM",
    unigram: "78.36",
    bigram: "76.52",
    trigram: "75.53",
    note: "Best bigram precision in the paper",
  },
  {
    model: "XGBoost",
    unigram: "76.94",
    bigram: "76.66",
    trigram: "76.52",
    note: "Competitive but below MNB",
  },
];

export const featureSizes = [
  { label: "Unigram", value: "22,873", desc: "TF-IDF features" },
  { label: "Bigram", value: "124,897", desc: "TF-IDF features" },
  { label: "Trigram", value: "242,286", desc: "TF-IDF features" },
];

export const futureWork = [
  "Enrich the dataset with more Bangla social-media comments and broader sentiment diversity.",
  "Develop a language model suited to noisy Bangla social-media text.",
  "Democratize the dataset and trained models for future online-safety research.",
];

export const tocSections = [
  { id: "overview", label: "Overview" },
  { id: "dataset", label: "Dataset" },
  { id: "methodology", label: "Methodology" },
  { id: "analysis", label: "Analysis" },
  { id: "results", label: "Results" },
  { id: "publication", label: "Publication" },
];

export const researchChips = [
  { icon: <ArticleIcon />, label: "ICCIT 2021" },
  { icon: <LanguageIcon />, label: "Bangla NLP" },
  { icon: <AnalyticsIcon />, label: "Opinion Mining" },
  { icon: <AutoGraphIcon />, label: "TF-IDF" },
  { icon: <BarChartIcon />, label: "ML Benchmark" },
  //{ icon: <SchoolIcon />, label: "North South University" },
];
