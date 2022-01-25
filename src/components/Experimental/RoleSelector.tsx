import { Button, Tabs, Tab } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { userRoles } from '../../resources/userRoles';

import "./RoleSelector.css";

interface Props{
    rolesIds:number[],
    onRoleSelected: any
}


const RoleSelector: React.FC<Props> = ({rolesIds, onRoleSelected}) => {

    const [roles, setRoles] = useState<(string|undefined)[]>([]);
    const [currentRole, setCurrentRole] = useState<(number|undefined)>(0)

    const handleChange = (event:any, newValue:any) => {
        setCurrentRole(newValue)
        onRoleSelected(newValue)
    }

    useEffect(() => {
        if(rolesIds.length>0){
            const currentRoles = userRoles.map(role=>role.name).reverse();
            setRoles(currentRoles);
            setCurrentRole(0)
        }
    }, [rolesIds])

    return (
        <Tabs className='roles-selector' value={currentRole} onChange={handleChange}>
          {roles.map((role, index)=><Tab key={`tab-${index}`} label={role} />)}
        </Tabs>

    )
}

export default RoleSelector
