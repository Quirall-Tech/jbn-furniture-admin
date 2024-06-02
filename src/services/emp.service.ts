import { addEmployee, deleteEmployee, getEmployee, getEmployeeByMob, listEmployee, updateEmployee } from "../dao/emp.dao";
export class EmployeeService {

  addEmployee = async (data: any) => {
    try {
      const item = data;
      const checkItem = await getEmployeeByMob(item.mobile);
      if (checkItem) {
        return {
          error: {
            message: `Employee already exist with mobile: ${item.mobile}`,
          },
        };
      } else {
        const createEmployee = await addEmployee(item);
        return createEmployee;
      }
    } catch (err) {
      throw err;
    }
  }
  employeeList = async () => {
    try {
      return await listEmployee();
    } catch (err) {
      throw err;
    }
  }

  getEmployee = async (empId: any) => {
    try {
      const emp = await getEmployee(empId);
      if (!emp) {
        return {
          error: {
            message: "Employee dont exist in db"
          }
        }
      }
      return emp;
    } catch (err) {
      throw err;
    }
  }

  updateEmployee = async (empId: any, data: any) => {
    try {
      const updatedEmp = await updateEmployee(empId, data);
      return updatedEmp;
    } catch (err) {
      throw err;
    }
  }

  deleteEmployee = async (empId: any) => {
    try {
      const deletedEmp = await deleteEmployee(empId);
      return deletedEmp;
    } catch (err) {
      throw err;
    }
  }
}
