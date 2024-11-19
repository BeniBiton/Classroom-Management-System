import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000',

})
export const handleStudentsByClass = async (classId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/students/class/${classId}`
      );
      return response.data; // Assuming your API returns an array of students
    } catch (error) {
      console.error("Error fetching students by class:", error);
      return [];
    }
  };
  

export default api