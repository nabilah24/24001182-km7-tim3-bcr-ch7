export const getTransmissions = async () => {
  const token = localStorage.getItem("token");
  let url = `${import.meta.env.VITE_API_URL}/transmissions`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  if (!result?.success) {
      throw new Error(result?.message);
  }

  return result?.data;
};

export const getDetailTransmission = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/transmissions/${id}`;

  const response = await fetch(url, {
      headers: {
          authorization: `Bearer ${token}`,
      },
      method: "GET",
  });

  // get data
  const result = await response.json();
  if (!result?.success) {
      throw new Error(result?.message);
  }

  return result?.data;
};

export const createTransmission = async (request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("name", request.name);
  formData.append("driveType", request.driveType);
  formData.append("description", request.description);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/transmissions`, {
      headers: {
          authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: formData,
  });

  // get data
  const result = await response.json();
  if (!result?.success) {
      throw new Error(result?.message);
  }

  return result?.data;
};

export const updateTransmission = async (id, request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("name", request.name);
  formData.append("driveType", request.driveType);
  formData.append("description", request.description);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/transmissions/${id}`, {
      headers: {
          authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: formData,
  });

  // get data
  const result = await response.json();
  if (!result?.success) {
      throw new Error(result?.message);
  }

  return result?.data;
};

export const deleteTransmission = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/transmissions/${id}`;

  const response = await fetch(url, {
      headers: {
          authorization: `Bearer ${token}`,
      },
      method: "DELETE",
  });

  // get data
  const result = await response.json();
  if (!result?.success) {
      throw new Error(result?.message);
  }

  return result?.data;
};
