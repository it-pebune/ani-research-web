import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DocumentsListDialog from "../../components/ReviewerComponents/DocumentsListDialog";
import MySubjects from "../../components/ReviewerComponents/MySubjects";
import { SubjectFromDataBase } from "../../interfaces/SubjectInterfaces";
import { subjectService } from "../../services/subjectService";
import UserContext from "../../store/UserContext";
import useTokenStatus from "../../utils/useTokenStatus";
import { useNavigate } from "react-router";

const AssignedSubjects = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<SubjectFromDataBase[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<SubjectFromDataBase>();
  const [documentsListOpen, setDocumentsListOpen] = useState(false);
  const tokenStatus = useTokenStatus();
  const userContext = useContext(UserContext);

  const handleSelectedSubject = (
    subject: SubjectFromDataBase,
    action: string
  ) => {
    setSelectedSubject((prevData) => ({ ...prevData, ...subject }));
    if (action === "to-documents") {
      setDocumentsListOpen(true);
    } else if (action === "to-download") {
      navigate(`/scrapped-docs/${subject.id}`);
    }
  };

  const handleDocumentFromListAction = () => {};

  const handleDocumentsListClose = () => {
    setDocumentsListOpen(false);
  };

  useEffect(() => {
    if (tokenStatus.active) {
      const subjectsResponse = async () => {
        const response = await subjectService.getSubjectsFromDataBase({
          ...tokenStatus,
        });
        if (response && response.length > 0) {
          setSubjects(
            response
              .filter((item) => item.deleted === 0)
              .filter((item) => item.assignedToId === userContext.id)
          );
        }
      };
      subjectsResponse();
    }
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <MySubjects
        onSubjectSelected={handleSelectedSubject}
        subjects={subjects}
      />

      <DocumentsListDialog
        open={documentsListOpen}
        subject={selectedSubject}
        onClose={handleDocumentsListClose}
        onAction={handleDocumentFromListAction}
      />
    </Box>
  );
};

export default AssignedSubjects;
