import { Modal, Button, Form, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

function UserModal({show, handleClose, addUser, state, remove}) {
    const [info, setInfo] = useState({firstName: '', lastName: ''})


    useEffect(() => {
        if (show > 0) {
            setInfo(state.users[show])
        } else {
            setInfo({firstName: '', lastName: ''})
        }
    }, [show])

    const handleAddUser = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        addUser(info);
        handleClose();
    }

    const handleRemoveUser = () => {
        remove('users', show)
        handleClose();
    }

    const handleChange = (field, e) => {
        setInfo({...info, [field]: e.target.value})
    }

    return (
        <Modal show={show !== 0} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{show === -1 ? 'Add User' : 'Edit User'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => handleAddUser(e)}>
                    <Row className="mb-3">
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control required type="text" placeholder="First Name" value={info.firstName} onChange={(e) => handleChange('firstName', e)}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control required type="text" placeholder="Last Name" value={info.lastName} onChange={(e) => handleChange('lastName', e)}/>
                        </Form.Group>
                    </Row>
                    <Button type="submit" className="align-items-end" style={{float: 'right'}}>
                        {show === -1 ? 'Add User' : 'Update User'}
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {show !== -1 && <Button variant="primary" onClick={handleRemoveUser}>
                    Delete User
                </Button>}
            </Modal.Footer>
        </Modal>
    )
}

export default UserModal;
