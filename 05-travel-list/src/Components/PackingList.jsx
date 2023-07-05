import { useState } from "react";
import Item from "./Item";

export default function PackingList({ items, onDeleteButton, onToggleButton }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = [...items].sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  if (sortBy === "packed")
    sortedItems = [...items].sort(
      (a, b) => Number(b.packed) - Number(a.packed)
    );

  function handleClearList() {
    return onDeleteButton("DELETE-ALL-ITEMS");
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteButton={onDeleteButton}
            onToggleButton={onToggleButton}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed</option>
        </select>
        <button onClick={(e) => handleClearList(e)}>Clear List</button>
      </div>
    </div>
  );
}
