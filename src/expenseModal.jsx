import { Modal, Button, Form, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

function ExpenseModal({show, handleClose, addExpense, state, remove}) {
    const [info, setInfo] = useState({userId: 0, category: '', cost: 0})
    const [errors, setErrors] = useState('')
    
    useEffect(() => {
        if (show > 0) {
            setInfo(state.expenses[show])
        } else {
            setInfo({userId: 0, category: '', cost: 0})
        }
        setErrors('')
    }, [show])

    const handleChange = (field, e) => {
        setInfo({...info, [field]: e})
    }

    const handleAddExpense = () => {
        if (info.fullName === '' || info.category === '' || info.cost <= 0) {
            setErrors('Invalid or missing fields')
        } else {
            addExpense(info);
            handleClose();
        }
    }

    const handleRemoveExpense = () => {
        remove('expenses', show);
        handleClose();
    }


    return (
        <Modal show={show !== 0} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Full Name</Form.Label>
                        <DropdownButton
                            title={info.userId === 0 ? 'Select User' : state.users[info.userId].firstName + ' ' + state.users[info.userId].lastName}
                            onSelect={(e) => handleChange('userId', e)}
                            >
                            {Object.values(state.users).map((user) => (
                                <Dropdown.Item key={user.id} eventKey={user.id}>{user.firstName + ' ' + user.lastName}</Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <DropdownButton
                            title={info.category === '' ? 'Select Category' : info.category}
                            onSelect={(e) => handleChange('category', e)}
                            >
                            <Dropdown.Item eventKey="Food">Food</Dropdown.Item>
                            <Dropdown.Item eventKey="Travel">Travel</Dropdown.Item>
                            <Dropdown.Item eventKey="Health">Health</Dropdown.Item>
                            <Dropdown.Item eventKey="Supplies">Supplies</Dropdown.Item>
                        </DropdownButton>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cost</Form.Label>
                        <Form.Control type="number" placeholder="0" value={info.cost} onChange={(e) => handleChange('cost', parseFloat(e.target.value))}/>
                    </Form.Group>
                </Form>
                <Row className="mb-3">
                    {errors !== '' && errors}
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => handleAddExpense()}>
                    {show === -1 ? 'Add Expense' : 'Update Expense'}
                </Button>
                {show !== -1 && <Button variant="primary" onClick={handleRemoveExpense}>
                    Delete Expense
                </Button>}
            </Modal.Footer>
        </Modal>
    )
}

export default ExpenseModal;
