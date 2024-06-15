export default function handlePagination(
  total: number,
  currentPage: number,
  setTotal: (value: number) => void,
  setNumberOfPages: (value: number) => void,
  setCurrentPage: (value: number) => void,
  fetchData: (page: number, search: string) => void
) {
  // Calculate the new total after deletion
  const newTotal = total - 1;
  setTotal(newTotal);

  // Calculate the new number of pages based on the new total and items per page
  const newNumberOfPages = Math.ceil(newTotal / 5);
  setNumberOfPages(newNumberOfPages);

  // If the current page exceeds the new number of pages, reset to the first page
  if (currentPage > newNumberOfPages) {
    setCurrentPage(1);
  } else {
    // If the current page still exists, fetch the data for the current page
    if (currentPage !== newNumberOfPages) {
      fetchData(currentPage, '');
    } else {
      setCurrentPage(currentPage);
    }
  }
}
