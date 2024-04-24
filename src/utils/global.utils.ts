export const stdRes = (
  success: boolean,
  res: string | Record<string, unknown>,
) => {
  if (typeof res === "string") {
    return {
      success,
      message: res,
    };
  }
  return {
    success,
    data: res,
  };
};
