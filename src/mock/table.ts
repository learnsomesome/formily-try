export const fetchData = (): Promise<any[]> => {
  // 模拟异步数据源
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          {
            bookingTime: new Date(),
            attendingCenter: "EMC24",
            checkInType: "aga",
            referral: "N/A",
          },
          {
            bookingTime: new Date(),
            attendingCenter: "EMC24",
            attendingDoctor: "Dr LEUNG Siu Ting Barry",
            checkInType: "Staff Vaccine Program",
            referral: "N/A",
            staffNo: "123",
            vaccinePackage: "C",
          },
        ]),
      100
    );
  });
};

export const fetchTypes = (): Promise<any[]> => {
  // 模拟异步数据源
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          { value: "Dressing" },
          { value: "aga" },
          { value: "temp" },
          { value: "con99" },
          { value: "Staff Vaccine Program" },
          { value: "VSS Program" },
        ]),
      100
    );
  });
};

export const fetchDoctors = (): Promise<any[]> => {
  // 模拟异步数据源
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          { value: "Dr Chen" },
          { value: "Dr Wang" },
          { value: "Dr Zhen" },
          { value: "Dr Deng" },
          { value: "Dr Su" },
          { value: "Dr Meng" },
        ]),
      100
    );
  });
};

export const fetchTemplates = (): Promise<any[]> => {
  // 模拟异步数据源
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          { value: "A" },
          { value: "B" },
          { value: "C" },
          { value: "D" },
          { value: "E" },
          { value: "F" },
        ]),
      100
    );
  });
};

export const getProgrameSetting = (): Promise<any> => {
  // 模拟异步数据源
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          doctorId: "Dr Wang",
        }),
      100
    );
  });
};
