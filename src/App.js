//Imports do React e Redux
import React from 'react';
import { Provider } from 'react-redux';

//Imports de Componentes Próprios
import Login from './components/Login';
import Produto from './components/Produto.js';
import store from './store/store.js'

//Imports do MaterialUI
import { Button, Dialog, IconButton, Grid, Container } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

//Imports de Estilos Próprios
import './App.css';

//Componente raíz da aplicação declarado como uma classe
class App extends React.Component {

  //Super Construtor da classe e declaração de estado inicial
  constructor(props) {
    super(props);
    this.closeDialog = this.closeDialog.bind(this);
  }
  state = {
    isLoading: true,
    isDialogOpen: false,
    produtos: [],
    error: null,
    isLogged: false,
  };
  showMyPort() {
    console.log(process.env.FRONT_PORT)
  }
  //Métodos destinados a alcançar os produtos na API (porta 8080), executado apenas após a montagem dos componentes
  fetchProds() {
    fetch(`http://localhost:8080/todos`)
      .then(response => response.json())
      .then(
        data =>
          this.setState({
            ...this.state,
            produtos: data,
            isLoading: false,
          }),
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.showMyPort()
    this.fetchProds();
  }

  //Métodos de "Abre e Fecha" da popup de login
  showDialog() {
    this.setState({
      ...this.state,
      isDialogOpen: true
    });
  }

  closeDialog() {
    this.setState({
      ...this.state,
      isDialogOpen: false
    });
  }

  //Renderização do componente raíz da aplicação
  render() {
    const { isLoading, produtos } = this.state;
    return (
      <Provider store={store}>
        <Container justify="center">
          <Container justify="center">
            <h1>Nosso Catálogo</h1>
            <Button variant="contained" color="primary" onClick={(e) => this.showDialog()}> Login </Button>
          </Container>
          <Dialog open={this.state.isDialogOpen}>
            <IconButton onClick={this.closeDialog}>
              <CloseIcon />
            </IconButton>
            <Login closeDialog={this.closeDialog} />
          </Dialog>

          {!isLoading ? Object.keys(produtos).map((key, index) =>
            <Grid container justify="center" spacing={3}>
              <Produto productIndex={index} body={[produtos[key]]} />
            </Grid>) : <h3>Loading...</h3>}
        </Container>
      </Provider>
    );
  }
}

export default App