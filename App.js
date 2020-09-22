import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import ModalComponent from "./components/Modal";
import RowComp from "./components/Row";
import InputTest from "./components/Input";
import { connect } from "react-redux";
import { initialState, loadingReducer } from "./reducer/loading.reducer";
import { saveLS, loadLS } from "./utils/useLocalStorage";

const App = props => {

  //this.state
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [toEdit, setToEdit] = useState("");
  const [toReplaceEdit, setToReplaceEdit] = useState("");

  // useReducer -------------------------------------
  const [stateLR, dispatchLR] = useReducer(
    loadingReducer,
    !!loadLS() && loadLS().loadingReducer ?
      loadLS().loadingReducer : 
      initialState
  );

  saveLS({
    "loadingReducer": {
      ...stateLR
    }
  });

  //CONSOLE STATE_LS OR STATE_REDUCER FOR CHECK CHANGES
  console.log(loadLS())
  console.log(stateLR)
  // useReducer -------------------------------------

  //componentDidMount()
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?limit=15")
      .then(function(res) {
        setEmployees(res.data.results);
      })
      .catch(function(err) {
        console.log(err);
      });
  }, []);

  const handleAdd = (value, inputEl) => {
    if (value === "") {
      alert("Escribe un valor... ");
    } else {
      dispatchLR({type: 'LOADING', payload: true})
      let newList = [
        ...employees,
        {
          name: value,
          url: ""
        }
      ];
      setEmployees(newList);
      inputEl.current.value = "";
      setTimeout(() => dispatchLR({type: 'LOADING', payload: false}), 4000);
    }
  };

  const handleEdit = nameEdit => {
    setToEdit(nameEdit);
    setToReplaceEdit(nameEdit);
    setShowModal(true);
  };

  const changeValueEdit = () => {
    dispatchLR({type: 'LOADING', payload: true})
    const employeesEdited = employees.map(item => {
      if (item.name === toEdit) {
        return {
          ...item,
          name: toReplaceEdit
        };
      }
      return { ...item };
    });
    let newList = [...employeesEdited];
    setEmployees(newList);
    setTimeout(() => dispatchLR({type: 'LOADING', payload: false}), 4000);
    setShowModal(false);
  };

  const handleDelete = nameDeleted => {
    dispatchLR({type: 'LOADING', payload: true})
    const index = employees.findIndex((item, index) => {
      return item.name === nameDeleted;
    });

    employees.splice(index, 1);
    let newList = [...employees];
    setEmployees(newList);
    setTimeout(() => dispatchLR({type: 'LOADING', payload: false}), 4000);
  };

  return (
    <Container>
      <ModalComponent
        showModal={showModal}
        toReplaceEdit={toReplaceEdit}
        setShowModal={setShowModal}
        setToReplaceEdit={setToReplaceEdit}
        changeValueEdit={changeValueEdit}
      />
      { 
        !stateLR.showLoading ? (
          <React.Fragment>
            <Row className={"mt-5"}>
              <Col xs={12}>
                <InputTest handleAdd={handleAdd} />
              </Col>
            </Row>
            <Row className={"mt-5"}>
              <Col xs={12}>
                <ul>
                  {employees.map((item, index) => (
                    <RowComp
                      key={index}
                      {...item}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                    />
                  ))}
                </ul>
              </Col>
            </Row>
          </React.Fragment>
        ) : (
          <Row className={"mt-5"}>
            <Col xs={12}>
              <p>Cargando...</p>
            </Col>
          </Row>
        )
      }
    </Container>
  );
};

export default App;