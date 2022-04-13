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

export const allMenuItems = [
  {
    icon: "people",
    text: "Utilizatori",
    link: "/users",
  },
  {
    icon: "people",
    text: "Subiecti",
    link: "/subjects",
  },
  {
    icon: "recent_actors",
    text: "Subiectii asignati",
    link: "/assigned-subjects",
  },
  {
    icon: "grading",
    text: "Analizeaza PDF",
    link: "/review-pdf",
  },
  {
    icon: "privacy_tip",
    text: "Modifica termeni si conditii",
    link: "/modify-terms",
  },
  {
    icon: "vpn_lock",
    text: "Modifica politica GDPR",
    link: "/modify-gdpr",
  },
];
