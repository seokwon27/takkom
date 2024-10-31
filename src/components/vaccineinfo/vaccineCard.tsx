import React from "react";

const vaccineCard = ({
  disease,
  vaccine,
  target,
  process
}: {
  disease: string;
  vaccine: string;
  target: string;
  process: string;
}) => {
  return (
    <div>
      <div>
        <p>{disease}</p>
        <p>{vaccine}</p>
      </div>
      <div>
        <p>{target}</p>
        <p>{process}</p>
      </div>
    </div>
  );
};

export default vaccineCard;
