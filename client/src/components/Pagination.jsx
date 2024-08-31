/* eslint-disable react/prop-types */
import Button from "./common/Button";


const Pagination = (props) => { 
  const pages = [];

  for (let i = 1; i <= props.totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      <div aria-label="Pagination" className="inline-flex space-x-2">
        {pages.map((page) => (
          <Button
            onClick={() => props.onPageChange(page)}
            variant={props.currentPage === page ? "white" : "ghost"}
            label={page.toString()}
            key={page}
          />
        ))}
      </div>
    </div>
  );
};

export default Pagination;