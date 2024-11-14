export const getModels = async (name, year, rentPerDay) => {
  const token = localStorage.getItem("token");
  let params;
  if (name) {
    params.name = name;
  }
  if (year) {
    params.year = year;
  }
  if (rentPerDay) {
    params.rentPerDay = rentPerDay;
  }

  let url =
    `${import.meta.env.VITE_API_URL}/models` + new URLSearchParams(params);

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

export const getModelDetail = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/models/${id}`;

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

export const createModel = async (request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("name", request.name);
  formData.append("manufactureId", request.manufactureId);
  formData.append("transmissionId", request.transmissionId);
  formData.append("year", request.year);
  formData.append("rentPerDay", request.rentPerDay);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/models`, {
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

export const updateModel = async (id, request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("name", request.name);
  formData.append("manufactureId", request.manufactureId);
  formData.append("transmissionId", request.transmissionId);
  formData.append("year", request.year);
  formData.append("rentPerDay", request.rentPerDay);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/models/${id}`, {
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

export const deleteModel = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/models/${id}`;

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
