import React from 'react';

const TagInput = ({ tags, setTags }) => {
  const addTag = (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      setTags([...tags, event.target.value.trim()]);
      event.target.value = '';
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label
        htmlFor="tag-input"
        className="mb-4 text-md text-black dark:text-white"
      >
        Tag:
      </label>
      <input
        type="text"
        id="tag-input"
        onKeyDown={addTag}
        className="mb-3 relative z-20 h-10 mt-1.5 text-sm text-black dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
      />
      <div>
        <ul className="flex flex-wrap">
          {tags.map((tag, index) => (
            <li
              style={{
                backgroundColor: 'black',
                marginRight: '5px',
                color: 'white',
                padding: '5px 15px',
                marginBottom: '10px',
              }}
              key={index}
            >
              {tag}{' '}
              <button
                style={{
                  background: 'white',
                  color: 'black',
                  borderRadius: '99rem',
                  padding: '1px 10px',
                  scale: '0.6',
                }}
                onClick={() => removeTag(index)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TagInput;
