export const checkRequired = (vaccineNames: string[]): [boolean, boolean] => {
  return [
    vaccineNames.some(
      (name) => !!name && !(name.includes("인플루엔자") || name.includes("사람유두종바이러스") || name.includes("PPSV"))
    ),
    vaccineNames.some(
      (name) => !!name && (name.includes("인플루엔자") || name.includes("사람유두종바이러스") || name.includes("PPSV"))
    )
  ];
};
