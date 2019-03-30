import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Card from "../../components/Card/Card";
import LoggingTable from "../../components/Logging/Logging";
import getPlantName from "../../components/Logging/logging_get_plant_name";
import getRobotName from "../../components/Logging/logging_get_robot_name";
import httpFetchLogs from "../../http/fetch_logs";

const Logging = props => {

  const {reduxPlants, reduxRobots} = props;
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const { loginToken } = props;
    const fetchLogsResult = await httpFetchLogs(loginToken);

    if (!(fetchLogsResult instanceof Error)) {
      const { entries } = fetchLogsResult;
      setLogs(entries);
    }
  };

  return (
    <div className="content">
      <Card
        title={"Robot Logs"}
        content={
          <LoggingTable logs={logs} reduxPlants={reduxPlants} getPlantName={getPlantName} reduxRobots={reduxRobots} getRobotName={getRobotName} />
        }
      />
    </div>
  );
};

const mapStateToProps = props => {
  const { plants } = props.plantState;
  const { robots, selectedRobot } = props.robotState;
  const { loginToken } = props.auth;
  return {
    loginToken,
    selectedRobot,
    reduxRobots: robots,
    reduxPlants: plants
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logging);
