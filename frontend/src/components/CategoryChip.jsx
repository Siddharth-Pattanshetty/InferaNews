export default function CategoryChip({ category, isActive, onClick }) {
  return (
    <button
      onClick={() => onClick?.(category)}
      className={`chip ${isActive ? 'chip-active' : ''}`}
    >
      {category}
    </button>
  );
}
