import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MySubjects from "../../components/ReviewerComponents/MySubjects";
import { SubjectFromDataBase } from "../../interfaces/SubjectInterfaces";
import { subjectService } from "../../services/subjectService";
import UserContext from "../../store/UserContext";
import useTokenStatus from "../../utils/useTokenStatus";
import { useNavigate } from "react-router";

const AssignedSubjects = () => {
  const navigate = useNavigate(),
    tokenStatus = useTokenStatus(),
    userContext = useContext(UserContext),
    [subjects, setSubjects] = useState<SubjectFromDataBase[]>([]);

  const handleSelectedSubject = (
    subject: SubjectFromDataBase,
    action: string
  ) => {
    if (action === "to-documents") {
      navigate(`/documents/${subject.id}`);
    } else if (action === "to-download") {
      navigate(`/scrapped-docs/${subject.id}`);
    }
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
    </Box>
  );
};

export default AssignedSubjects;
