import React from "react";

interface CheckBoxListProps {
  diseaseName: string;
  turns: number[];
}

const CheckBoxList = ({ diseaseName, turns }: CheckBoxListProps) => {
  console.log("diseaseName", diseaseName);
  console.log("turns", turns);
  return (
    <div>
      {turns.map((turn) => (
        <input key={turn} type="checkbox" />
      ))}
    </div>
  );
};

export default CheckBoxList;
