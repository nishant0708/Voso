import React, { useState, useRef } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import QuillEditor from '../../utils/QuillEditor';
import TagInput from './TagInput';

const NewsPage = () => {
  const [links, setLinks] = useState([]);
  const [linkUrl, setLinkUrl] = useState('');
  const [show, setshow] = useState(true);
  const [selectedSource, setSelectedSource] = useState('');
  const [, setTitle] = useState('');
  const [type, setType] = useState('news');
  const [selectedImage, setSelectedImage] = useState(null);

  const fileInputRef = useRef(null);

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    setType(selectedType);

    // Set custom behavior based on selected type
    if (selectedType === 'article') {
      setTitle('Add Article'); // Update title input placeholder
    } else {
      setTitle('Add Title'); // Reset title input placeholder
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the first file from the input
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSelectImage = () => {
    fileInputRef.current.click(); // Trigger click event on file input when "Select" button is clicked
  };

  const handleAddLink = () => {
    // Create a new link object with the selected news source and the entered link URL
    if (!linkUrl.trim()) {
      // If link URL is empty, prevent adding the link
      alert('Please enter a valid URL.');
      return;
    }

    const existingLinkIndex = links.findIndex(
      (link) => link.name === selectedSource,
    );

    if (existingLinkIndex !== -1) {
      // If the selected source already exists in the links array, update its URL
      const updatedLinks = [...links];
      updatedLinks[existingLinkIndex] = {
        ...updatedLinks[existingLinkIndex],
        url: linkUrl,
      };
      setLinks(updatedLinks);
    } else {
      // Otherwise, add a new link entry
      const newLink = {
        name: selectedSource,
        url: linkUrl,
      };
      setLinks([...links, newLink]);
    }

    // Clear input field after adding or updating the link
    setLinkUrl('');
    setshow(true);
  };

  return (
    <DefaultLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-5">
        <div className="mb-8">
          <h1 className="text-black  dark:text-white font-bold text-3xl md:lg">
            {type === 'article' ? 'Add Article' : 'Add News Letter'}
          </h1>
        </div>

        <div>
          <div className="mb-3 flex flex-col gap-2.5 md:gap-6 md:flex-row">
            <div className="w-full md:w-1/2">
              <label className="text-lg text-black dark:text-white">
                Title:
              </label>
              <input
                type="text"
                name="title"
                value=""
                id="title"
                placeholder="Add Title"
                className="relative z-20 h-10 mt-1.5 text-sm text-black dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label className="text-sm text-black dark:text-white">
                Type:
              </label>
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                  name="type"
                  id="type"
                  onChange={handleTypeChange}
                  required={true}
                  className="relative z-20 t-[20px] h-10 mt-1.5 text-black dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="news">News Letter</option>
                  <option value="article">Article</option>
                </select>
                <span className="absolute top-[60%] right-4 z-30 -translate-y-1/2">
                  <svg
                    className="fill-current"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill=""
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div
            style={{ display: type === 'article' ? 'none' : 'block' }}
            className="mb-4 text-md text-black dark:text-white"
          >
            <p>ADD HTML CONTENT:</p>
            <QuillEditor />
          </div>

          <div className="mb-4 text-md text-black dark:text-white">
            <p className="mb-2">Add Image:</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              ref={fileInputRef}
            />
            <button
              className="mb-6 bg-primary text-white px-2 py-1"
              onClick={handleSelectImage}
            >
              Select Image
            </button>
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="SelectedImage"
                className="max-w-full h-auto mb-2"
              />
            )}
          </div>

          <div>
            <TagInput />
          </div>

          <div style={{ display: type === 'article' ? 'none' : 'block' }}>
            {show ? (
              <>
                <p className="mb-4 text-bold text-lg text-black dark:text-white">
                  Links:
                </p>
                <ul className="mb-4 text-md text-black dark:text-white">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.name}
                      </a>
                      <span>{':'}</span> {link.url}
                    </li>
                  ))}
                </ul>
                <button
                  className="bg-primary text-white px-2 py-1"
                  onClick={() => setshow((prev) => !prev)}
                >
                  Add Links
                </button>
              </>
            ) : (
              <div className="mb-4 text-md text-black dark:text-white">
                <p>Add Links:</p>
                <div className="mb-3 flex flex-col gap-2.5 md:gap-6 md:flex-row">
                  <div className="w-full md:w-1/2">
                    <div className="mb-4 text-md text-black dark:text-white ">
                      <select
                        value={selectedSource}
                        onChange={(e) => setSelectedSource(e.target.value)}
                        className="relative z-20 h-10 mt-1.5 text-sm text-black dark:text-white w-full appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="">Select a news source</option>
                        <option value="ANI News">ANI News</option>
                        <option value="Google News">Google News</option>
                        <option value="Daily Hunt">Daily Hunt</option>
                        <option value="Jio News">Jio News</option>
                        <option value="HTDS Content Services">
                          HTDS Content Services
                        </option>
                        <option value="Daily Prabhat">Daily Prabhat</option>
                        <option value="Mumbai Times">Mumbai Times</option>
                        <option value="Indian News Network">
                          Indian News Network
                        </option>
                        <option value="Indian Economic Observer">
                          Indian Economic Observer
                        </option>
                        <option value="Delhi Live News">Delhi Live News</option>
                      </select>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="Enter URL"
                    className="relative w-full md:w-1/2 z-20 h-10 mt-1.5 text-sm text-black dark:text-white appearance-none rounded border border-stroke bg-transparent py-0.5 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <button
                  className="bg-primary text-white px-2 py-1"
                  onClick={handleAddLink}
                >
                  Confirm
                </button>
              </div>
            )}
          </div>
          <button className="mt-6 w-full bg-primary text-white px-2 py-1">
            Save Changes
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default NewsPage;
