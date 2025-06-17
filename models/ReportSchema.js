const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    url: { type: String, required: true }, // URL being reported
    scores: {
      mobile: {
        performance: { type: Number, required: true },
        accessibility: { type: Number, required: true },
        seo: { type: Number, required: true },
        bestPractices: { type: Number, required: true },
      },
      desktop: {
        performance: { type: Number, required: true },
        accessibility: { type: Number, required: true },
        seo: { type: Number, required: true },
        bestPractices: { type: Number, required: true },
      },
    },
    metrics: {
      mobile: {
        "Largest Contentful Paint": {
          value: { type: String, required: true }, // Largest Contentful Paint value
          status: { type: String, required: true }, // Status of LCP
        },
        "First Contentful Paint": {
          value: { type: String, required: true }, // First Contentful Paint value
          status: { type: String, required: true }, // Status of FCP
        },

        "First Input Delay": {
          value: { type: String, required: true }, // First Input Delay value
          status: { type: String, required: true }, // Status of FID
        },
        "Cumulative Layout Shift": {
          value: { type: String, required: true }, // Cumulative Layout Shift value
          status: { type: String, required: true }, // Status of CLS
        },
        "Speed Index": {
          value: { type: String, required: true }, // Speed Index value
          status: { type: String, required: true }, // Status of Speed Index
        },
        "Total Blocking Time": {
          value: { type: String, required: true }, // Total Blocking Time value
          status: { type: String, required: true }, // Status of TBT
        },
      },
      desktop: {
        "Largest Contentful Paint": {
          value: { type: String, required: true }, // Largest Contentful Paint value
          status: { type: String, required: true }, // Status of LCP
        },
        "First Contentful Paint": {
          value: { type: String, required: true }, // First Contentful Paint value
          status: { type: String, required: true }, // Status of FCP
        },

        "First Input Delay": {
          value: { type: String, required: true }, // First Input Delay value
          status: { type: String, required: true }, // Status of FID
        },
        "Cumulative Layout Shift": {
          value: { type: String, required: true }, // Cumulative Layout Shift value
          status: { type: String, required: true }, // Status of CLS
        },
        "Speed Index": {
          value: { type: String, required: true }, // Speed Index value
          status: { type: String, required: true }, // Status of Speed Index
        },
        "Total Blocking Time": {
          value: { type: String, required: true }, // Total Blocking Time value
          status: { type: String, required: true }, // Status of TBT
        },
      },
    },
    suggestions: {
      mobile: [
        {
          title: { type: String, required: true },
          displayValue: { type: String }, // Can be null or empty sometimes
          description: { type: String },
          score: { type: Number },
        },
      ],
      desktop: [
        {
          title: { type: String, required: true },
          displayValue: { type: String },
          description: { type: String },
          score: { type: Number },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
