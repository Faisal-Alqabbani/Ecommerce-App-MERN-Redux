import React, { useState } from "react";

function SearchBox(props) {
  const [name, setName] = useState("");
  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="search" onSubmit={onSubmitHandler}>
      <div className="row">
        <input name="q" id="q" onChange={(e) => setName(e.target.value)} />
        <button className="primary" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}

export default SearchBox;
