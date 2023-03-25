import React, { useState } from "react";

import "./List.css";

const initData = [
  "0.26909024349689203",
  "0.37228829129778673",
  "0.5653412778597389",
];

const List = () => {
  const [list, setList] = useState<string[]>(initData);

  const add = () => setList((prev) => [...prev, Math.random().toString()]);

  const remove = (index: number) =>
    setList((prev) => prev.filter((_, i) => i !== index));

  return (
    <div className="list">
      <button onClick={add}>Add item</button>
      {list.map((str, index) => (
        <div key={index} onClick={() => remove(index)}>
          {str}
        </div>
      ))}
    </div>
  );
};

export default List;
