export const getTypeCars = async (name) => {
  const token = localStorage.getItem("token");
  let params;
  if (name) {
    params.name = name;
  }
  let url = 
  `${import.meta.env.VITE_API_URL}/types` +
  new URLSearchParams(params);

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

export const getDetailTypeCar = async (id) => {
  const token = localStorage.getItem("token");
  let url = `${import.meta.env.VITE_API_URL}/types/${id}`;

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

export const createTypeCar = async (request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("name", request.name);
  formData.append("description", request.description);
  formData.append("capacity", request.capacity);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/types`, {
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

export const updateTypeCar = async (id, request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("name", request.name);
  formData.append("description", request.description);
  formData.append("capacity", request.capacity);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/types/${id}`, {
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

export const deleteTypeCar = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/types/${id}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });

  // get data
  const result = await response.json();
  return result;
}