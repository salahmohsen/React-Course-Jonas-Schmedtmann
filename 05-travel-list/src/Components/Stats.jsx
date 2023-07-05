export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packaging list.</em>
      </p>
    );
  const itemsNums = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentatge = Math.round((packedItems / itemsNums) * 100);
  return (
    <footer className="stats">
      <em>
        {percentatge === 100
          ? "You got everything! Ready to go ✈️"
          : `You have ${itemsNums} items on your list, and you already packed ${packedItems} (${percentatge}%)`}
      </em>
    </footer>
  );
}
