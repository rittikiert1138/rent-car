export const getThreeNumber = (_unit: string) => {
  const s = _unit.split("");
  const resultList: any = [];
  for (let i = 0; i <= 5; i++) {
    if (i === 0) {
      const checkDuplicate = resultList.find((e: any) => e === s[0] + s[1] + s[2]);
      if (!checkDuplicate) {
        resultList.push(s[0] + s[1] + s[2]);
      }
    } else if (i === 1) {
      const checkDuplicate = resultList.find((e: any) => e === s[0] + s[2] + s[1]);
      if (!checkDuplicate) {
        resultList.push(s[0] + s[2] + s[1]);
      }
    } else if (i === 2) {
      const checkDuplicate = resultList.find((e: any) => e === s[1] + s[0] + s[2]);
      if (!checkDuplicate) {
        resultList.push(s[1] + s[0] + s[2]);
      }
    } else if (i === 3) {
      const checkDuplicate = resultList.find((e: any) => e === s[1] + s[2] + s[0]);
      if (!checkDuplicate) {
        resultList.push(s[1] + s[2] + s[0]);
      }
    } else if (i === 4) {
      const checkDuplicate = resultList.find((e: any) => e === s[2] + s[0] + s[1]);
      if (!checkDuplicate) {
        resultList.push(s[2] + s[0] + s[1]);
      }
    } else if (i === 5) {
      const checkDuplicate = resultList.find((e: any) => e === s[2] + s[1] + s[0]);
      if (!checkDuplicate) {
        resultList.push(s[2] + s[1] + s[0]);
      }
    }
  }
  return resultList;
};

export const numberWithCommas = (x: any) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
