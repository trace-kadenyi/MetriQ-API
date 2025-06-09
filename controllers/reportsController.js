const Report = require("../models/ReportSchema");

const createReport = async (req, res) => {
  try {
    // Extract data from request body
    const {
      url,
      scores: { mobile: mobileScores, desktop: desktopScores },
      metrics: { mobile: mobileMetrics, desktop: desktopMetrics },
    } = req.body;

    // Check if the report with the given URL already exists
    let existingReport = await Report.findOne({ url });

    if (existingReport) {
      // If the report exists, update it with new data
      const updatedReport = await Report.findByIdAndUpdate(
        existingReport._id,
        {
          $set: {
            scores: {
              mobile: mobileScores,
              desktop: desktopScores,
            },
            metrics: {
              mobile: {
                FCP: {
                  value: mobileMetrics.FCP.value,
                  status: mobileMetrics.FCP.status,
                },
                LCP: {
                  value: mobileMetrics.LCP.value,
                  status: mobileMetrics.LCP.status,
                },
                FID: {
                  value: mobileMetrics.FID.value,
                  status: mobileMetrics.FID.status,
                },
                CLS: {
                  value: mobileMetrics.CLS.value,
                  status: mobileMetrics.CLS.status,
                },
                speedIndex: {
                  value: mobileMetrics.speedIndex.value,
                  status: mobileMetrics.speedIndex.status,
                },
                TBT: {
                  value: mobileMetrics.TBT.value,
                  status: mobileMetrics.TBT.status,
                },
              },
              desktop: {
                FCP: {
                  value: desktopMetrics.FCP.value,
                  status: desktopMetrics.FCP.status,
                },
                LCP: {
                  value: desktopMetrics.LCP.value,
                  status: desktopMetrics.LCP.status,
                },
                FID: {
                  value: desktopMetrics.FID.value,
                  status: desktopMetrics.FID.status,
                },
                CLS: {
                  value: desktopMetrics.CLS.value,
                  status: desktopMetrics.CLS.status,
                },
                speedIndex: {
                  value: desktopMetrics.speedIndex.value,
                  status: desktopMetrics.speedIndex.status,
                },
                TBT: {
                  value: desktopMetrics.TBT.value,
                  status: desktopMetrics.TBT.status,
                },
              },
            },
          },
        },
        { new: true }
      );

      return res.status(200).json({
        message: "Report updated successfully",
        report: updatedReport,
      });
    }

    // If no existing report, create a new one
    const newReport = new Report({
      url,
      scores: {
        mobile: mobileScores,
        desktop: desktopScores,
      },
      metrics: {
        mobile: {
          FCP: {
            value: mobileMetrics.FCP.value,
            status: mobileMetrics.FCP.status,
          },
          LCP: {
            value: mobileMetrics.LCP.value,
            status: mobileMetrics.LCP.status,
          },
          FID: {
            value: mobileMetrics.FID.value,
            status: mobileMetrics.FID.status,
          },
          CLS: {
            value: mobileMetrics.CLS.value,
            status: mobileMetrics.CLS.status,
          },
          speedIndex: {
            value: mobileMetrics.speedIndex.value,
            status: mobileMetrics.speedIndex.status,
          },
          TBT: {
            value: mobileMetrics.TBT.value,
            status: mobileMetrics.TBT.status,
          },
        },
        desktop: {
          FCP: {
            value: desktopMetrics.FCP.value,
            status: desktopMetrics.FCP.status,
          },
          LCP: {
            value: desktopMetrics.LCP.value,
            status: desktopMetrics.LCP.status,
          },
          FID: {
            value: desktopMetrics.FID.value,
            status: desktopMetrics.FID.status,
          },
          CLS: {
            value: desktopMetrics.CLS.value,
            status: desktopMetrics.CLS.status,
          },
          speedIndex: {
            value: desktopMetrics.speedIndex.value,
            status: desktopMetrics.speedIndex.status,
          },
          TBT: {
            value: desktopMetrics.TBT.value,
            status: desktopMetrics.TBT.status,
          },
        },
      },
    });

    const savedReport = await newReport.save();

    return res.status(201).json({
      message: "Report created successfully",
      report: savedReport,
    });
  } catch (error) {
    console.error("Error creating or updating report:", error);
    return res.status(500).json({
      message: "Failed to create or update report",
      error: error.message,
    });
  }
};

module.exports = {
  createReport,
};
