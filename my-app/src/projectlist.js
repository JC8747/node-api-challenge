import React, { useState, useEffect } from "react";
import axios from "axios";
import Styled from "styled-components";

const Cards = Styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;
const Card = Styled.div`
  margin: 3rem 5rem;
  padding: .75rem;
  border-radius: 1.5rem;
  background-color:#F48024;
`;

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4040/projects")
      .then(res => {
        console.log("res.data", res.data);
        setProjects(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Project List!</h1>
      <Cards>
        {projects.map(Project => (
          <Card>
            <h3>Name: {Project.name}</h3>
            <h3>Description: {Project.description}</h3>
          </Card>
        ))}
      </Cards>
    </div>
  );
};

export default ProjectList;