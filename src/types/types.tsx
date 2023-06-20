export type TUser = {
  name: string;
  role: string;
  courses: { [key: string]: any };
  progress: string;

  achievements: { [key: string]: any };
  position: string;
  ratingPlace: number;
  appointedCourses: { [key: string]: any };

};
