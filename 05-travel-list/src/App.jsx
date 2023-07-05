import { useState } from "react";
import Logo from "./Components/Logo";
import Form from "./Components/Form";
import PackingList from "./Components/PackingList";
import Stats from "./Components/Stats";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    if (id === "DELETE-ALL-ITEMS") {
      const confirmed = confirm("Are you sure you want to delete all items?");
      if (confirmed) {
        setItems([]);
        return;
      }
    }
    setItems(items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteButton={handleDeleteItems}
        onToggleButton={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}
