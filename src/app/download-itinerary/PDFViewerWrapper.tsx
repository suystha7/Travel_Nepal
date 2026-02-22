"use client";

import React, { Suspense } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import PdfGenerator from "@/components/pdf/ItineraryPDF";

interface PDFViewerWrapperProps {
  pdfData: any;
}

const PDFViewerWrapper: React.FC<PDFViewerWrapperProps> = ({ pdfData }) => {
  return (
    <Suspense fallback={<div className="text-center py-4">Loading PDF...</div>}>
      <PDFViewer width="100%" height="100%" className="border-none">
        <PdfGenerator data={pdfData} />
      </PDFViewer>
    </Suspense>
  );
};

export default PDFViewerWrapper;
