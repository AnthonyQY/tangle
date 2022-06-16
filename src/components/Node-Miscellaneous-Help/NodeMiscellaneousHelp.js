import "./NodeMiscellaneousHelp.css"

function NodeMiscellaneousHelp() {
  return (
    <div className="node--miscellaneous--help">
      <label className="node--miscellaneous--help--label">Help Guide</label>
      <p className="node--miscellaneous--help--line">Scroll to zoom in and out.</p>
      <p className="node--miscellaneous--help--line">Click and drag on a blank area to pan the view.</p>
      <p className="node--miscellaneous--help--line">Right-Click (RMB) to add nodes via context menu.</p>
      <p className="node--miscellaneous--help--line">Press Enter (ENTER) to force an update of all nodes.</p>
      <p className="node--miscellaneous--help--line">Nodes can be left-click (LMB) dragged by the bottom-most border. Including this one!</p>
      <p className="node--miscellaneous--help--line">Do NOT connect more than one (1) output to a single (1) input node.</p>
      <p className="node--miscellaneous--help--line">Nodes can be deleted using the backspace (BACKSPACE) key, after selecting a node by left-clicking (LMB) on its bottom-most border.</p>
      <div className="node--miscellaneous--help--category">
        <label className="node--miscellaneous--help--category--label">MISCELLANEOUS</label>
      </div>
    </div>
  );
}

export default NodeMiscellaneousHelp;
