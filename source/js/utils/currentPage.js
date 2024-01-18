const currentPath = window.location.pathname;

let currentPage;

try {
  currentPage = currentPath.match(/\/([^\/]+)\.html$/)[1];
} catch (error) {
  currentPage = '/';
}

export default currentPage;
