import "./ContextMenu.css";
export const ContextMenu = ({
  triggered,
  xPos,
  yPos,
  contentMenuRef,
  buttons,
}) => {
  return (
    <menu
      style={{ top: yPos, left: xPos }}
      className={`context-menu ${triggered ? "triggered" : ""}`}
      ref={contentMenuRef}
    >
      {buttons.map((button, buttonIndex) => (
        <button onClick={button.onClick}>{button.label}</button>
      ))}
    </menu>
  );
};
