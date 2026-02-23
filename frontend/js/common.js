// Common helpers for frontend pages
const API_BASE = "http://localhost:8000/api";

function getPageFromUrl(url) {
  if (!url) return null;
  const m = url.match(/[?&]page=(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

function renderPagination(containerSelector, data, onPageClick) {
  const $c = $(containerSelector);
  $c.empty();
  if (!data) return;
  const pageSize =
    data.results && data.results.length ? data.results.length : 1;
  const totalPages = Math.max(1, Math.ceil((data.count || 0) / pageSize));
  let currentPage = 1;
  if (data.next) {
    const nextPage = getPageFromUrl(data.next);
    if (nextPage) currentPage = nextPage - 1;
  } else if (data.previous) {
    const prevPage = getPageFromUrl(data.previous);
    if (prevPage) currentPage = prevPage + 1;
  }

  const $nav = $('<nav aria-label="Page navigation"></nav>');
  const $ul = $('<ul class="pagination"></ul>');

  const $prev = $(
    `<li class="page-item ${!data.previous ? "disabled" : ""}"><a class="page-link" href="#">Previous</a></li>`,
  );
  $prev.on("click", function (e) {
    e.preventDefault();
    if (data.previous) {
      const p = getPageFromUrl(data.previous) || currentPage - 1;
      onPageClick(p);
    }
  });
  $ul.append($prev);

  // show up to 7 pages centered on current
  const maxPagesToShow = 7;
  let start = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let end = Math.min(totalPages, start + maxPagesToShow - 1);
  if (end - start + 1 < maxPagesToShow)
    start = Math.max(1, end - maxPagesToShow + 1);

  for (let i = start; i <= end; i++) {
    const active = i === currentPage ? "active" : "";
    const $li = $(
      `<li class="page-item ${active}"><a class="page-link" href="#">${i}</a></li>`,
    );
    $li.on(
      "click",
      (function (page) {
        return function (e) {
          e.preventDefault();
          if (page !== currentPage) onPageClick(page);
        };
      })(i),
    );
    $ul.append($li);
  }

  const $next = $(
    `<li class="page-item ${!data.next ? "disabled" : ""}"><a class="page-link" href="#">Next</a></li>`,
  );
  $next.on("click", function (e) {
    e.preventDefault();
    if (data.next) {
      const p = getPageFromUrl(data.next) || currentPage + 1;
      onPageClick(p);
    }
  });
  $ul.append($next);

  $nav.append($ul);
  $c.append($nav);
}
