import { Card } from "@mui/material";

interface UserProfileBodyProps {
  notes: string[] | undefined;
}

const UserProfileBody = (props: UserProfileBodyProps) => {
  return <>{props.notes && props.notes.map((note) => <Card>{note}</Card>)}</>;
};

export default UserProfileBody;
