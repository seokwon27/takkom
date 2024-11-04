const VaccinateTag = ({ mode }: { mode: string }) => {
  return (
    <div
      className={` ${
        mode === "무료" ? "bg-primary-80 text-primary-400" : "bg-[#E2FFD0] text-[#22CE00]"
      }  w-[76px] h-[38px] p-2 rounded-sm`}
    >
      <p className="font-semibold">{`${mode} 접종`}</p>
    </div>
  );
};

export default VaccinateTag;
