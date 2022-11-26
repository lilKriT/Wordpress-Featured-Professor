import "./index.scss";

wp.blocks.registerBlockType("fprof/featured-professor", {
  title: "Professor Callout",
  description: "Include a featured block of your professor",
  icon: "welcome-learn-more",
  category: "common",
  edit: EditComponent,
  save: function () {
    return null;
  },
});

function EditComponent() {
  return (
    <div className="featured-professor-wrapper">
      <div className="professor-select-container">
        <select>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div>The HTML preview of the selected professor will appear here.</div>
    </div>
  );
}
