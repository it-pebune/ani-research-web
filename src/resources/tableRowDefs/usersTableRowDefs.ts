import { RowCell } from "../../interfaces/TableRowDefinitionInterface"


export const usersTableRowDefs:RowCell[]=[
    {
        cellType: "avatar",
        altField: "displayName",
        field: "profileImageUrl"
    },
    {
        cellType: "text",
        fields: [{name:"displayName", weight:"bold"}, {name:"email"}],
        align: "justify"
    },
    {
        cellType: "text",
        fields: [{name:"role"}],
        align: "center"
    },
    {
        cellType: "date",
        dateFormat: "DD.MM.YYYY",
        field: "lastLogin",
        align: "center"
    },
    {
        cellType: "conditional-chip",
        field: "role",
        ifExistsText: "Activ" ,
        ifNotExistsText: "In asteptare"
    },
    {
        cellType: "dropdown-button",
        menuItems: [{action: "modify-roles", text:"Modifica roluri"}, {action: "blacklist", text:"Blacklist"}, {action: "delete", text:"Sterge"}]
    }
]