import db from "../config/database.js";
import Users from "./users/users.js";
import StudentsDetails from "./users/students_details.js";
import AcademicReports from "./monev/academic_reports.js";
import AcademicActivities from "./monev/academic_activities.js";
import OrganizationActivities from "./monev/organization_activities.js";
import StudentsAchievements from "./monev/students_achivements.js";
import CommitteeActivities from "./monev/committee_activities.js";
import IndependentActivities from "./monev/independent_activities.js";
import StudentsEvaluations from "./monev/student_evaluations.js";
import TargetNextSemester from "./monev/target_next_semester.js";
import TargetAcademicActivities from "./monev/target_academic_activity.js";
import TargetAchievements from "./monev/target_achievements.js";
import TargetIndependentActivities from "./monev/target_independent_activities.js";
import LaporanMonevMahasiswa from "./monev/laporan_monev.js";
import Semester from "./users/semester.js";

//Relations
Users.hasOne(StudentsDetails, { foreignKey: 'user_id', as: 'student_detail' });
StudentsDetails.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

Users.hasMany(AcademicReports, { foreignKey: 'user_id', as: 'academic_reports' });
AcademicReports.belongsTo(Users, { foreignKey: 'user_id', as: 'user'});

Users.hasMany(AcademicActivities, { foreignKey: 'user_id', as: 'academic_activities' });
AcademicActivities.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

Users.hasMany(OrganizationActivities, { foreignKey: 'user_id', as: 'organization_activities' });
OrganizationActivities.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

Users.hasMany(StudentsAchievements, { foreignKey: 'user_id', as: 'students_achievements' });
StudentsAchievements.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

Users.hasMany(CommitteeActivities, { foreignKey: 'user_id', as: 'committee_activities' });
CommitteeActivities.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

Users.hasMany(IndependentActivities, { foreignKey: 'user_id', as: 'independent_activities' });
IndependentActivities.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

Users.hasMany(StudentsEvaluations, { foreignKey: 'user_id', as: 'students_evaluations' });
StudentsEvaluations.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

Users.hasMany(TargetNextSemester, { foreignKey: 'user_id', as: 'target_next_semester'});
TargetNextSemester.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

Users.hasMany(TargetAcademicActivities, { foreignKey: 'user_id', as: 'target_academic_activities'});
TargetAcademicActivities.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

Users.hasMany(TargetAchievements, { foreignKey: 'user_id', as: 'target_achievements'});
TargetAchievements.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

Users.hasMany(TargetIndependentActivities, { foreignKey: 'user_id', as: 'target_independent_activities'});
TargetIndependentActivities.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

Users.hasMany(LaporanMonevMahasiswa, { foreignKey: 'user_id', as: 'laporan_monev' });
LaporanMonevMahasiswa.belongsTo(Users, { foreignKey: 'user_id', as: 'user' });

LaporanMonevMahasiswa.hasMany(Semester, { foreignKey: 'semester_id', as: 'semester_id'});
Semester.belongsTo(LaporanMonevMahasiswa, { foreignKey: 'id', as: 'semester' });

export {
  db as sequelize,
  Users,
  StudentsDetails,
  AcademicReports,
  AcademicActivities,
  OrganizationActivities,
  StudentsAchievements,
  CommitteeActivities,
  IndependentActivities,
  StudentsEvaluations,
  TargetNextSemester,
  TargetAcademicActivities,
  TargetAchievements,
  TargetIndependentActivities,
  LaporanMonevMahasiswa,
  Semester,
};