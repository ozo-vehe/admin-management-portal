export const formatDate = (date: string | Date): string => {
  try {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "";

    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = parsedDate.getFullYear();

    // return {
      // day,
      // year,
      // month,
    // };
    return day;
  } catch (error) {
    return "";
  }
};
