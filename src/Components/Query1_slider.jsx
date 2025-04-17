function Query1_slider({count, setCount, className, htmlFor, label, maxValue}) {
    return (
      <div className={className}>
        <input
          type="range"
          id={htmlFor}
          name={label}
          min="2"
          max={maxValue}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          step="1" />
        <label htmlFor={htmlFor}>{label}: {count}</label>
      </div>
    );
  }
  
  export default Query1_slider;  