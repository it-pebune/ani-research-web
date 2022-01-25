import { Icon, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Filters } from "../../interfaces/UserInterfaces";
import "./UsersFiltersOverview.css";

interface Props {
  filters: Filters;
  onFiltersChanged: any;
}

const UsersFIltersOverview: React.FC<Props> = ({
  filters,
  onFiltersChanged,
}) => {
  const [hasFilters, setHasFilters] = useState(false);

  const handleClearStatus = () => {
    const newFilters = {
        ...filters,
        statusFilters:[]    
    }
    onFiltersChanged(newFilters)
  };

  const handleClearRoles = () => {
    const newFilters = {
        ...filters,
        roleFilters:[]    
    }
    onFiltersChanged(newFilters)
  };

  const handleClearPeriod = () => {
      const newFilters = {
          ...filters,
          lastDateFilter:{logged:null, period:""}
      }
      onFiltersChanged(newFilters)
  };

  const handleClearAll = () => {
     onFiltersChanged( {statusFilters:[], roleFilters:[], lastDateFilter:{logged:null, period:""}})
  };

  useEffect(() => {
    if (
      filters.statusFilters.length === 0 &&
      filters.roleFilters.length === 0 &&
      filters.lastDateFilter.period === ""
    ) {
      setHasFilters(false);
    } else {
      setHasFilters(true);
    }
  }, [filters]);

  return (
    <div
      style={{
        height: "50px",
        boxSizing: "border-box",
        alignItems: "center",
        display: hasFilters ? "flex" : "none",
        padding: "0 24px",
      }}
    >
      {filters.statusFilters.length > 0 && (
        <div className="filter-overview-container">
          <div className="filter-overview-title">STATUS</div>
          <div className="filter-overview-list">
            {filters.statusFilters.map((item) => (
              <div>
                {item === 0 && (
                  <span>
                    <Icon
                      sx={{
                        color: "green",
                        fontSize: "10px",
                        marginRight: "8px",
                      }}
                    >
                      radio_button_checked
                    </Icon>
                    in asteptare
                  </span>
                )}
                {item === 1 && (
                  <span>
                    <Icon
                      sx={{
                        color: "green",
                        fontSize: "10px",
                        marginRight: "8px",
                      }}
                    >
                      radio_button_checked
                    </Icon>
                    activi
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="filter-overview-action">
            <IconButton onClick={handleClearStatus}>
              <Icon>close</Icon>
            </IconButton>
          </div>
        </div>
      )}
      {filters.roleFilters.length > 0 && (
        <div className="filter-overview-container">
          <div className="filter-overview-title">ROLURI</div>
          <div className="filter-overview-list">
            {filters.roleFilters.map((item) => (
              <div>
                {item === 10 && (
                  <span>
                    <Icon
                      sx={{
                        color: "green",
                        fontSize: "10px",
                        marginRight: "8px",
                      }}
                    >
                      radio_button_checked
                    </Icon>
                    Researcher
                  </span>
                )}
                {item === 70 && (
                  <span>
                    <Icon
                      sx={{
                        color: "green",
                        fontSize: "10px",
                        marginRight: "8px",
                      }}
                    >
                      radio_button_checked
                    </Icon>
                    Reviewer
                  </span>
                )}
                {item === 150 && (
                  <span>
                    <Icon
                      sx={{
                        color: "green",
                        fontSize: "10px",
                        marginRight: "8px",
                      }}
                    >
                      radio_button_checked
                    </Icon>
                    Coordinator
                  </span>
                )}
                {item === 250 && (
                  <span>
                    <Icon
                      sx={{
                        color: "green",
                        fontSize: "10px",
                        marginRight: "8px",
                      }}
                    >
                      radio_button_checked
                    </Icon>
                    Admin
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="filter-overview-action">
            <IconButton onClick={handleClearRoles}>
              <Icon>close</Icon>
            </IconButton>
          </div>
        </div>
      )}
      {filters.lastDateFilter.period !== "" && (
        <div className="filter-overview-container">
          <div className="filter-overview-title">
            {filters.lastDateFilter.logged === 0 && <>NU </>}S-AU LOGAT IN
            ULTIMELE {filters.lastDateFilter.period} ZILE
          </div>
          <div className="filter-overview-action">
            <IconButton onClick={handleClearPeriod}>
              <Icon>close</Icon>
            </IconButton>
          </div>
        </div>
      )}
      <IconButton
        onClick={handleClearAll}
        color="error"
        sx={{
          border: "2px solid red",
          height: "32px",
          width: "32px",
          marginTop: "16px",
          position: "absolute",
          right: "24px",
        }}
      >
        <Icon sx={{ fontSize: "18" }}>close</Icon>
      </IconButton>
    </div>
  );
};

export default UsersFIltersOverview;
