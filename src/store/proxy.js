import { requestFaculties__, createNewFaculty__, removeFaculty__, updateFaculty__ } from "./Medical/faculties__-actions"
import { requestYears__, createNewYear__, removeYear__, updateYear__ } from "./Medical/years__-actions"
import { requestModels__, createNewModel__, removeModel__, updateModel__ } from "./Medical/models__-actions"
import { requestCourses2__, requestCourses__, createNewCourse__, removeCourse__, updateCourse__ } from "./Medical/courses__-actions"




// exports.module.requestFaculties = requestFaculties;
export { requestFaculties__, requestYears__, requestModels__, requestCourses__, requestCourses2__ };
export { createNewFaculty__, createNewYear__, createNewModel__, createNewCourse__ };
export { removeFaculty__, removeYear__, removeModel__, removeCourse__ };
export { updateFaculty__, updateYear__, updateModel__, updateCourse__ };