interface AddMovieButtonProps {
  onClick: () => void
}

export function AddMovieButton({ onClick }: AddMovieButtonProps) {
  return (
    // TODO: Implement a clickable button with label
    <div
    style={{
      cursor: "pointer",
      paddingTop: "7rem",
      paddingBottom: "7rem",
      textAlign: "center",
      width:'100%'
    }}
    onClick={onClick}
  >
    <div style={{ fontSize: "8rem" }}>+</div>
    <div className="button-label">Add</div>
  </div>
  );
}
