"use client";
import { useEffect, useState } from 'react';
import { generateGoogleMeetURL } from '../helpers/googleMeet';

export default function Home() {
  const [meetURL, setMeetURL] = useState<string | null>(null);

  useEffect(() => {
    const createMeeting = async () => {
      const summary = 'Example Meeting';
      const startDateTime = new Date().toISOString();
      const endDateTime = new Date(Date.now() + 60 * 60 * 1000).toISOString();

      const url = await generateGoogleMeetURL(summary, startDateTime, endDateTime);
      setMeetURL(url);
    };

    createMeeting();
  }, []);

  return (
    <div>
      {meetURL && (
        <div>
          <p>Google Meet URL: <a href={meetURL} target="_blank" rel="noopener noreferrer">{meetURL}</a></p>
        </div>
      )}
    </div>
  );
}

