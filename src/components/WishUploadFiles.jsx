/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

export default function WishUploadFiles({ addButtonTitle, hideUploadButton }) {
  const [addedfiles, setFiles] = useState([]);

  const addFiles = function (files) {
    let selectedFiles = [];
    for (let index = 0; index < files.length; index++) {
      selectedFiles.push(files[index].name);
    }

    setFiles([...addedfiles, ...selectedFiles]);
  };

  const removeFile = function (index) {
    var array = [...addedfiles]; // make a separate copy of the array
    if (index !== -1) {
      array.splice(index, 1);
      setFiles(array);
    }
  };

  const filesList = function () {
    return (
      <>
        <ul className="list-group file-list">
          {addedfiles.map((file, index) => {
            return (
              <li className="list-group-item" key={index}>
                <span className="float-right">
                  <a title="remove" onClick={() => removeFile(index)}>
                    <i className="la la-remove text-danger"></i>
                  </a>
                </span>
                {file}
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  return (
    <>
      <label className="btn btn-block btn-light" htmlFor="txtFiles">
        {addButtonTitle ?? "Add Files"}
      </label>
      <input
        type="file"
        name="txtFiles"
        id="txtFiles"
        className="hidden"
        multiple
        onChange={(e) => addFiles(e.target.files)}
      />
      {filesList()}

      <button
        className={
          "btn btn-block btn-primary " +
          (addedfiles.length > 0 ? " " : " d-none ") +
          (hideUploadButton && " d-none ")
        }
      >
        Upload Files
      </button>
    </>
  );
}
