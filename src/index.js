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
        We will have a select dropdown here.
      </div>
      <div>The HTML preview of the selected professor will appear here.</div>
    </div>
  );
}
