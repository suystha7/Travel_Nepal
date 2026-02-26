"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const PDFViewerWrapper = dynamic(() => import("./PDFViewerWrapper"), {
  ssr: false,
  loading: () => <div className="text-center py-4">Loading PDF viewer...</div>,
});

const DownloadItineraryPage = () => {
  const [pdfData, setPdfData] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedData = localStorage.getItem("pdf_itinerary_data");
    if (savedData) {
      try {
        setPdfData(JSON.parse(savedData));
      } catch (error) {
        console.error("Error parsing PDF data", error);
      }
    }
  }, []);

  if (!isClient || !pdfData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500 animate-pulse">
          Preparing your itinerary...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-white">
          <h1 className="text-xl font-bold text-gray-800">Preview Itinerary</h1>
        </div>

        <div className="h-[80vh] w-full">
          <PDFViewerWrapper pdfData={pdfData} />
        </div>
      </div>
    </div>
  );
};

export default DownloadItineraryPage;
