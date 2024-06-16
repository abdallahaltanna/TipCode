export default function handlePagination(
  total: number,
  currentPage: number,
  setTotal: (value: number) => void,
  setNumberOfPages: (value: number) => void,
  setCurrentPage: (value: number) => void,
  search: string,
  fetchData: (page: number, search: string) => void
) {
  // Calculate the new total after deletion
  const newTotal = total - 1;
  setTotal(newTotal);

  // Calculate the new number of pages based on the new total and items per page
  const newNumberOfPages = Math.ceil(newTotal / 5);
  setNumberOfPages(newNumberOfPages);

  // Determine the new current page
  let newPage = currentPage;

  // If the current page is greater than the new number of pages, go back to the previous page
  if (currentPage > newNumberOfPages) {
    newPage = newNumberOfPages;

    // If the current page is less than 1, set it to 1
    if (newPage < 1) {
      newPage = 1;
    }

    // Update the current page state
    setCurrentPage(newPage);
  } else {
    // Fetch data for the current page with the search term
    fetchData(newPage, search);
  }
}
