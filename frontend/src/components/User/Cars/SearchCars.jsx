import { useQuery } from "@tanstack/react-query";
import { getCars } from "../../../services/cars"; // Sesuaikan dengan path yang sesuai

const useSearchCars = (driveType, transmission, availableAt, capacity) => {
  return useQuery(
    ["cars", driveType, transmission, availableAt, capacity], // Key unik untuk query
    () => getCars(driveType, transmission, availableAt, capacity), // Fungsi fetch
    {
      enabled: !!driveType || !!transmission || !!availableAt || !!capacity, // Menjalankan query jika ada parameter pencarian
      onError: () => {
        showAlert(); // Menampilkan alert jika gagal fetch data
      },
      onSuccess: (data) => {
        setCars(data); // Menyimpan data mobil yang berhasil di-fetch
      },
    }
  );
};
