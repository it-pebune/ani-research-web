import { Paper } from "@mui/material";
import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

interface Props {
  path: string;
}

const PdfPreviewComponent: React.FC<Props> = ({ path }) => {
  const onDocumentLoadSuccess = (response: any) => {};

  return (
    <Paper elevation={2} sx={{ m: "16px", ml: "8px", overflow: "auto" }}>
      <Document
        file={path}
        onLoadSuccess={onDocumentLoadSuccess}
        options={{
          cMapUrl: "cmaps/",
          cMapPacked: true,
        }}
      >
        <Page pageNumber={1} scale={1.2} />
        <Page pageNumber={2} scale={1.2} />
      </Document>
    </Paper>
  );
};

export default PdfPreviewComponent;
