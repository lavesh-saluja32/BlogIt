import React, { useState, useEffect } from "react";

import { Button } from "@bigbinary/neetoui";
import FileSaver from "file-saver";
import { useParams } from "react-router-dom";

import postsApi from "../../apis/posts";
import createConsumer from "../../channels/consumer";
import { subscribeToReportDownloadChannel } from "../../channels/reportDownloadChannel";
import ProgressBar from "../commons/ProgressBar";

const DownloadPostReport = () => {
  const [loading, setLoading] = useState(false);
  // const [generatePdfLoading, setGeneratePdfLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const consumer = createConsumer();

  const { slug } = useParams();

  const generatePdf = async () => {
    setMessage("Generating report...");
    // setTimeout(() => {
    //   setGeneratePdfLoading(false);
    // }, 5000);

    try {
      await postsApi.generatePdf(slug);
    } catch (error) {
      logger.error(error);
      setMessage("Failed to generate report.");
      setLoading(false);
    }
  };

  const downloadPdf = async () => {
    setLoading(true);
    setMessage("Downloading report...");
    setProgress(10);

    try {
      const response = await postsApi.downloadPdf(slug);
      FileSaver.saveAs(response.data, "post_report.pdf");
      setMessage("Download complete!");
    } catch (error) {
      logger.error("Error downloading report:", error);
      setMessage("Report not found. Please generate it first.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    subscribeToReportDownloadChannel({
      consumer,
      setMessage,
      setProgress,
      generatePdf,
    });

    return () => {
      consumer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setLoading(false);
      setMessage("Report is ready to be downloaded");
    }
  }, [progress]);

  return (
    <div className="rounded-lg border bg-white p-4 shadow-md">
      <h2 className="mb-2 text-lg font-semibold">Download Post Report</h2>
      <p className="text-gray-600">{message}</p>
      {loading && (
        <div className="my-3">
          <ProgressBar {...{ progress }} />
        </div>
      )}
      <div className="mt-4 space-x-2">
        <Button
          className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          // disabled={generatePdfLoading}
          onClick={downloadPdf}
        >
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default DownloadPostReport;
