"use client";

const VaccineList = () => {
  return (
    <div>
      백신 리스트
      <div className="flex flex-wrap gap-3">
        {/* {vaccineList?.map((item) => {
          return (
            <div key={item.id} className="border-[1px] gap-2 w-56 p-3">
              <p>{item.disease_name}</p>
              {item.description}
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default VaccineList;
