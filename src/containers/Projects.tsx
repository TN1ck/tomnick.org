import React from "react";
import { withRouteData, Link } from "react-static";
import { Project } from "../types";

interface Props {
  projects: Project[];
}

export default withRouteData(({ projects }: Props) => (
  <div>
    <h1>Personal projects</h1>
    {projects.map((project, i) =>  {
      const projectBefore = projects[i - 1];
      const showYear = !projectBefore || projectBefore.attributes.year !== project.attributes.year;
      return (
        <div>
          {showYear ? <h2>{project.attributes.year}</h2> : null}
          <div className="post">
            <video loop muted poster={project.attributes.preview} autoPlay>
              <source type="video/mp4" src={project.attributes.video} />
            </video>
            <h3>{project.attributes.title}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: project.body,
              }}
            />
          </div>
        </div>
      );
    })}
  </div>
));
