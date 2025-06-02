export const fetchLists = async () => {
  try {
    const res = await fetch("https://apis.ccbp.in/list-creation/lists");
    const data = await res.json();
    return data.lists || [];
  } catch (err) {
    console.error("Failed to fetch lists:", err);
    return [];
  }
};
