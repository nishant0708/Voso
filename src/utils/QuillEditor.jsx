import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = ({ label, name, value, onChange }) => {
  const handleChange = (content) => {
    onChange({ target: { name, value: content } });
  };

  return (
    <div>
      <label className="text-sm text-black dark:text-white">{label}</label>
      <ReactQuill
        value={value}
        className="min-h-[0px] max-h-[200px] mt-1 w-full overflow-y-auto outline-none transition text-black focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        onChange={handleChange}
        modules={QuillEditor.modules}
        formats={QuillEditor.formats}
      />
    </div>
  );
};

QuillEditor.modules = {
  toolbar: [
    // [{ header: '1' }, { header: '2' }, { font: [] }],
    // [{ size: [] }],
    ['bold', 'italic'],
    [
      // { list: 'ordered' },
      // { list: 'bullet' },
      // { indent: '-1' },
      // { indent: '+1' },
    ],
    // ['link', 'image', 'video'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

QuillEditor.formats = [
  // 'header',
  // 'font',
  // 'size',
  'bold',
  'italic',
  // 'underline',
  // 'strike',
  // 'blockquote',
  // 'list',
  // 'bullet',
  // 'indent',
  // 'link',
  // 'image',
  // 'video',
];

export default QuillEditor;
