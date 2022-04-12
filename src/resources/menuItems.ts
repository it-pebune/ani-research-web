import { MenuItem } from "../interfaces/MenuItemInterface";
import { UserRoles } from "../enums/UsersEnums";

export const rolesToMenuItems: Record<number, MenuItem[]> = {
  [UserRoles.ADMIN]: [
    {
      icon: "people",
      text: "Utilizatori",
      link: "/users",
    },
  ],
  [UserRoles.COORDINATOR]: [
    {
      icon: "people",
      text: "Subiecti",
      link: "/subjects",
    },
  ],
  [UserRoles.RESEARCHER]: [],
};

export const defaultMenuItems: MenuItem[] = [
  {
    icon: "privacy_tip",
    text: "Termeni si conditii",
    link: "/terms",
  },
  {
    icon: "vpn_lock",
    text: "Politica GDPR",
    link: "/gdpr",
  },
];
