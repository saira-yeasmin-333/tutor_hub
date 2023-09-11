import React from 'react';

const TimestampToDate = ({ timestamp }) => {
  // Convert the Unix timestamp (in seconds) to milliseconds
  const timestampMs = timestamp * 1000;

  // Create a Date object from the timestamp
  const date = new Date(timestampMs);

  // Get the various date components (year, month, day, etc.)
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed, so add 1
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  // Create a formatted date string
  //const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  const formattedDate = `${year}-${month}-${day}`;

  return (
    <div>
      {/* <p>Timestamp: {timestamp}</p> */}
      <p>{formattedDate}</p>
    </div>
  );
};

export default TimestampToDate;
