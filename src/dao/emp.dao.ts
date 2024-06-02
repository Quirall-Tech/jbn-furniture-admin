import { Employee } from "../db/models/Employee";
export const addEmployee = async (data: any) => {
  try {
    const empData = data;
    const createdEmp = await Employee.create(empData);
    return createdEmp;
  } catch (err) {
    console.log("Error occured while adding employee");
    throw err;
  }
}
export const getEmployee = async (empId: any) => {
  try {
    const empData = await Employee.findOne({ _id: empId });
    return empData;
  } catch (err) {
    console.log("Error occured while getting employee");
    throw err;
  }
}
export const getEmployeeByMob = async (mobile: any) => {
    try {
      const item = await Employee.findOne({ mobile });
      return item;
    } catch (err) {
      console.log("Error occured while getting Employee by mobile");
      throw err;
    }
  }
export const updateEmployee = async (id: string, dataToChange: any) => {
  try {
    const updatedEmp = await Employee.findOneAndUpdate({ _id: id }, { ...dataToChange }, { returnDocument: 'after' });
    return updatedEmp;
  } catch (err) {
    console.log("Error occured while updating employee");
    throw err;
  }
}
export const deleteEmployee = async (id: string) => {
  try {
    const deletedEmp = await Employee.findOneAndDelete({ _id: id });
    return deletedEmp;
  } catch (err) {
    console.log("Error occured while deleting employee");
    throw err;
  }
}
export const listEmployee = async () => {
  try {
    const empList = await Employee.find();
    return empList;
  } catch (err) {
    console.log("Error occured while find employees");
    throw err;
  }
}