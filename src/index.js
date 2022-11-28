import { useSelect } from "@wordpress/data";
import { useState, useEffect } from "react";
import apiFetch from "@wordpress/api-fetch";
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
  const [thePreview, setThePreview] = useState("");

  useEffect(() => {
    if (props.attributes.profID) {
      updateTheMeta();

      async function go() {
        const response = await apiFetch({
          path: `featuredProfessor/v1/getHTML?profID=${props.attributes.profID}`,
          method: "GET",
        });
        setThePreview(response);
      }

      go();
    }
  }, [props.attributes.profID]);

  useEffect(() => {
    return () => {
      updateTheMeta();
    };
  }, []);

  function updateTheMeta() {
    const profsForMeta = wp.data
      .select("core/block-editor")
      .getBlocks()
      .filter((p) => p.name == "fprof/featured-professor")
      .map((x) => x.attributes.profID)
      .filter((x, index, arr) => {
        return arr.indexOf(x) == index;
      });

    profsForMeta.forEach((el, index) => {
      console.log(index);
      wp.data
        .dispatch("core/editor")
        .editPost({ meta: { featuredProfessor: profsForMeta[index] } });
    });
  }

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
      <div dangerouslySetInnerHTML={{ __html: thePreview }}></div>
    </div>
  );
}
