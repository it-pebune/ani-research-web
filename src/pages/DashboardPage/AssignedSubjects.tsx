import { Box, Dialog } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DocumenstFromScrapperDialog from "../../components/ReviewerComponents/DocumenstFromScrapperDialog";

import MySubjects from "../../components/ReviewerComponents/MySubjects";
import ReviewerTabs from "../../components/ReviewerComponents/ReviewerTabs";
import { SubjectFromDataBase } from "../../interfaces/SubjectInterfaces";
import { subjectService } from "../../services/subjectService";
import UserContext from "../../store/UserContext";
import useTokenStatus from "../../utils/useTokenStatus";

const AssignedSubjects = () => {
  const [subjects, setSubjects] = useState<SubjectFromDataBase[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<SubjectFromDataBase>();
  const [documentsFromScrapperOpen, setDocumentsFromScrapperOpen] =
    useState(false);
  const tokenStatus = useTokenStatus();
  const userContext = useContext(UserContext);

  useEffect(() => {
    // console.log(subjects);
  }, [subjects]);

  const handleSelectedSubject = (subject: SubjectFromDataBase) => {
    console.log(subject);
    setDocumentsFromScrapperOpen(true);
    setSelectedSubject((prevData) => ({ ...prevData, ...subject }));
  };

  const handleDocumentAction = () => {};

  const handleDocumentsFromScrapperClose = () => {
    setDocumentsFromScrapperOpen(false);
  };

  useEffect(() => {
    // console.log(selectedSubject);
  }, [selectedSubject]);

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
    <Box>
      <MySubjects
        onSubjectSelected={handleSelectedSubject}
        subjects={subjects}
      ></MySubjects>

      <DocumenstFromScrapperDialog
        open={documentsFromScrapperOpen}
        subject={selectedSubject}
        onClose={handleDocumentsFromScrapperClose}
        onAction={handleDocumentAction}
      ></DocumenstFromScrapperDialog>
    </Box>
  );
};

export default AssignedSubjects;
