"use client";

import React, { useEffect, useState } from "react";

export const AppContent = () => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    fetch("/api/project")
      .then((response) => response.json())
      .then(setMessage);
  }, []);
  return <div>{message?.map((project: any) => <p key={project._id}>{project.name}</p>)}</div>;
};
