export const getManufactures = async () => {
  const token = localStorage.getItem("token");
  let url = `${import.meta.env.VITE_API_URL}/manufactures`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  return result;
};

export const getDetailManufacture = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/manufactures/${id}`;

  const response = await fetch(url, {
      headers: {
          authorization: `Bearer ${token}`,
      },
      method: "GET",
  });

  // get data
  const result = await response.json();
  return result;
};

export const createManufacture = async (request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("name", request.name);
  formData.append("country", request.country);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/manufactures`, {
      headers: {
          authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: formData,
  });

  // get the data if fetching succeed!
  const result = await response.json();
  return result;
};

export const updateManufacture = async (id, request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("name", request.name);
  formData.append("country", request.country);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/manufactures/${id}`, {
      headers: {
          authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: formData,
  });

  // get the data if fetching succeed!
  const result = await response.json();
  return result;
};

export const deleteManufacture = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/manufactures/${id}`;

  const response = await fetch(url, {
      headers: {
          authorization: `Bearer ${token}`,
      },
      method: "DELETE",
  });

  // get data
  const result = await response.json();
  return result;
};
