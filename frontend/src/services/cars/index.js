export const getCars = async (plate, available, availableAt) => {
  const token = localStorage.getItem("token");
  let params;
  if (plate) {
    params.plate = plate;
  }
  if (available) {
    params.available = available;
  }
  if (availableAt) {
    params.availableAt = availableAt;
  }

  let url =
    `${import.meta.env.VITE_API_URL}/cars` + new URLSearchParams(params);

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

export const getCarDetail = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/cars/${id}`;

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

export const createCar = async (request) => {
  const token = localStorage.getItem("token");
  const newDate = new Date();

  const formData = new FormData();
  formData.append("plate", request.plate);
  formData.append("modelId", request.modelId);
  formData.append("typeId", request.typeId);
  formData.append("description", request.description);
  formData.append("available", request.available);
  formData.append("availableAt", newDate.toISOString(request.availableAt));
  formData.append("options", request.options);
  formData.append("specs", request.specs);

  if (request.image) {
    formData.append("image", request.image);
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}/cars`, {
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

export const updateCar = async (id, request) => {
  const token = localStorage.getItem("token");
  const newDate = new Date();

  const formData = new FormData();
  formData.append("plate", request.plate);
  formData.append("modelId", request.modelId);
  formData.append("typeId", request.typeId);
  formData.append("description", request.description);
  formData.append("available", request.available);
  formData.append("availableAt", newDate.toISOString(request.availableAt));
  formData.append("options", request.options);
  formData.append("specs", request.specs);

  if (request.image) {
    formData.append("image", request.image);
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}/cars/${id}`, {
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

export const deleteCar = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/cars/${id}`;

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
