import {FC, useState} from "react";
import {useAppSelector} from "store/hooks";
import {IDrawEmployeesProps} from "./types";
import {NextOrPrev} from "globalTypes/enums";

import {v4 as uuid} from 'uuid';

import AddEmployee from "./components/addEmployee";
import DeleteModal from "./components/deleteModal";

import './drawEmployees.css';


const DrawEmployees:FC<IDrawEmployeesProps> = ({ handleNextOrPrev, page }) => {
    const [showModalWindow, setShowModalWindow] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState({
        show: false,
        name: '',
        surname: '',
        employeeId: ''
    });
    const { employees } = useAppSelector(state => state.employeesSlice);

    const handleOpen = () => {
        setShowModalWindow(prevState => !prevState);
    }

    const handleOpenDeleteModal = (name?: string, surname?: string, employeeId?: string) => {
        if(name && surname && employeeId) {
            setShowDeleteModal(prevState => {
                return {
                    show: !prevState.show,
                    name,
                    surname,
                    employeeId,
                }
            })
        } else {
            setShowDeleteModal(prevState => {
                return {
                    ...prevState,
                    show: !prevState.show,
                }
            })
        }

    }

    return (
        <section className='employees'>
            <AddEmployee showModalWindow={showModalWindow} handleOpen={handleOpen} page={page} />
            <DeleteModal page={page} show={showDeleteModal.show} name={showDeleteModal.name} surname={showDeleteModal.surname} employeeId={showDeleteModal.employeeId} handleOpenDeleteModal={handleOpenDeleteModal} />
            <div className="container">
               <div className="employee_wrap">
                   {
                       employees.map(employee => {
                           return (
                               <div key={uuid()} className="employee">
                                   <h2><span>Name: </span>{employee.name}</h2>
                                   <p><span>Surname: </span>{employee.surname}</p>
                                   <p><span>Email: </span>{employee.email}</p>
                                   <p><span>Position: </span>{employee.position}</p>

                                   <div className="btns">
                                       <button>Edit</button>
                                       <button onClick={() => handleOpenDeleteModal(employee.name, employee.surname, employee.id as unknown as string)}>Delete</button>
                                   </div>
                               </div>
                           )
                       })
                   }

                   <div className="control_btns">
                       <div className="add_btn">
                           <button onClick={handleOpen}>Add Employee+</button>
                       </div>
                       <div className="next_prev">
                           <button onClick={() => handleNextOrPrev(NextOrPrev.PREV)} disabled={page === 1}>Prev</button>
                           <button onClick={() => handleNextOrPrev(NextOrPrev.NEXT)} disabled={page === 3}>Next</button>
                       </div>
                   </div>
               </div>
            </div>

        </section>
    );
};

export default DrawEmployees;