import { userRoles } from "../resources/userRoles";

export const userRoleConvertor = (roleId: number): string | undefined =>
  userRoles.find((elem) => elem.id === roleId)?.name;
