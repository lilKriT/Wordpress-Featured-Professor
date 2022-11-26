import { useSelect } from "@wordpress/data";
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
  const allProfessors = useSelect((select) => {
    return select("core").getEntityRecords("postType", "professor", {
      per_page: -1,
    });
  });

  console.log(allProfessors);

  if (allProfessors == undefined) return <p>Loading...</p>;

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
          {allProfessors.map((el) => {
            return (
              <option value={el.id} selected={props.attributes.profID == el.id}>
                {el.title.rendered}
              </option>
            );
          })}
        </select>
      </div>
      <div>The HTML preview of the selected professor will appear here.</div>
    </div>
  );
}
