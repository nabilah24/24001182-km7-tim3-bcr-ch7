export const login = async (request) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    body: JSON.stringify(request),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // get the data if fetching succeed!
  const result = await response.json();
  return result;
};

export const register = async (request) => {
  const formData = new FormData();
  formData.append("name", request.name);
  formData.append("email", request.email);
  formData.append("password", request.password);
  formData.append("profile_picture", request.profilePicture);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/register`,
    {
      method: "POST",
      body: formData,
    }
  );

  // get the data if fetching succeed!
  const result = await response.json();
  return result;
};

export const profile = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  return result;
};

export const getUsers = async (name) => {
  const token = localStorage.getItem("token");

  // Inisialisasi params sebagai objek kosong
  let params = {};
  if (name) {
    params.name = name;
  }

  // Buat URL dengan parameter query jika ada
  const url = `${import.meta.env.VITE_API_URL}?${new URLSearchParams(params)}`;

  try {
    const response = await fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    });

    // Cek apakah respons sukses
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Dapatkan data
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { error: "Failed to fetch users" };
  }
};




