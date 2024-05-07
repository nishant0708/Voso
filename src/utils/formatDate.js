const formatDate = (dateString) => {
  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };

  const formattedDate = new Date(dateString).toLocaleDateString(
    'en-US',
    options,
  );
  return formattedDate;
};

export default formatDate;