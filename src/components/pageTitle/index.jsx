import React from "react";

const PageTitle = React.memo(({ title }) => {
  return (
    <div className="pageTitle">
      <h1>{title}</h1>
    </div>
  );
});

export default PageTitle;
