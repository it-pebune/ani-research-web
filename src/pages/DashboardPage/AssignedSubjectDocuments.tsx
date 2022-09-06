import React, { ReactElement, useEffect, useState } from "react";
import { Box } from "@mui/material";
import SearchBarWithFiltersController from "../../components/Shared/SearchBarWithFiltersController";
import { useParams } from "react-router";
import useTokenStatus from "../../utils/useTokenStatus";
import { DocumentFromDataBase } from "../../interfaces/DocumentInterfaces";
import { documentService } from "../../services/documentsServices";
import Loader from "../../components/Shared/Loader";

export const AssignedSubjectDocuments: React.FC = (): ReactElement => {
  const tokenStatus = useTokenStatus(),
    subjectId = useParams().subjectId as unknown as number,
    [loading, setLoading] = useState<boolean>(false),
    [documents, setDocuments] = useState<DocumentFromDataBase[]>([]),
    [visibleDocuments, setVisibleDocuments] = useState<DocumentFromDataBase[]>(
      []
    );

  useEffect((): void => {
    const loadDocuments = async (): Promise<void> => {
      setLoading(true);

      const loadedDocuments = await documentService.getDocumentsFromDataBase({
        ...tokenStatus,
        subjectId,
      });

      setLoading(false);

      setDocuments(loadedDocuments);
      setVisibleDocuments(loadedDocuments);
    };

    loadDocuments();
  }, [subjectId]);

  return (
    <>
      {loading && <Loader />}

      {!loading && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ p: "16px" }}>
            <SearchBarWithFiltersController
              onFiltersOpen={() => {}}
              onSearchChanged={() => {}}
            />
          </Box>
        </Box>
      )}
    </>
  );
};
