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
