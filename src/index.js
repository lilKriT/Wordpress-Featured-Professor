import "./index.scss";

wp.blocks.registerBlockType("fprof/featured-professor", {
  title: "Professor Callout",
  description: "Include a featured block of your professor",
  icon: "welcome-learn-more",
  category: "common",
  attributes: {
    profID: { type: "string" },
  },
  edit: EditComponent,
  save: function () {
    return null;
  },
});

function EditComponent(props) {
  return (
    <div className="featured-professor-wrapper">
      <div className="professor-select-container">
        <select
          onChange={(e) => {
            props.setAttributes({ profID: e.target.value });
            console.log(e.target.value);
          }}
        >
          <option value="">Select a professor</option>
          <option value="1" selected={props.attributes.profID == 1}>
            1
          </option>
          <option value="2" selected={props.attributes.profID == 2}>
            2
          </option>
          <option value="3" selected={props.attributes.profID == 3}>
            3
          </option>
        </select>
      </div>
      <div>The HTML preview of the selected professor will appear here.</div>
    </div>
  );
}
